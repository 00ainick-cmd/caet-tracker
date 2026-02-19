import type { UserRole, SignoffStatus } from '../types/database'

// ── SHOPS ─────────────────────────────────────────────────────────────

export interface MockShop {
  id: string
  name: string
  location: string
  certificate_number: string
  contact_name: string
  contact_email: string
  status: 'active' | 'inactive' | 'suspended'
  created_at: string
}

export const SHOPS: MockShop[] = [
  {
    id: 'shop-mw',
    name: 'Midwest Avionics',
    location: 'Wichita, KS',
    certificate_number: 'Y4DR741K',
    contact_name: 'Mike Torres',
    contact_email: 'mike@midwestavionics.com',
    status: 'active',
    created_at: '2025-09-01T00:00:00Z',
  },
  {
    id: 'shop-col',
    name: 'Collins Aerospace',
    location: 'Cedar Rapids, IA',
    certificate_number: 'C3RS201A',
    contact_name: 'Lisa Park',
    contact_email: 'lisa@collins.com',
    status: 'active',
    created_at: '2025-10-01T00:00:00Z',
  },
  {
    id: 'shop-dun',
    name: 'Duncan Aviation',
    location: 'Lincoln, NE',
    certificate_number: 'D7KR482N',
    contact_name: 'Dan Webb',
    contact_email: 'dan@duncan.com',
    status: 'active',
    created_at: '2025-10-15T00:00:00Z',
  },
]

// ── USERS ─────────────────────────────────────────────────────────────

export interface MockUser {
  id: string
  email: string
  full_name: string
  role: UserRole
  shop_id: string | null
  created_at: string
}

export const USERS: MockUser[] = [
  // Students
  {
    id: 'user-marcus',
    email: 'marcus@midwestavionics.com',
    full_name: 'Marcus Rivera',
    role: 'student',
    shop_id: 'shop-mw',
    created_at: '2025-11-15T00:00:00Z',
  },
  {
    id: 'user-sarah',
    email: 'sarah@collins.com',
    full_name: 'Sarah Chen',
    role: 'student',
    shop_id: 'shop-col',
    created_at: '2025-12-01T00:00:00Z',
  },
  {
    id: 'user-james',
    email: 'james@duncan.com',
    full_name: 'James Patterson',
    role: 'student',
    shop_id: 'shop-dun',
    created_at: '2026-01-10T00:00:00Z',
  },
  {
    id: 'user-aisha',
    email: 'aisha@midwestavionics.com',
    full_name: 'Aisha Kamara',
    role: 'student',
    shop_id: 'shop-mw',
    created_at: '2025-10-05T00:00:00Z',
  },
  {
    id: 'user-tyler',
    email: 'tyler@duncan.com',
    full_name: 'Tyler Brooks',
    role: 'student',
    shop_id: 'shop-dun',
    created_at: '2026-01-20T00:00:00Z',
  },
  // Evaluators
  {
    id: 'user-mike',
    email: 'mike@midwestavionics.com',
    full_name: 'Mike Torres',
    role: 'shop_evaluator',
    shop_id: 'shop-mw',
    created_at: '2025-09-01T00:00:00Z',
  },
  {
    id: 'user-lisa',
    email: 'lisa@collins.com',
    full_name: 'Lisa Park',
    role: 'shop_evaluator',
    shop_id: 'shop-col',
    created_at: '2025-10-01T00:00:00Z',
  },
  {
    id: 'user-dan',
    email: 'dan@duncan.com',
    full_name: 'Dan Webb',
    role: 'shop_evaluator',
    shop_id: 'shop-dun',
    created_at: '2025-10-15T00:00:00Z',
  },
  // Admin
  {
    id: 'user-admin',
    email: 'admin@aea.net',
    full_name: 'Nick Brown',
    role: 'admin',
    shop_id: null,
    created_at: '2025-08-01T00:00:00Z',
  },
]

// ── ENROLLMENTS ───────────────────────────────────────────────────────

export interface MockEnrollment {
  id: string
  student_id: string
  shop_id: string
  start_date: string
  expiration_date: string
  status: 'active' | 'completed' | 'withdrawn'
  written_exam_date: string | null
  written_exam_score: number | null
  certificate_number: string | null
  certificate_date: string | null
  created_at: string
}

export const ENROLLMENTS: MockEnrollment[] = [
  {
    id: 'enr-marcus',
    student_id: 'user-marcus',
    shop_id: 'shop-mw',
    start_date: '2025-11-15',
    expiration_date: '2028-11-15',
    status: 'active',
    written_exam_date: null,
    written_exam_score: null,
    certificate_number: null,
    certificate_date: null,
    created_at: '2025-11-15T00:00:00Z',
  },
  {
    id: 'enr-sarah',
    student_id: 'user-sarah',
    shop_id: 'shop-col',
    start_date: '2025-12-01',
    expiration_date: '2028-12-01',
    status: 'active',
    written_exam_date: null,
    written_exam_score: null,
    certificate_number: null,
    certificate_date: null,
    created_at: '2025-12-01T00:00:00Z',
  },
  {
    id: 'enr-james',
    student_id: 'user-james',
    shop_id: 'shop-dun',
    start_date: '2026-01-10',
    expiration_date: '2029-01-10',
    status: 'active',
    written_exam_date: null,
    written_exam_score: null,
    certificate_number: null,
    certificate_date: null,
    created_at: '2026-01-10T00:00:00Z',
  },
  {
    id: 'enr-aisha',
    student_id: 'user-aisha',
    shop_id: 'shop-mw',
    start_date: '2025-10-05',
    expiration_date: '2028-10-05',
    status: 'active',
    written_exam_date: '2026-02-10',
    written_exam_score: 88,
    certificate_number: null,
    certificate_date: null,
    created_at: '2025-10-05T00:00:00Z',
  },
  {
    id: 'enr-tyler',
    student_id: 'user-tyler',
    shop_id: 'shop-dun',
    start_date: '2026-01-20',
    expiration_date: '2029-01-20',
    status: 'active',
    written_exam_date: null,
    written_exam_score: null,
    certificate_number: null,
    certificate_date: null,
    created_at: '2026-01-20T00:00:00Z',
  },
]

// ── TASK SIGNOFFS ─────────────────────────────────────────────────────
// Pre-built from the prototype's completedTasks arrays

export interface MockSignoff {
  id: string
  student_id: string
  evaluator_id: string
  task_id: string
  category_id: number
  signed_at: string
  notes: string | null
  status: SignoffStatus
  reversed_by: string | null
  reversed_at: string | null
  reversal_reason: string | null
}

function taskCategory(taskId: string): number {
  return parseInt(taskId.split('-')[0], 10)
}

function buildSignoffs(
  studentId: string,
  evaluatorId: string,
  taskIds: string[],
  baseDate: string
): MockSignoff[] {
  return taskIds.map((taskId, i) => ({
    id: `so-${studentId}-${taskId}`,
    student_id: studentId,
    evaluator_id: evaluatorId,
    task_id: taskId,
    category_id: taskCategory(taskId),
    signed_at: new Date(
      new Date(baseDate).getTime() + i * 2 * 24 * 60 * 60 * 1000
    ).toISOString(),
    notes: null,
    status: 'active' as const,
    reversed_by: null,
    reversed_at: null,
    reversal_reason: null,
  }))
}

// All 65 task IDs for Aisha (completed all)
const ALL_TASK_IDS = [
  '1-01','1-02','1-03','1-04','1-05','1-06','1-07','1-08','1-09','1-10',
  '2-01','2-02','2-03','2-04','2-05','2-06','2-07','2-08',
  '3-01','3-02','3-03','3-04','3-05','3-06','3-07','3-08',
  '4-01','4-02','4-03','4-04','4-05','4-06','4-07','4-08',
  '5-01','5-02','5-03','5-04','5-05','5-06','5-07','5-08',
  '6-01','6-02','6-03','6-04','6-05','6-06','6-07','6-08',
  '7-01','7-02','7-03','7-04','7-05','7-06','7-07',
  '8-01','8-02','8-03','8-04','8-05','8-06','8-07','8-08',
]

export const SIGNOFFS: MockSignoff[] = [
  // Marcus — 42 tasks done
  ...buildSignoffs(
    'user-marcus',
    'user-mike',
    [
      '1-01','1-02','1-03','1-04','1-05','1-06','1-07','1-08','1-09','1-10',
      '2-01','2-02','2-03','2-04','2-05','2-06','2-07','2-08',
      '3-01','3-02','3-03','3-04','3-05',
      '4-01','4-02','4-03',
      '5-01','5-02','5-03','5-04',
      '6-01','6-02','6-03','6-04','6-05','6-06',
      '7-01','7-02','7-03',
      '8-01','8-02','8-03',
    ],
    '2025-11-20'
  ),
  // Sarah — 16 tasks done
  ...buildSignoffs(
    'user-sarah',
    'user-lisa',
    [
      '1-01','1-02','1-03','1-04','1-05',
      '2-01','2-02','2-03',
      '3-01','3-02',
      '5-01','5-02',
      '6-01','6-02','6-03',
      '8-01',
    ],
    '2025-12-10'
  ),
  // James — 6 tasks done
  ...buildSignoffs(
    'user-james',
    'user-dan',
    ['1-01','1-02','1-03','6-01','6-02','8-01'],
    '2026-01-15'
  ),
  // Aisha — all 65 done
  ...buildSignoffs('user-aisha', 'user-mike', ALL_TASK_IDS, '2025-10-10'),
  // Tyler — 3 tasks done
  ...buildSignoffs(
    'user-tyler',
    'user-dan',
    ['1-01','1-02','6-01'],
    '2026-01-25'
  ),
]

// ── EVALUATOR TRAINING ────────────────────────────────────────────────

export interface MockEvaluatorTraining {
  id: string
  evaluator_id: string
  module_id: string
  completed_at: string | null
  score: number | null
}

export const EVALUATOR_TRAINING: MockEvaluatorTraining[] = [
  // Mike Torres — all 5 complete
  ...['ET-01','ET-02','ET-03','ET-04','ET-05'].map((mod, i) => ({
    id: `et-mike-${mod}`,
    evaluator_id: 'user-mike',
    module_id: mod,
    completed_at: new Date(2025, 8, 5 + i).toISOString(),
    score: 95 + i,
  })),
  // Lisa Park — 2 of 5
  ...['ET-01','ET-02'].map((mod, i) => ({
    id: `et-lisa-${mod}`,
    evaluator_id: 'user-lisa',
    module_id: mod,
    completed_at: new Date(2025, 9, 3 + i).toISOString(),
    score: 90 + i,
  })),
  // Dan Webb — 1 of 5
  {
    id: 'et-dan-ET-01',
    evaluator_id: 'user-dan',
    module_id: 'ET-01',
    completed_at: new Date(2025, 9, 20).toISOString(),
    score: 88,
  },
]

// ── NOT YET QUALIFIED ATTEMPTS ────────────────────────────────────────

export interface MockNYQAttempt {
  id: string
  student_id: string
  evaluator_id: string
  task_id: string
  category_id: number
  attempted_at: string
  notes: string
  areas_to_improve: string[]
}

export const NYQ_ATTEMPTS: MockNYQAttempt[] = [
  {
    id: 'nyq-1',
    student_id: 'user-marcus',
    evaluator_id: 'user-mike',
    task_id: '3-06',
    category_id: 3,
    attempted_at: '2026-01-15T14:30:00Z',
    notes: 'Struggled with proper cable routing through bulkhead penetrations.',
    areas_to_improve: ['Cable bend radius compliance', 'Proper grommet installation', 'Strain relief placement'],
  },
  {
    id: 'nyq-2',
    student_id: 'user-sarah',
    evaluator_id: 'user-lisa',
    task_id: '2-04',
    category_id: 2,
    attempted_at: '2026-01-20T10:00:00Z',
    notes: 'Could not correctly identify all required test points. Needs more study time on test equipment procedures.',
    areas_to_improve: ['Test point identification', 'Proper use of multimeter in circuit', 'Recording test results'],
  },
  {
    id: 'nyq-3',
    student_id: 'user-james',
    evaluator_id: 'user-dan',
    task_id: '1-04',
    category_id: 1,
    attempted_at: '2026-02-01T09:00:00Z',
    notes: 'Documentation incomplete — missed required log entries.',
    areas_to_improve: ['Complete documentation requirements', 'Cross-referencing maintenance manual sections'],
  },
]

// ── DEMO ACCOUNTS (for quick sign-in) ─────────────────────────────────

export const DEMO_ACCOUNTS = [
  { email: 'marcus@midwestavionics.com', label: 'Marcus Rivera', role: 'Student' as const, company: 'Midwest Avionics' },
  { email: 'mike@midwestavionics.com', label: 'Mike Torres', role: 'Evaluator' as const, company: 'Midwest Avionics' },
  { email: 'admin@aea.net', label: 'Nick Brown', role: 'Admin' as const, company: 'AEA' },
]
