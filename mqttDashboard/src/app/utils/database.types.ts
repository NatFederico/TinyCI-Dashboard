export interface Database {
  public: {
    Tables: {
      boards: {
        Row: {
          hub: string | null
          id: string
          name: string
        }
        Insert: {
          hub?: string | null
          id: string
          name: string
        }
        Update: {
          hub?: string | null
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "boards_hub_fkey"
            columns: ["hub"]
            referencedRelation: "Hubs"
            referencedColumns: ["id"]
          }
        ]
      }
      Hubs: {
        Row: {
          device: string | null
          id: string
        }
        Insert: {
          device?: string | null
          id: string
        }
        Update: {
          device?: string | null
          id?: string
        }
        Relationships: []
      }
      producer: {
        Row: {
          created_at: string
          firmware: JSON
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          firmware: JSON
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          firmware?: JSON
          id?: number
          name?: string
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
