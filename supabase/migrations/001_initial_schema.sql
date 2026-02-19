-- ============================================================================
-- CAET Advanced Practical Qualification Tracker
-- Initial Schema Migration
-- ============================================================================

-- ─── SHOPS ──────────────────────────────────────────────────────────────────

CREATE TABLE shops (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  location TEXT,
  certificate_number TEXT,           -- Part 145 certificate
  contact_name TEXT,
  contact_email TEXT,
  status TEXT NOT NULL DEFAULT 'active'
    CHECK (status IN ('active', 'inactive', 'suspended')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─── USERS ──────────────────────────────────────────────────────────────────

CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'shop_evaluator', 'student')),
  shop_id UUID REFERENCES shops(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─── ENROLLMENTS ────────────────────────────────────────────────────────────

CREATE TABLE enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  shop_id UUID NOT NULL REFERENCES shops(id),
  start_date DATE NOT NULL DEFAULT CURRENT_DATE,
  expiration_date DATE NOT NULL
    GENERATED ALWAYS AS (start_date + INTERVAL '36 months') STORED,
  status TEXT NOT NULL DEFAULT 'active'
    CHECK (status IN ('active', 'completed', 'withdrawn')),
  written_exam_date DATE,
  written_exam_score NUMERIC,
  certificate_number TEXT,
  certificate_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(student_id, shop_id)
);

-- ─── TASK SIGN-OFFS ─────────────────────────────────────────────────────────
-- Core audit table. One active sign-off per student per task.
-- Reversals update status but original record is preserved.

CREATE TABLE task_signoffs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  evaluator_id UUID NOT NULL REFERENCES users(id),
  task_id TEXT NOT NULL,              -- e.g. "1-01"
  category_id INTEGER NOT NULL,       -- 1-8
  signed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'active'
    CHECK (status IN ('active', 'reversed')),
  reversed_by UUID REFERENCES users(id),
  reversed_at TIMESTAMPTZ,
  reversal_reason TEXT,
  UNIQUE(student_id, task_id)
);

CREATE INDEX idx_signoffs_student ON task_signoffs(student_id);
CREATE INDEX idx_signoffs_evaluator ON task_signoffs(evaluator_id);
CREATE INDEX idx_signoffs_task ON task_signoffs(task_id);

-- ─── CATEGORY COMPLETIONS ───────────────────────────────────────────────────

CREATE TABLE category_completions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  evaluator_id UUID NOT NULL REFERENCES users(id),
  category_id INTEGER NOT NULL,
  signed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(student_id, category_id)
);

-- ─── EVALUATOR TRAINING ─────────────────────────────────────────────────────

CREATE TABLE evaluator_training (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  evaluator_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  module_id TEXT NOT NULL,            -- e.g. "ET-01"
  completed_at TIMESTAMPTZ,
  score NUMERIC,
  UNIQUE(evaluator_id, module_id)
);

-- ─── ORAL BOARDS ────────────────────────────────────────────────────────────

CREATE TABLE oral_boards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  scheduled_date DATE,
  location TEXT,
  board_member_1 TEXT,
  board_member_2 TEXT,
  board_member_3 TEXT,
  result TEXT CHECK (result IN ('QUALIFIED', 'NOT_YET_QUALIFIED')),
  comments TEXT,
  certificate_number TEXT,
  completed_at TIMESTAMPTZ,
  recorded_by UUID REFERENCES users(id)
);


-- ============================================================================
-- ROW-LEVEL SECURITY
-- ============================================================================

ALTER TABLE shops ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE task_signoffs ENABLE ROW LEVEL SECURITY;
ALTER TABLE category_completions ENABLE ROW LEVEL SECURITY;
ALTER TABLE evaluator_training ENABLE ROW LEVEL SECURITY;
ALTER TABLE oral_boards ENABLE ROW LEVEL SECURITY;

-- ─── HELPER: get current user's role ────────────────────────────────────────

CREATE OR REPLACE FUNCTION public.get_user_role()
RETURNS TEXT
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role FROM public.users WHERE id = auth.uid();
$$;

-- ─── HELPER: get current user's shop_id ─────────────────────────────────────

CREATE OR REPLACE FUNCTION public.get_user_shop_id()
RETURNS UUID
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT shop_id FROM public.users WHERE id = auth.uid();
$$;

-- ─── SHOPS POLICIES ─────────────────────────────────────────────────────────

-- Everyone can read their own shop; admins can read all
CREATE POLICY shops_select ON shops FOR SELECT USING (
  get_user_role() = 'admin'
  OR id = get_user_shop_id()
);

-- Only admins can insert/update/delete shops
CREATE POLICY shops_insert ON shops FOR INSERT
  WITH CHECK (get_user_role() = 'admin');

CREATE POLICY shops_update ON shops FOR UPDATE USING (
  get_user_role() = 'admin'
);

CREATE POLICY shops_delete ON shops FOR DELETE USING (
  get_user_role() = 'admin'
);

-- ─── USERS POLICIES ─────────────────────────────────────────────────────────

-- Students see themselves; evaluators see their shop; admins see all
CREATE POLICY users_select ON users FOR SELECT USING (
  get_user_role() = 'admin'
  OR id = auth.uid()
  OR (get_user_role() = 'shop_evaluator' AND shop_id = get_user_shop_id())
);

-- Users can insert their own record during registration
CREATE POLICY users_insert ON users FOR INSERT
  WITH CHECK (id = auth.uid());

-- Only admins can update other users; users can update themselves
CREATE POLICY users_update ON users FOR UPDATE USING (
  get_user_role() = 'admin' OR id = auth.uid()
);

-- ─── ENROLLMENTS POLICIES ───────────────────────────────────────────────────

-- Students see own; evaluators see their shop; admins see all
CREATE POLICY enrollments_select ON enrollments FOR SELECT USING (
  get_user_role() = 'admin'
  OR student_id = auth.uid()
  OR (get_user_role() = 'shop_evaluator' AND shop_id = get_user_shop_id())
);

-- Only admins can create enrollments
CREATE POLICY enrollments_insert ON enrollments FOR INSERT
  WITH CHECK (get_user_role() = 'admin');

-- Only admins can update enrollments
CREATE POLICY enrollments_update ON enrollments FOR UPDATE USING (
  get_user_role() = 'admin'
);

-- ─── TASK SIGNOFFS POLICIES ─────────────────────────────────────────────────

-- Students see own; evaluators see their shop's students; admins see all
CREATE POLICY signoffs_select ON task_signoffs FOR SELECT USING (
  get_user_role() = 'admin'
  OR student_id = auth.uid()
  OR (
    get_user_role() = 'shop_evaluator'
    AND student_id IN (
      SELECT u.id FROM users u WHERE u.shop_id = get_user_shop_id()
    )
  )
);

-- Evaluators can sign off tasks for students in their shop; admins can sign off for anyone
CREATE POLICY signoffs_insert ON task_signoffs FOR INSERT
  WITH CHECK (
    get_user_role() = 'admin'
    OR (
      get_user_role() = 'shop_evaluator'
      AND evaluator_id = auth.uid()
      AND student_id IN (
        SELECT u.id FROM users u WHERE u.shop_id = get_user_shop_id()
      )
    )
  );

-- Only evaluator who signed off or admins can update (for reversals)
CREATE POLICY signoffs_update ON task_signoffs FOR UPDATE USING (
  get_user_role() = 'admin'
  OR (get_user_role() = 'shop_evaluator' AND evaluator_id = auth.uid())
);

-- No deletes — audit trail is immutable
-- (no DELETE policy = no one can delete)

-- ─── CATEGORY COMPLETIONS POLICIES ──────────────────────────────────────────

CREATE POLICY cat_completions_select ON category_completions FOR SELECT USING (
  get_user_role() = 'admin'
  OR student_id = auth.uid()
  OR (
    get_user_role() = 'shop_evaluator'
    AND student_id IN (
      SELECT u.id FROM users u WHERE u.shop_id = get_user_shop_id()
    )
  )
);

CREATE POLICY cat_completions_insert ON category_completions FOR INSERT
  WITH CHECK (
    get_user_role() = 'admin'
    OR (
      get_user_role() = 'shop_evaluator'
      AND evaluator_id = auth.uid()
    )
  );

-- ─── EVALUATOR TRAINING POLICIES ────────────────────────────────────────────

-- Evaluators see own training; admins see all
CREATE POLICY eval_training_select ON evaluator_training FOR SELECT USING (
  get_user_role() = 'admin'
  OR evaluator_id = auth.uid()
  -- Evaluators in the same shop can see each other's training status
  OR (
    get_user_role() = 'shop_evaluator'
    AND evaluator_id IN (
      SELECT u.id FROM users u WHERE u.shop_id = get_user_shop_id()
    )
  )
);

-- Only admins can manage training records
CREATE POLICY eval_training_insert ON evaluator_training FOR INSERT
  WITH CHECK (get_user_role() = 'admin');

CREATE POLICY eval_training_update ON evaluator_training FOR UPDATE USING (
  get_user_role() = 'admin'
);

-- ─── ORAL BOARDS POLICIES ───────────────────────────────────────────────────

-- Students see own; admins see all
CREATE POLICY oral_boards_select ON oral_boards FOR SELECT USING (
  get_user_role() = 'admin'
  OR student_id = auth.uid()
);

-- Only admins can manage oral boards
CREATE POLICY oral_boards_insert ON oral_boards FOR INSERT
  WITH CHECK (get_user_role() = 'admin');

CREATE POLICY oral_boards_update ON oral_boards FOR UPDATE USING (
  get_user_role() = 'admin'
);


-- ============================================================================
-- HELPER FUNCTION: Check if evaluator training is current
-- ============================================================================

CREATE OR REPLACE FUNCTION public.is_evaluator_training_current(evaluator UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COUNT(*) = 5
  FROM evaluator_training
  WHERE evaluator_id = evaluator
    AND completed_at IS NOT NULL
    AND completed_at > now() - INTERVAL '24 months';
$$;

-- ============================================================================
-- TRIGGER: Auto-create user profile after auth signup
-- ============================================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'role', 'student')
  );
  RETURN NEW;
END;
$$;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
