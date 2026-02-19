# Claude Code Prompt: Add RTI Hour Logging + OJT Tracking to CAET Tracker

## Context
You're working on the CAET Advanced Tracking Tool — a React + TypeScript + Vite + Supabase app that tracks avionics technician certification progress. The app currently has three dashboards (Student, Evaluator, Admin) with PQS task sign-off tracking, evaluator training, and mock data.

We need to add two new systems that integrate with the existing tracker:

1. **RTI (Related Technical Instruction) Hour Logging** — tracks all training activity (study guides, micro training modules, AEA classes, OEM courses) with time-stamped sessions and auto-credits hours toward DOL apprenticeship compliance
2. **OJT (On-the-Job Training) Hour Tracking** — supervisor-attested work hours by competency area, separate from PQS sign-offs but integrated

These are for shops enrolled in the DOL registered apprenticeship program (Fastport). A shop can do CAET without apprenticeship, but if they're in the apprenticeship program, the tracker needs to log RTI and OJT hours for DOL compliance.

## New Supabase Migration

Add this file as `supabase/migrations/002_rti_ojt_schema.sql`. The full SQL is already written — read the file at `artifacts/dennis/002_rti_ojt_schema.sql` in the workspace, or I'll paste it if needed. It adds:

- `training_content` — registry of all training modules (micro modules, study guides, AEA classes, OEM training)
- `rti_sessions` — time-stamped training sessions with auto-credit triggers
- `ojt_logs` — supervisor-attested OJT hours
- `apprenticeship_enrollments` — links student to DOL program with phase/hour tracking
- `wage_progressions` — DOL-required wage increase documentation
- 3 compliance views (`v_rti_hours_by_phase`, `v_ojt_hours_by_competency`, `v_dol_compliance`)
- 2 triggers (auto-credit RTI hours on completion, auto-generate OJT entry from PQS sign-off)
- Full RLS policies matching existing patterns

## Mock Data Additions

Add to `src/lib/mock-data.ts`:

### Training Content (5-8 items)
```typescript
export interface MockTrainingContent {
  id: string
  content_type: 'micro_module' | 'study_guide' | 'aea_class' | 'oem_training' | 'online_course' | 'external'
  title: string
  description: string
  rti_hours: number
  apprenticeship_phase: number | null
  competency_domain: string | null
  caet_category_id: number | null
  mapped_task_ids: string[]
  min_duration_minutes: number | null
  requires_quiz_pass: boolean
  source_url: string | null
  status: 'draft' | 'approved' | 'retired'
}
```

Create realistic entries:
- "Crimping D-Sub Machined Pins" (micro_module, 0.5 RTI hours, category 6, phase 2)
- "Pitot-Static Systems Fundamentals" (study_guide, 2.0 RTI hours, category 1, phase 1)
- "ADS-B Compliance & Testing" (study_guide, 1.5 RTI hours, category 2, phase 1)
- "AEA Pitot-Static Certification Class" (aea_class, 16.0 RTI hours, category 1, phase 2)
- "Garmin GTN Xi Installation Training" (oem_training, 8.0 RTI hours, category 4, phase 3)
- "Wire Harness Fabrication Basics" (online_course, 3.0 RTI hours, category 6, phase 1)

### RTI Sessions
Create 10-15 mock sessions across students:
- Aisha: 8+ completed sessions (she's the advanced student), mix of content types, ~45 RTI hours total
- Marcus: 4-5 completed sessions, ~15 RTI hours
- Sarah: 2-3 completed, ~8 RTI hours
- James/Tyler: 1 each, ~3 RTI hours each

Each session needs: student_id, content_id, started_at, completed_at, duration_minutes, status, quiz_score (if applicable), rti_hours_earned, apprenticeship_phase

### OJT Logs
Create 15-20 mock OJT entries:
- Spread across students proportional to their PQS progress
- Realistic competency areas: "Pitot-Static Systems", "Surveillance & Transponder", "Wire Harness & Installation", "Documentation & Compliance", "Autopilot Systems", "FMS Operations"
- Hours between 2-8 per entry
- Mix of approved and pending status
- Aisha: ~200 OJT hours total (she's far along)
- Marcus: ~120 OJT hours
- Others: less

### Apprenticeship Enrollments
Create for 3 of 5 students (not all students are in apprenticeship):
- Aisha: active, phase 3, started 2025-10-05, starting_wage 24.00, current_wage 28.00, caet_base_date set
- Marcus: active, phase 2, started 2025-11-15, starting_wage 23.00, current_wage 25.00
- James: active, phase 1, started 2026-01-10, starting_wage 22.00, current_wage 22.00

Sarah and Tyler are NOT in apprenticeship (their shops do CAET only).

### Wage Progressions
2-3 entries for Aisha (showing progression through phases), 1 for Marcus.

## Mock DB Additions

Add to `src/lib/mock-db.ts` (following existing patterns):

```typescript
// RTI functions
export function getRTISessions(studentId: string): MockRTISession[]
export function getStudentRTIHours(studentId: string): { total: number; byPhase: Record<number, number>; byDomain: Record<string, number> }
export function startRTISession(studentId: string, contentId: string): MockRTISession
export function completeRTISession(sessionId: string, quizScore?: number): MockRTISession

// OJT functions  
export function getOJTLogs(studentId: string): MockOJTLog[]
export function getStudentOJTHours(studentId: string): { total: number; byCompetency: Record<string, number> }
export function addOJTLog(log: Omit<MockOJTLog, 'id' | 'created_at'>): MockOJTLog
export function approveOJTLog(logId: string, approvedBy: string): void

// Apprenticeship functions
export function getApprenticeshipEnrollment(studentId: string): MockApprenticeshipEnrollment | null
export function getDOLCompliance(studentId: string): { rti: {...}, ojt: {...}, wage: {...}, pqs: {...} }

// Training content
export function getTrainingContent(status?: string): MockTrainingContent[]
export function getTrainingContentById(id: string): MockTrainingContent | null
```

## TypeScript Types

Add to `src/types/database.ts`:

```typescript
export type ContentType = 'micro_module' | 'study_guide' | 'aea_class' | 'oem_training' | 'online_course' | 'external'
export type RTISessionStatus = 'in_progress' | 'completed' | 'abandoned' | 'invalidated'
export type OJTStatus = 'pending' | 'approved' | 'rejected'
export type ApprenticeshipStatus = 'active' | 'completed' | 'suspended' | 'cancelled'
```

## UI Changes

### Student Dashboard — Add "Apprenticeship" tab
Only visible if the student has an apprenticeship enrollment. Show:

1. **RTI Hours Progress**
   - Overall progress bar: X / 586 total hours
   - Phase breakdown: Phase 1 (X/150), Phase 2 (X/150), Phase 3 (X/100), Phase 4 (X/100)
   - Each phase as a mini progress bar with color coding
   - Recent RTI sessions list (last 10) with content title, date, hours earned

2. **OJT Hours Summary**
   - Total OJT hours logged
   - Hours by competency area (bar chart or category cards like the existing PQS view)
   - Pending entries highlighted in amber

3. **Training Library**
   - Grid of available training content (approved only)
   - Each card shows: title, type badge, RTI hours, estimated duration
   - "Start Training" button that creates an RTI session
   - Completed content shows green check + date completed

4. **DOL Compliance Card** (compact)
   - RTI: X/586 hrs (X%)
   - OJT: X hrs logged
   - Current phase: X of 4
   - Wage: $X.XX → $X.XX (current → target)
   - CAET Base: ✓ date or ○ pending
   - CAET Advanced: ✓ date or ○ pending

### Evaluator Dashboard — Add "OJT" tab
Only visible if evaluator's shop has apprenticeship students. Show:

1. **Log OJT Hours** form
   - Select student (dropdown, shop students only)
   - Date picker
   - Hours (number input)
   - Competency area (dropdown matching the list)
   - Description (text area)
   - Submit button

2. **Pending Approvals** list
   - OJT entries with status='pending'
   - Approve / Reject buttons with reason field for rejection

3. **Student OJT Summary**
   - Same student cards as existing but with OJT hour totals added

### Admin Dashboard — Add "Apprenticeship" tab
Show:

1. **DOL Compliance Overview**
   - Table: Student | Shop | Phase | RTI Hours | OJT Hours | Wage | Status
   - Color-coded: green (on track), amber (behind), red (at risk)
   - Pull from the `v_dol_compliance` view concept

2. **Training Content Management** (stretch — even a simple list is fine)
   - List all training content
   - Status badges (draft/approved/retired)
   - RTI hours per item

## Design Rules
- Match the existing dark slate design system exactly (bg-slate-950, border-slate-800, etc.)
- Use the same component patterns: `Bar`, `AICard`, `Icons` from `src/components/shared/`
- Tabs use the same style as existing tabs
- Progress bars use the `Bar` component
- Cards use `bg-slate-900 border border-slate-800 rounded-lg`
- Amber for warnings/pending, emerald for success/approved, rose for errors/rejected, cyan for info
- If a student is NOT in apprenticeship, the Apprenticeship tab simply doesn't appear — no error states needed

## Important Constraints
- Keep everything on mock data for now (same pattern as existing mock-db.ts)
- Don't touch existing functionality — this is purely additive
- The existing PQS sign-off flow stays exactly as-is
- The `signoff_to_ojt` trigger concept should be reflected in mock-db: when `addSignoff()` is called for a student with an apprenticeship enrollment, also create an OJT log entry
- Use the existing schema.ts pattern for any new schema data
- Keep TypeScript strict — no `any` types

## File Structure
```
src/
  components/
    student/
      StudentDash.tsx          ← add Apprenticeship tab
      ApprenticeshipTab.tsx    ← NEW: the apprenticeship view
      TrainingLibrary.tsx      ← NEW: training content grid
    evaluator/
      EvaluatorDash.tsx        ← add OJT tab
      OJTTab.tsx               ← NEW: OJT logging + approvals
    admin/
      AdminDash.tsx            ← add Apprenticeship tab
      ApprenticeshipAdmin.tsx  ← NEW: DOL compliance overview
  lib/
    mock-data.ts               ← add new mock data
    mock-db.ts                 ← add new functions
  types/
    database.ts                ← add new types
supabase/
  migrations/
    002_rti_ojt_schema.sql     ← NEW: the migration file
```

Start by adding the types, then mock data, then mock-db functions, then UI components. Test that the app still builds cleanly after each major addition.
