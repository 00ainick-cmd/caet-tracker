import {
  SHOPS,
  USERS,
  ENROLLMENTS,
  SIGNOFFS,
  EVALUATOR_TRAINING,
  NYQ_ATTEMPTS,
  type MockShop,
  type MockUser,
  type MockEnrollment,
  type MockSignoff,
  type MockEvaluatorTraining,
  type MockNYQAttempt,
} from './mock-data'
import { getCurrentUserId } from './mock-auth'

// ── Mutable in-memory copies ──────────────────────────────────────────

const signoffs: MockSignoff[] = [...SIGNOFFS]

// ── RLS helper ────────────────────────────────────────────────────────

function currentUser(): MockUser | null {
  const uid = getCurrentUserId()
  return uid ? USERS.find(u => u.id === uid) ?? null : null
}

// ── Shops ─────────────────────────────────────────────────────────────

export function getShops(): MockShop[] {
  const user = currentUser()
  if (!user) return []
  if (user.role === 'admin') return SHOPS
  if (user.shop_id) return SHOPS.filter(s => s.id === user.shop_id)
  return []
}

export function getShop(shopId: string): MockShop | null {
  return getShops().find(s => s.id === shopId) ?? null
}

// ── Users ─────────────────────────────────────────────────────────────

export function getUsers(): MockUser[] {
  const user = currentUser()
  if (!user) return []
  if (user.role === 'admin') return USERS
  if (user.role === 'shop_evaluator')
    return USERS.filter(u => u.shop_id === user.shop_id)
  // Students see only themselves
  return USERS.filter(u => u.id === user.id)
}

export function getStudents(): MockUser[] {
  return getUsers().filter(u => u.role === 'student')
}

export function getEvaluators(): MockUser[] {
  return getUsers().filter(u => u.role === 'shop_evaluator')
}

// ── Enrollments ───────────────────────────────────────────────────────

export function getEnrollments(): MockEnrollment[] {
  const user = currentUser()
  if (!user) return []
  if (user.role === 'admin') return ENROLLMENTS
  if (user.role === 'shop_evaluator')
    return ENROLLMENTS.filter(e => e.shop_id === user.shop_id)
  return ENROLLMENTS.filter(e => e.student_id === user.id)
}

export function getEnrollment(studentId: string): MockEnrollment | null {
  return getEnrollments().find(e => e.student_id === studentId) ?? null
}

// ── Signoffs ──────────────────────────────────────────────────────────

export function getSignoffs(studentId?: string): MockSignoff[] {
  const user = currentUser()
  if (!user) return []

  let visible: MockSignoff[]
  if (user.role === 'admin') {
    visible = signoffs
  } else if (user.role === 'shop_evaluator') {
    const shopStudentIds = USERS
      .filter(u => u.shop_id === user.shop_id)
      .map(u => u.id)
    visible = signoffs.filter(s => shopStudentIds.includes(s.student_id))
  } else {
    visible = signoffs.filter(s => s.student_id === user.id)
  }

  if (studentId) {
    visible = visible.filter(s => s.student_id === studentId)
  }

  return visible
}

export function getActiveSignoffs(studentId: string): MockSignoff[] {
  return getSignoffs(studentId).filter(s => s.status === 'active')
}

export function getCompletedTaskIds(studentId: string): string[] {
  return getActiveSignoffs(studentId).map(s => s.task_id)
}

export function addSignoff(signoff: Omit<MockSignoff, 'id'>): MockSignoff {
  const newSignoff: MockSignoff = {
    ...signoff,
    id: `so-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
  }
  signoffs.push(newSignoff)
  return newSignoff
}

export function reverseSignoff(
  signoffId: string,
  reversedBy: string,
  reason: string
): boolean {
  const so = signoffs.find(s => s.id === signoffId)
  if (!so || so.status === 'reversed') return false
  so.status = 'reversed'
  so.reversed_by = reversedBy
  so.reversed_at = new Date().toISOString()
  so.reversal_reason = reason
  return true
}

// ── Evaluator Training ────────────────────────────────────────────────

const evaluatorTraining: MockEvaluatorTraining[] = [...EVALUATOR_TRAINING]

export function getEvaluatorTraining(
  evaluatorId?: string
): MockEvaluatorTraining[] {
  const user = currentUser()
  if (!user) return []

  let visible: MockEvaluatorTraining[]
  if (user.role === 'admin') {
    visible = evaluatorTraining
  } else if (user.role === 'shop_evaluator') {
    const shopEvalIds = USERS
      .filter(u => u.shop_id === user.shop_id && u.role === 'shop_evaluator')
      .map(u => u.id)
    visible = evaluatorTraining.filter(t =>
      shopEvalIds.includes(t.evaluator_id)
    )
  } else {
    visible = []
  }

  if (evaluatorId) {
    visible = visible.filter(t => t.evaluator_id === evaluatorId)
  }

  return visible
}

export function completeEvaluatorTraining(
  evaluatorId: string,
  moduleId: string,
  score: number
): void {
  const existing = evaluatorTraining.find(
    t => t.evaluator_id === evaluatorId && t.module_id === moduleId
  )
  if (existing) {
    existing.completed_at = new Date().toISOString()
    existing.score = score
  } else {
    evaluatorTraining.push({
      id: `et-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      evaluator_id: evaluatorId,
      module_id: moduleId,
      completed_at: new Date().toISOString(),
      score,
    })
  }
}

export function isEvaluatorTrainingCurrent(evaluatorId: string): boolean {
  const training = evaluatorTraining.filter(
    t => t.evaluator_id === evaluatorId && t.completed_at
  )
  if (training.length < 5) return false
  const cutoff = new Date()
  cutoff.setMonth(cutoff.getMonth() - 24)
  return training.every(
    t => t.completed_at && new Date(t.completed_at) > cutoff
  )
}

// ── Not Yet Qualified Attempts ──────────────────────────────────────

const nyqAttempts: MockNYQAttempt[] = [...NYQ_ATTEMPTS]

export function getNYQAttempts(studentId?: string): MockNYQAttempt[] {
  const user = currentUser()
  if (!user) return []

  let visible: MockNYQAttempt[]
  if (user.role === 'admin') {
    visible = nyqAttempts
  } else if (user.role === 'shop_evaluator') {
    const shopStudentIds = USERS
      .filter(u => u.shop_id === user.shop_id)
      .map(u => u.id)
    visible = nyqAttempts.filter(a => shopStudentIds.includes(a.student_id))
  } else {
    visible = nyqAttempts.filter(a => a.student_id === user.id)
  }

  if (studentId) {
    visible = visible.filter(a => a.student_id === studentId)
  }

  return visible
}

export function addNYQAttempt(attempt: Omit<MockNYQAttempt, 'id'>): MockNYQAttempt {
  const newAttempt: MockNYQAttempt = {
    ...attempt,
    id: `nyq-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
  }
  nyqAttempts.push(newAttempt)
  return newAttempt
}

// ── Activity Feed ──────────────────────────────────────────────────

export interface ActivityItem {
  type: 'signoff' | 'reversal' | 'nyq'
  timestamp: string
  studentName: string
  evaluatorName: string
  taskId: string
  taskDescription: string
  notes?: string
}

export function getRecentActivity(limit = 20): ActivityItem[] {
  const items: ActivityItem[] = []

  // Signoffs
  const visibleSignoffs = getSignoffs()
  for (const so of visibleSignoffs) {
    const student = USERS.find(u => u.id === so.student_id)
    const evaluator = USERS.find(u => u.id === so.evaluator_id)
    if (!student || !evaluator) continue

    items.push({
      type: so.status === 'reversed' ? 'reversal' : 'signoff',
      timestamp: so.status === 'reversed' && so.reversed_at ? so.reversed_at : so.signed_at,
      studentName: student.full_name,
      evaluatorName: evaluator.full_name,
      taskId: so.task_id,
      taskDescription: '',
      notes: so.status === 'reversed' ? so.reversal_reason ?? undefined : so.notes ?? undefined,
    })
  }

  // NYQ attempts
  const visibleNYQ = getNYQAttempts()
  for (const nyq of visibleNYQ) {
    const student = USERS.find(u => u.id === nyq.student_id)
    const evaluator = USERS.find(u => u.id === nyq.evaluator_id)
    if (!student || !evaluator) continue

    items.push({
      type: 'nyq',
      timestamp: nyq.attempted_at,
      studentName: student.full_name,
      evaluatorName: evaluator.full_name,
      taskId: nyq.task_id,
      taskDescription: '',
      notes: nyq.notes,
    })
  }

  // Sort by timestamp descending
  items.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

  return items.slice(0, limit)
}
