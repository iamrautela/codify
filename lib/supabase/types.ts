export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      prompts: {
        Row: {
          id: string
          user_id: string | null
          prompt_text: string
          status: 'pending' | 'processing' | 'completed' | 'failed'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          prompt_text: string
          status?: 'pending' | 'processing' | 'completed' | 'failed'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          prompt_text?: string
          status?: 'pending' | 'processing' | 'completed' | 'failed'
          created_at?: string
          updated_at?: string
        }
      }
      generated_websites: {
        Row: {
          id: string
          prompt_id: string
          user_id: string | null
          title: string
          description: string
          html_content: string
          css_content: string
          js_content: string | null
          preview_url: string | null
          is_public: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          prompt_id: string
          user_id?: string | null
          title?: string
          description?: string
          html_content?: string
          css_content?: string
          js_content?: string | null
          preview_url?: string | null
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          prompt_id?: string
          user_id?: string | null
          title?: string
          description?: string
          html_content?: string
          css_content?: string
          js_content?: string | null
          preview_url?: string | null
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      prompt_status: 'pending' | 'processing' | 'completed' | 'failed'
    }
  }
}