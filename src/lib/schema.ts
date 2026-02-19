// Import the schema JSON statically for the mock/dev build
// In production this would be fetched from an API
import schemaData from '../schema/CAET-TMS-Schema.json'

export interface SchemaTask {
  id: string
  description: string
  mapped_questions: number[]
}

export interface SchemaCategory {
  id: number
  title: string
  task_count: number
  test_bank_modules: number[]
  tasks: SchemaTask[]
}

export interface EvaluatorTrainingModule {
  id: string
  title: string
  description: string
  topics: string[]
  duration_minutes: number
  assessment: string
}

export interface Schema {
  schema_version: string
  program: {
    name: string
    authority: string
    competency_standard: string
    competency_definition: Record<string, string>
    certification_flow: Array<{
      step: number
      gate: string
      description: string
    }>
    time_limit_months: number
  }
  categories: SchemaCategory[]
  evaluator_training: {
    modules: EvaluatorTrainingModule[]
    completion_requirement: string
    recurrent_interval_months: number
  }
}

export const SCHEMA = schemaData as unknown as Schema

export const TOTAL_TASKS = SCHEMA.categories.reduce(
  (sum, cat) => sum + cat.tasks.length,
  0
)

export const CAT_COLORS = [
  'bg-sky-500',
  'bg-violet-500',
  'bg-rose-500',
  'bg-amber-500',
  'bg-emerald-500',
  'bg-orange-500',
  'bg-cyan-500',
  'bg-pink-500',
]

export const CAT_BORDERS = [
  'border-sky-700',
  'border-violet-700',
  'border-rose-700',
  'border-amber-700',
  'border-emerald-700',
  'border-orange-700',
  'border-cyan-700',
  'border-pink-700',
]

// ── Lookup helpers ──────────────────────────────────────────────────

export function findTask(taskId: string): (SchemaTask & { catTitle: string; catId: number }) | null {
  for (const cat of SCHEMA.categories) {
    const task = cat.tasks.find(t => t.id === taskId)
    if (task) return { ...task, catTitle: cat.title, catId: cat.id }
  }
  return null
}

export interface CategoryProgress {
  id: number
  title: string
  tasks: SchemaTask[]
  done: number
  total: number
  pct: number
}

export function getCategoryProgress(completedTaskIds: string[]): CategoryProgress[] {
  return SCHEMA.categories.map(cat => {
    const done = cat.tasks.filter(t => completedTaskIds.includes(t.id)).length
    return {
      id: cat.id,
      title: cat.title,
      tasks: cat.tasks,
      done,
      total: cat.tasks.length,
      pct: Math.round((done / cat.tasks.length) * 100),
    }
  })
}

export function getNextRecommended(
  completedTaskIds: string[],
  pendingTaskIds: string[],
  count = 3
): Array<SchemaTask & { catTitle: string; catId: number }> {
  const results: Array<SchemaTask & { catTitle: string; catId: number }> = []
  for (const cat of SCHEMA.categories) {
    for (const task of cat.tasks) {
      if (
        !completedTaskIds.includes(task.id) &&
        !pendingTaskIds.includes(task.id)
      ) {
        results.push({ ...task, catTitle: cat.title, catId: cat.id })
        if (results.length >= count) return results
      }
    }
  }
  return results
}

export function getPaceAnalysis(
  completedCount: number,
  startDate: string
): {
  elapsed: number
  remaining: number
  done: number
  left: number
  pace: number
  projected: number
  onTrack: boolean
  complete: boolean
} {
  const start = new Date(startDate)
  const now = new Date()
  const elapsed = Math.max(1, Math.floor((now.getTime() - start.getTime()) / 86400000))
  const targetDays = SCHEMA.program.time_limit_months * 30
  const remaining = targetDays - elapsed
  const left = TOTAL_TASKS - completedCount
  const pace = completedCount > 0 ? +(elapsed / completedCount).toFixed(1) : 999
  const projected = Math.round(pace * left)
  return {
    elapsed,
    remaining,
    done: completedCount,
    left,
    pace,
    projected,
    onTrack: projected <= remaining || left === 0,
    complete: left === 0,
  }
}
