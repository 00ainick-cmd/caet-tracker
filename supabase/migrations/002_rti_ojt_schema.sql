-- ============================================================================
-- CAET Advanced Tracking Tool
-- Migration 002: RTI Hour Logging + OJT Tracking + Apprenticeship Compliance
-- ============================================================================
-- Extends 001_initial_schema.sql
-- Adds: training content registry, RTI session tracking, OJT hour logging,
--        apprenticeship enrollment, and DOL compliance reporting views.
-- ============================================================================


-- ─── TRAINING CONTENT REGISTRY ──────────────────────────────────────────────
-- Central catalog of all training content that can generate RTI hours.
-- QR micro modules, study guide sections, AEA classes, OEM courses all live here.

CREATE TABLE training_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Content identification
  content_type TEXT NOT NULL
    CHECK (content_type IN (
      'micro_module',      -- QR-scannable video pipeline modules
      'study_guide',       -- CAET study guide sections
      'aea_class',         -- AEA HQ or regional instructor-led
      'oem_training',      -- Garmin, Collins, etc.
      'online_course',     -- Self-paced online content
      'external'           -- Other approved training
    )),
  title TEXT NOT NULL,
  description TEXT,
  
  -- RTI mapping
  rti_hours NUMERIC NOT NULL DEFAULT 0,          -- Credit hours for completion
  apprenticeship_phase INTEGER                    -- 1-4 (null if not mapped)
    CHECK (apprenticeship_phase BETWEEN 1 AND 4),
  competency_domain TEXT,                         -- Maps to apprenticeship competency area
  
  -- CAET mapping
  caet_category_id INTEGER,                       -- Maps to CAET 8-category system (1-8)
  mapped_task_ids TEXT[],                          -- Which PQS tasks this supports (e.g. {'1-01','1-02'})
  
  -- Completion requirements
  min_duration_minutes INTEGER,                   -- Minimum time to earn credit (anti-gaming)
  requires_quiz_pass BOOLEAN NOT NULL DEFAULT false,
  passing_score NUMERIC,                          -- Required score if quiz exists (0-100)
  
  -- Content source
  source_url TEXT,                                -- Where the content lives (S3, external)
  source_video_url TEXT,                          -- Original video if from pipeline
  qr_code_url TEXT,                               -- Generated QR code image URL
  
  -- Metadata
  author TEXT,                                    -- Who created/approved it
  approved_by TEXT,                               -- Nick's sign-off (human-in-the-loop)
  approved_at TIMESTAMPTZ,                        -- When approved for use
  status TEXT NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft', 'approved', 'retired')),
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_content_type ON training_content(content_type);
CREATE INDEX idx_content_category ON training_content(caet_category_id);
CREATE INDEX idx_content_phase ON training_content(apprenticeship_phase);
CREATE INDEX idx_content_status ON training_content(status);


-- ─── RTI SESSIONS ───────────────────────────────────────────────────────────
-- Tracks individual training sessions with start/stop for time verification.
-- Every interaction with training content creates a session.

CREATE TABLE rti_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content_id UUID NOT NULL REFERENCES training_content(id),
  
  -- Time tracking
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at TIMESTAMPTZ,                       -- null = in progress
  duration_minutes NUMERIC,                       -- Calculated on completion
  
  -- Completion verification
  status TEXT NOT NULL DEFAULT 'in_progress'
    CHECK (status IN ('in_progress', 'completed', 'abandoned', 'invalidated')),
  quiz_score NUMERIC,                             -- If content requires quiz
  quiz_passed BOOLEAN,
  
  -- RTI credit
  rti_hours_earned NUMERIC NOT NULL DEFAULT 0,    -- 0 until completed + verified
  apprenticeship_phase INTEGER,                   -- Copied from content for fast queries
  competency_domain TEXT,                         -- Copied from content for fast queries
  
  -- Audit
  verified_by UUID REFERENCES users(id),          -- Evaluator/admin who verified (if manual)
  verified_at TIMESTAMPTZ,
  notes TEXT,
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_rti_student ON rti_sessions(student_id);
CREATE INDEX idx_rti_content ON rti_sessions(content_id);
CREATE INDEX idx_rti_status ON rti_sessions(status);
CREATE INDEX idx_rti_phase ON rti_sessions(apprenticeship_phase);


-- ─── OJT HOUR LOGS ─────────────────────────────────────────────────────────
-- On-the-Job Training hours. Separate from RTI. Logged by supervisor/evaluator.
-- PQS task sign-offs can auto-generate OJT entries but hours are tracked here.

CREATE TABLE ojt_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  evaluator_id UUID NOT NULL REFERENCES users(id),  -- Supervisor who attests
  shop_id UUID NOT NULL REFERENCES shops(id),
  
  -- Time tracking
  work_date DATE NOT NULL,
  hours NUMERIC NOT NULL CHECK (hours > 0 AND hours <= 24),
  
  -- Competency mapping
  competency_area TEXT NOT NULL,                  -- Apprenticeship competency domain
  caet_category_id INTEGER,                       -- Maps to CAET category if applicable
  related_task_id TEXT,                            -- Specific PQS task if applicable
  
  -- Description
  description TEXT NOT NULL,                      -- What the apprentice did
  
  -- Verification
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'approved', 'rejected')),
  approved_by UUID REFERENCES users(id),
  approved_at TIMESTAMPTZ,
  rejection_reason TEXT,
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_ojt_student ON ojt_logs(student_id);
CREATE INDEX idx_ojt_shop ON ojt_logs(shop_id);
CREATE INDEX idx_ojt_date ON ojt_logs(work_date);
CREATE INDEX idx_ojt_competency ON ojt_logs(competency_area);
CREATE INDEX idx_ojt_status ON ojt_logs(status);


-- ─── APPRENTICESHIP ENROLLMENTS ─────────────────────────────────────────────
-- Links a student to the DOL registered apprenticeship program.
-- Separate from CAET enrollment — a shop can do CAET without apprenticeship.

CREATE TABLE apprenticeship_enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  shop_id UUID NOT NULL REFERENCES shops(id),
  
  -- DOL info
  rapids_number TEXT,                              -- DOL RAPIDS tracking number
  occupation_title TEXT NOT NULL 
    DEFAULT 'Avionics Technician (Aircraft Mechanic, Electrical)',
  onet_code TEXT NOT NULL DEFAULT '49-2091',
  
  -- Program tracking
  start_date DATE NOT NULL DEFAULT CURRENT_DATE,
  current_phase INTEGER NOT NULL DEFAULT 1         -- 1-4
    CHECK (current_phase BETWEEN 1 AND 4),
  status TEXT NOT NULL DEFAULT 'active'
    CHECK (status IN ('active', 'completed', 'suspended', 'cancelled')),
  
  -- Hour targets (from Fastport submission)
  rti_hours_required NUMERIC NOT NULL DEFAULT 586, -- Total RTI (500 + 86 employer)
  rti_phase_1_required NUMERIC NOT NULL DEFAULT 150,
  rti_phase_2_required NUMERIC NOT NULL DEFAULT 150,
  rti_phase_3_required NUMERIC NOT NULL DEFAULT 100,
  rti_phase_4_required NUMERIC NOT NULL DEFAULT 100,
  rti_employer_required NUMERIC NOT NULL DEFAULT 86,
  
  -- Wage progression
  starting_wage NUMERIC,
  current_wage NUMERIC,
  journeyman_wage NUMERIC,                        -- Target wage at completion
  
  -- Milestones
  caet_base_date DATE,                             -- When CAET base was earned
  caet_advanced_date DATE,                         -- When CAET Advanced was earned
  completion_date DATE,
  certificate_number TEXT,                         -- DOL completion certificate
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  
  UNIQUE(student_id)
);

CREATE INDEX idx_apprentice_shop ON apprenticeship_enrollments(shop_id);
CREATE INDEX idx_apprentice_status ON apprenticeship_enrollments(status);
CREATE INDEX idx_apprentice_phase ON apprenticeship_enrollments(current_phase);


-- ─── WAGE PROGRESSION LOG ───────────────────────────────────────────────────
-- DOL requires documented wage increases. Track every change.

CREATE TABLE wage_progressions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  apprenticeship_id UUID NOT NULL 
    REFERENCES apprenticeship_enrollments(id) ON DELETE CASCADE,
  
  effective_date DATE NOT NULL,
  previous_wage NUMERIC,
  new_wage NUMERIC NOT NULL,
  reason TEXT,                                     -- Phase completion, merit, etc.
  recorded_by UUID REFERENCES users(id),
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);


-- ============================================================================
-- VIEWS: Compliance Reporting
-- ============================================================================

-- ─── RTI HOURS BY STUDENT BY PHASE ─────────────────────────────────────────

CREATE OR REPLACE VIEW v_rti_hours_by_phase AS
SELECT
  s.student_id,
  s.apprenticeship_phase,
  COALESCE(SUM(s.rti_hours_earned), 0) AS hours_earned,
  ae.rti_phase_1_required AS phase_1_target,
  ae.rti_phase_2_required AS phase_2_target,
  ae.rti_phase_3_required AS phase_3_target,
  ae.rti_phase_4_required AS phase_4_target
FROM rti_sessions s
LEFT JOIN apprenticeship_enrollments ae ON ae.student_id = s.student_id
WHERE s.status = 'completed'
GROUP BY s.student_id, s.apprenticeship_phase,
         ae.rti_phase_1_required, ae.rti_phase_2_required,
         ae.rti_phase_3_required, ae.rti_phase_4_required;


-- ─── OJT HOURS BY STUDENT BY COMPETENCY ────────────────────────────────────

CREATE OR REPLACE VIEW v_ojt_hours_by_competency AS
SELECT
  o.student_id,
  o.competency_area,
  COALESCE(SUM(o.hours), 0) AS hours_logged,
  COUNT(*) AS entry_count,
  MIN(o.work_date) AS first_entry,
  MAX(o.work_date) AS last_entry
FROM ojt_logs o
WHERE o.status = 'approved'
GROUP BY o.student_id, o.competency_area;


-- ─── COMBINED DOL COMPLIANCE DASHBOARD ──────────────────────────────────────

CREATE OR REPLACE VIEW v_dol_compliance AS
SELECT
  ae.id AS apprenticeship_id,
  u.full_name AS student_name,
  sh.name AS shop_name,
  ae.current_phase,
  ae.status,
  ae.start_date,
  ae.starting_wage,
  ae.current_wage,
  ae.journeyman_wage,
  -- RTI totals
  COALESCE(rti.total_rti_hours, 0) AS total_rti_hours,
  ae.rti_hours_required,
  ROUND(COALESCE(rti.total_rti_hours, 0) / ae.rti_hours_required * 100, 1) 
    AS rti_pct_complete,
  -- OJT totals
  COALESCE(ojt.total_ojt_hours, 0) AS total_ojt_hours,
  -- CAET milestones
  ae.caet_base_date,
  ae.caet_advanced_date,
  -- PQS progress (from existing sign-offs)
  COALESCE(pqs.tasks_signed_off, 0) AS pqs_tasks_complete
FROM apprenticeship_enrollments ae
JOIN users u ON u.id = ae.student_id
JOIN shops sh ON sh.id = ae.shop_id
LEFT JOIN (
  SELECT student_id, SUM(rti_hours_earned) AS total_rti_hours
  FROM rti_sessions WHERE status = 'completed'
  GROUP BY student_id
) rti ON rti.student_id = ae.student_id
LEFT JOIN (
  SELECT student_id, SUM(hours) AS total_ojt_hours
  FROM ojt_logs WHERE status = 'approved'
  GROUP BY student_id
) ojt ON ojt.student_id = ae.student_id
LEFT JOIN (
  SELECT student_id, COUNT(*) AS tasks_signed_off
  FROM task_signoffs WHERE status = 'active'
  GROUP BY student_id
) pqs ON pqs.student_id = ae.student_id;


-- ============================================================================
-- ROW-LEVEL SECURITY
-- ============================================================================

ALTER TABLE training_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE rti_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE ojt_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE apprenticeship_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE wage_progressions ENABLE ROW LEVEL SECURITY;

-- ─── TRAINING CONTENT: everyone can read approved content ───────────────────

CREATE POLICY content_select ON training_content FOR SELECT USING (
  status = 'approved' OR get_user_role() = 'admin'
);

CREATE POLICY content_insert ON training_content FOR INSERT
  WITH CHECK (get_user_role() = 'admin');

CREATE POLICY content_update ON training_content FOR UPDATE USING (
  get_user_role() = 'admin'
);

-- ─── RTI SESSIONS: students see own, evaluators see shop, admins see all ────

CREATE POLICY rti_select ON rti_sessions FOR SELECT USING (
  get_user_role() = 'admin'
  OR student_id = auth.uid()
  OR (
    get_user_role() = 'shop_evaluator'
    AND student_id IN (
      SELECT u.id FROM users u WHERE u.shop_id = get_user_shop_id()
    )
  )
);

-- Students can create their own sessions (self-paced training)
CREATE POLICY rti_insert ON rti_sessions FOR INSERT
  WITH CHECK (
    get_user_role() = 'admin'
    OR student_id = auth.uid()
  );

-- Students can update own in-progress sessions; admins can update any
CREATE POLICY rti_update ON rti_sessions FOR UPDATE USING (
  get_user_role() = 'admin'
  OR (student_id = auth.uid() AND status = 'in_progress')
);

-- ─── OJT LOGS: evaluators log for their shop students ──────────────────────

CREATE POLICY ojt_select ON ojt_logs FOR SELECT USING (
  get_user_role() = 'admin'
  OR student_id = auth.uid()
  OR (
    get_user_role() = 'shop_evaluator'
    AND shop_id = get_user_shop_id()
  )
);

CREATE POLICY ojt_insert ON ojt_logs FOR INSERT
  WITH CHECK (
    get_user_role() = 'admin'
    OR (
      get_user_role() = 'shop_evaluator'
      AND evaluator_id = auth.uid()
      AND shop_id = get_user_shop_id()
    )
  );

CREATE POLICY ojt_update ON ojt_logs FOR UPDATE USING (
  get_user_role() = 'admin'
  OR (get_user_role() = 'shop_evaluator' AND evaluator_id = auth.uid())
);

-- ─── APPRENTICESHIP ENROLLMENTS: same pattern ───────────────────────────────

CREATE POLICY apprentice_select ON apprenticeship_enrollments FOR SELECT USING (
  get_user_role() = 'admin'
  OR student_id = auth.uid()
  OR (
    get_user_role() = 'shop_evaluator'
    AND shop_id = get_user_shop_id()
  )
);

CREATE POLICY apprentice_insert ON apprenticeship_enrollments FOR INSERT
  WITH CHECK (get_user_role() = 'admin');

CREATE POLICY apprentice_update ON apprenticeship_enrollments FOR UPDATE USING (
  get_user_role() = 'admin'
);

-- ─── WAGE PROGRESSIONS: admin only write, student + evaluator can read ──────

CREATE POLICY wage_select ON wage_progressions FOR SELECT USING (
  get_user_role() = 'admin'
  OR apprenticeship_id IN (
    SELECT id FROM apprenticeship_enrollments 
    WHERE student_id = auth.uid()
  )
  OR (
    get_user_role() = 'shop_evaluator'
    AND apprenticeship_id IN (
      SELECT id FROM apprenticeship_enrollments 
      WHERE shop_id = get_user_shop_id()
    )
  )
);

CREATE POLICY wage_insert ON wage_progressions FOR INSERT
  WITH CHECK (get_user_role() = 'admin');


-- ============================================================================
-- FUNCTION: Auto-credit RTI hours on session completion
-- ============================================================================
-- When a student completes a training session, automatically calculate
-- and credit RTI hours if minimum duration and quiz requirements are met.

CREATE OR REPLACE FUNCTION public.credit_rti_hours()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_content training_content%ROWTYPE;
  v_duration NUMERIC;
  v_credit NUMERIC := 0;
BEGIN
  -- Only fire when status changes to 'completed'
  IF NEW.status != 'completed' OR OLD.status = 'completed' THEN
    RETURN NEW;
  END IF;
  
  -- Get the content record
  SELECT * INTO v_content FROM training_content WHERE id = NEW.content_id;
  
  -- Calculate duration
  v_duration := EXTRACT(EPOCH FROM (NEW.completed_at - NEW.started_at)) / 60.0;
  NEW.duration_minutes := v_duration;
  
  -- Copy phase/domain from content for fast queries
  NEW.apprenticeship_phase := v_content.apprenticeship_phase;
  NEW.competency_domain := v_content.competency_domain;
  
  -- Check minimum duration
  IF v_content.min_duration_minutes IS NOT NULL 
     AND v_duration < v_content.min_duration_minutes THEN
    -- Too fast — no credit (anti-gaming)
    NEW.rti_hours_earned := 0;
    NEW.notes := COALESCE(NEW.notes, '') || ' [Auto: below minimum duration]';
    RETURN NEW;
  END IF;
  
  -- Check quiz requirement
  IF v_content.requires_quiz_pass AND NOT COALESCE(NEW.quiz_passed, false) THEN
    NEW.rti_hours_earned := 0;
    NEW.notes := COALESCE(NEW.notes, '') || ' [Auto: quiz not passed]';
    RETURN NEW;
  END IF;
  
  -- Credit the hours
  NEW.rti_hours_earned := v_content.rti_hours;
  
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_credit_rti_hours
  BEFORE UPDATE ON rti_sessions
  FOR EACH ROW
  EXECUTE FUNCTION public.credit_rti_hours();


-- ============================================================================
-- FUNCTION: Auto-generate OJT entry from PQS sign-off
-- ============================================================================
-- When an evaluator signs off a PQS task, optionally create an OJT log entry.
-- This bridges the CAET tracking and apprenticeship tracking in one action.

CREATE OR REPLACE FUNCTION public.signoff_to_ojt()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_student_shop UUID;
  v_has_apprenticeship BOOLEAN;
  v_task_desc TEXT;
BEGIN
  -- Only on new active sign-offs
  IF NEW.status != 'active' THEN
    RETURN NEW;
  END IF;
  
  -- Check if student is in apprenticeship program
  SELECT EXISTS(
    SELECT 1 FROM apprenticeship_enrollments 
    WHERE student_id = NEW.student_id AND status = 'active'
  ) INTO v_has_apprenticeship;
  
  IF NOT v_has_apprenticeship THEN
    RETURN NEW;
  END IF;
  
  -- Get student's shop
  SELECT shop_id INTO v_student_shop 
  FROM users WHERE id = NEW.student_id;
  
  -- Insert OJT log entry (auto-approved since it came from a sign-off)
  INSERT INTO ojt_logs (
    student_id, evaluator_id, shop_id, work_date,
    hours, competency_area, caet_category_id, related_task_id,
    description, status, approved_by, approved_at
  ) VALUES (
    NEW.student_id, 
    NEW.evaluator_id, 
    v_student_shop,
    CURRENT_DATE,
    1,  -- Default 1 hour per task sign-off (adjustable)
    'CAET Category ' || NEW.category_id,
    NEW.category_id,
    NEW.task_id,
    'PQS task sign-off: ' || NEW.task_id || COALESCE(' — ' || NEW.notes, ''),
    'approved',
    NEW.evaluator_id,
    now()
  );
  
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_signoff_to_ojt
  AFTER INSERT ON task_signoffs
  FOR EACH ROW
  EXECUTE FUNCTION public.signoff_to_ojt();
