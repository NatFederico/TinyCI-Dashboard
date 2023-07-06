export interface Database {
  public: {
    Tables: {
      boards: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      producer: {
        Row: {
          created_at: string
          name: string
          firmware: JSON
          id: number
        }
        Insert: {
          created_at?: string
          name: string
          firmware: JSON
          id?: number
        }
        Update: {
          created_at?: string
          name?: string
          firmware?: JSON
          id?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}