export type UserRole = 'admin' | 'shop_evaluator' | 'student'

export type EnrollmentStatus = 'active' | 'completed' | 'withdrawn'

export type ShopStatus = 'active' | 'inactive' | 'suspended'

export type SignoffStatus = 'active' | 'reversed'

export type OralBoardResult = 'QUALIFIED' | 'NOT_YET_QUALIFIED'

export type EvaluatorTrainingStatus = 'current' | 'due_soon' | 'overdue' | 'not_started'

export interface Database {
  public: {
    Tables: {
      shops: {
        Row: {
          id: string
          name: string
          location: string | null
          certificate_number: string | null
          contact_name: string | null
          contact_email: string | null
          status: ShopStatus
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          location?: string | null
          certificate_number?: string | null
          contact_name?: string | null
          contact_email?: string | null
          status?: ShopStatus
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          location?: string | null
          certificate_number?: string | null
          contact_name?: string | null
          contact_email?: string | null
          status?: ShopStatus
          created_at?: string
        }
      }
      users: {
        Row: {
          id: string
          email: string
          full_name: string
          role: UserRole
          shop_id: string | null
          created_at: string
        }
        Insert: {
          id: string
          email: string
          full_name: string
          role: UserRole
          shop_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          role?: UserRole
          shop_id?: string | null
          created_at?: string
        }
      }
      enrollments: {
        Row: {
          id: string
          student_id: string
          shop_id: string
          start_date: string
          expiration_date: string
          status: EnrollmentStatus
          written_exam_date: string | null
          written_exam_score: number | null
          certificate_number: string | null
          certificate_date: string | null
          created_at: string
        }
        Insert: {
          id?: string
          student_id: string
          shop_id: string
          start_date?: string
          expiration_date?: string
          status?: EnrollmentStatus
          written_exam_date?: string | null
          written_exam_score?: number | null
          certificate_number?: string | null
          certificate_date?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          student_id?: string
          shop_id?: string
          start_date?: string
          expiration_date?: string
          status?: EnrollmentStatus
          written_exam_date?: string | null
          written_exam_score?: number | null
          certificate_number?: string | null
          certificate_date?: string | null
          created_at?: string
        }
      }
      task_signoffs: {
        Row: {
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
        Insert: {
          id?: string
          student_id: string
          evaluator_id: string
          task_id: string
          category_id: number
          signed_at?: string
          notes?: string | null
          status?: SignoffStatus
          reversed_by?: string | null
          reversed_at?: string | null
          reversal_reason?: string | null
        }
        Update: {
          id?: string
          student_id?: string
          evaluator_id?: string
          task_id?: string
          category_id?: number
          signed_at?: string
          notes?: string | null
          status?: SignoffStatus
          reversed_by?: string | null
          reversed_at?: string | null
          reversal_reason?: string | null
        }
      }
      category_completions: {
        Row: {
          id: string
          student_id: string
          evaluator_id: string
          category_id: number
          signed_at: string
        }
        Insert: {
          id?: string
          student_id: string
          evaluator_id: string
          category_id: number
          signed_at?: string
        }
        Update: {
          id?: string
          student_id?: string
          evaluator_id?: string
          category_id?: number
          signed_at?: string
        }
      }
      evaluator_training: {
        Row: {
          id: string
          evaluator_id: string
          module_id: string
          completed_at: string | null
          score: number | null
        }
        Insert: {
          id?: string
          evaluator_id: string
          module_id: string
          completed_at?: string | null
          score?: number | null
        }
        Update: {
          id?: string
          evaluator_id?: string
          module_id?: string
          completed_at?: string | null
          score?: number | null
        }
      }
      oral_boards: {
        Row: {
          id: string
          student_id: string
          scheduled_date: string | null
          location: string | null
          board_member_1: string | null
          board_member_2: string | null
          board_member_3: string | null
          result: OralBoardResult | null
          comments: string | null
          certificate_number: string | null
          completed_at: string | null
          recorded_by: string | null
        }
        Insert: {
          id?: string
          student_id: string
          scheduled_date?: string | null
          location?: string | null
          board_member_1?: string | null
          board_member_2?: string | null
          board_member_3?: string | null
          result?: OralBoardResult | null
          comments?: string | null
          certificate_number?: string | null
          completed_at?: string | null
          recorded_by?: string | null
        }
        Update: {
          id?: string
          student_id?: string
          scheduled_date?: string | null
          location?: string | null
          board_member_1?: string | null
          board_member_2?: string | null
          board_member_3?: string | null
          result?: OralBoardResult | null
          comments?: string | null
          certificate_number?: string | null
          completed_at?: string | null
          recorded_by?: string | null
        }
      }
    }
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}
