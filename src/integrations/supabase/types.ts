export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      analytics_events: {
        Row: {
          created_at: string | null
          event_data: Json | null
          event_type: Database["public"]["Enums"]["event_type"]
          id: string
          ip_address: string | null
          restaurant_id: string
          user_agent: string | null
        }
        Insert: {
          created_at?: string | null
          event_data?: Json | null
          event_type: Database["public"]["Enums"]["event_type"]
          id?: string
          ip_address?: string | null
          restaurant_id: string
          user_agent?: string | null
        }
        Update: {
          created_at?: string | null
          event_data?: Json | null
          event_type?: Database["public"]["Enums"]["event_type"]
          id?: string
          ip_address?: string | null
          restaurant_id?: string
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "analytics_events_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          created_at: string | null
          icon: string | null
          id: string
          name: string
          restaurant_id: string
          sort_order: number | null
          visible: boolean | null
        }
        Insert: {
          created_at?: string | null
          icon?: string | null
          id?: string
          name: string
          restaurant_id: string
          sort_order?: number | null
          visible?: boolean | null
        }
        Update: {
          created_at?: string | null
          icon?: string | null
          id?: string
          name?: string
          restaurant_id?: string
          sort_order?: number | null
          visible?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "categories_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      order_items: {
        Row: {
          assigned_to: string | null
          comments: string | null
          created_at: string | null
          id: string
          order_id: string
          prepared_at: string | null
          product_id: string
          product_snapshot: Json
          quantity: number
          station: Database["public"]["Enums"]["station"] | null
          status: Database["public"]["Enums"]["item_status"] | null
          total_price: number
          unit_price: number
        }
        Insert: {
          assigned_to?: string | null
          comments?: string | null
          created_at?: string | null
          id?: string
          order_id: string
          prepared_at?: string | null
          product_id: string
          product_snapshot: Json
          quantity?: number
          station?: Database["public"]["Enums"]["station"] | null
          status?: Database["public"]["Enums"]["item_status"] | null
          total_price: number
          unit_price: number
        }
        Update: {
          assigned_to?: string | null
          comments?: string | null
          created_at?: string | null
          id?: string
          order_id?: string
          prepared_at?: string | null
          product_id?: string
          product_snapshot?: Json
          quantity?: number
          station?: Database["public"]["Enums"]["station"] | null
          status?: Database["public"]["Enums"]["item_status"] | null
          total_price?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          completed_at: string | null
          created_at: string | null
          customer_name: string | null
          customer_phone: string | null
          id: string
          order_number: string
          payment_method: Database["public"]["Enums"]["payment_method"] | null
          payment_status: Database["public"]["Enums"]["payment_status"] | null
          restaurant_id: string
          session_id: string
          special_requests: string | null
          status: Database["public"]["Enums"]["order_status"] | null
          subtotal: number | null
          table_id: string
          tax: number | null
          tip: number | null
          total: number | null
          updated_at: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          customer_name?: string | null
          customer_phone?: string | null
          id?: string
          order_number: string
          payment_method?: Database["public"]["Enums"]["payment_method"] | null
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          restaurant_id: string
          session_id: string
          special_requests?: string | null
          status?: Database["public"]["Enums"]["order_status"] | null
          subtotal?: number | null
          table_id: string
          tax?: number | null
          tip?: number | null
          total?: number | null
          updated_at?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          customer_name?: string | null
          customer_phone?: string | null
          id?: string
          order_number?: string
          payment_method?: Database["public"]["Enums"]["payment_method"] | null
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          restaurant_id?: string
          session_id?: string
          special_requests?: string | null
          status?: Database["public"]["Enums"]["order_status"] | null
          subtotal?: number | null
          table_id?: string
          tax?: number | null
          tip?: number | null
          total?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_table_id_fkey"
            columns: ["table_id"]
            isOneToOne: false
            referencedRelation: "tables"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          created_at: string | null
          id: string
          metadata: Json | null
          method: Database["public"]["Enums"]["payment_method"]
          order_id: string
          processed_by: string | null
          restaurant_id: string
          status: Database["public"]["Enums"]["payment_status"] | null
          transaction_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          id?: string
          metadata?: Json | null
          method: Database["public"]["Enums"]["payment_method"]
          order_id: string
          processed_by?: string | null
          restaurant_id: string
          status?: Database["public"]["Enums"]["payment_status"] | null
          transaction_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          id?: string
          metadata?: Json | null
          method?: Database["public"]["Enums"]["payment_method"]
          order_id?: string
          processed_by?: string | null
          restaurant_id?: string
          status?: Database["public"]["Enums"]["payment_status"] | null
          transaction_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_processed_by_fkey"
            columns: ["processed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          allergens: string[] | null
          available: boolean | null
          category_id: string | null
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          name: string
          prep_time: number | null
          price: number
          restaurant_id: string
          sort_order: number | null
          station: Database["public"]["Enums"]["station"] | null
          tags: string[] | null
          updated_at: string | null
        }
        Insert: {
          allergens?: string[] | null
          available?: boolean | null
          category_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          name: string
          prep_time?: number | null
          price: number
          restaurant_id: string
          sort_order?: number | null
          station?: Database["public"]["Enums"]["station"] | null
          tags?: string[] | null
          updated_at?: string | null
        }
        Update: {
          allergens?: string[] | null
          available?: boolean | null
          category_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          name?: string
          prep_time?: number | null
          price?: number
          restaurant_id?: string
          sort_order?: number | null
          station?: Database["public"]["Enums"]["station"] | null
          tags?: string[] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string
          full_name: string | null
          id: string
          last_login: string | null
          phone: string | null
          restaurant_id: string | null
          role: Database["public"]["Enums"]["app_role"] | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email: string
          full_name?: string | null
          id: string
          last_login?: string | null
          phone?: string | null
          restaurant_id?: string | null
          role?: Database["public"]["Enums"]["app_role"] | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string
          full_name?: string | null
          id?: string
          last_login?: string | null
          phone?: string | null
          restaurant_id?: string | null
          role?: Database["public"]["Enums"]["app_role"] | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      restaurants: {
        Row: {
          created_at: string | null
          custom_domain: string | null
          id: string
          logo_url: string | null
          name: string
          settings: Json | null
          slug: string
          subdomain: string | null
          subscription_plan:
            | Database["public"]["Enums"]["subscription_plan"]
            | null
          subscription_status:
            | Database["public"]["Enums"]["subscription_status"]
            | null
          trial_ends_at: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          custom_domain?: string | null
          id?: string
          logo_url?: string | null
          name: string
          settings?: Json | null
          slug: string
          subdomain?: string | null
          subscription_plan?:
            | Database["public"]["Enums"]["subscription_plan"]
            | null
          subscription_status?:
            | Database["public"]["Enums"]["subscription_status"]
            | null
          trial_ends_at?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          custom_domain?: string | null
          id?: string
          logo_url?: string | null
          name?: string
          settings?: Json | null
          slug?: string
          subdomain?: string | null
          subscription_plan?:
            | Database["public"]["Enums"]["subscription_plan"]
            | null
          subscription_status?:
            | Database["public"]["Enums"]["subscription_status"]
            | null
          trial_ends_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      sessions: {
        Row: {
          ended_at: string | null
          id: string
          restaurant_id: string
          started_at: string | null
          status: Database["public"]["Enums"]["session_status"] | null
          table_id: string
          total_amount: number | null
          total_orders: number | null
        }
        Insert: {
          ended_at?: string | null
          id?: string
          restaurant_id: string
          started_at?: string | null
          status?: Database["public"]["Enums"]["session_status"] | null
          table_id: string
          total_amount?: number | null
          total_orders?: number | null
        }
        Update: {
          ended_at?: string | null
          id?: string
          restaurant_id?: string
          started_at?: string | null
          status?: Database["public"]["Enums"]["session_status"] | null
          table_id?: string
          total_amount?: number | null
          total_orders?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "sessions_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sessions_table_id_fkey"
            columns: ["table_id"]
            isOneToOne: false
            referencedRelation: "tables"
            referencedColumns: ["id"]
          },
        ]
      }
      tables: {
        Row: {
          capacity: number | null
          created_at: string | null
          current_session_id: string | null
          id: string
          location: Database["public"]["Enums"]["table_location"] | null
          qr_code_url: string | null
          restaurant_id: string
          status: Database["public"]["Enums"]["table_status"] | null
          table_number: number
        }
        Insert: {
          capacity?: number | null
          created_at?: string | null
          current_session_id?: string | null
          id?: string
          location?: Database["public"]["Enums"]["table_location"] | null
          qr_code_url?: string | null
          restaurant_id: string
          status?: Database["public"]["Enums"]["table_status"] | null
          table_number: number
        }
        Update: {
          capacity?: number | null
          created_at?: string | null
          current_session_id?: string | null
          id?: string
          location?: Database["public"]["Enums"]["table_location"] | null
          qr_code_url?: string | null
          restaurant_id?: string
          status?: Database["public"]["Enums"]["table_status"] | null
          table_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "tables_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      app_role:
        | "super_admin"
        | "restaurant_owner"
        | "restaurant_admin"
        | "staff_kitchen"
        | "staff_bar"
        | "staff_cashier"
      event_type:
        | "menu_view"
        | "product_view"
        | "cart_add"
        | "order_placed"
        | "payment_completed"
      item_status: "pending" | "preparing" | "ready" | "delivered"
      order_status:
        | "pending"
        | "preparing"
        | "ready"
        | "delivered"
        | "paid"
        | "cancelled"
      payment_method: "cash" | "card" | "transfer" | "open_tab"
      payment_status: "pending" | "completed" | "failed"
      session_status: "active" | "closed" | "abandoned"
      station: "kitchen" | "bar"
      subscription_plan: "free" | "basic" | "pro" | "enterprise"
      subscription_status: "trial" | "active" | "suspended" | "cancelled"
      table_location: "interior" | "exterior" | "private" | "bar"
      table_status: "available" | "occupied" | "reserved" | "maintenance"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: [
        "super_admin",
        "restaurant_owner",
        "restaurant_admin",
        "staff_kitchen",
        "staff_bar",
        "staff_cashier",
      ],
      event_type: [
        "menu_view",
        "product_view",
        "cart_add",
        "order_placed",
        "payment_completed",
      ],
      item_status: ["pending", "preparing", "ready", "delivered"],
      order_status: [
        "pending",
        "preparing",
        "ready",
        "delivered",
        "paid",
        "cancelled",
      ],
      payment_method: ["cash", "card", "transfer", "open_tab"],
      payment_status: ["pending", "completed", "failed"],
      session_status: ["active", "closed", "abandoned"],
      station: ["kitchen", "bar"],
      subscription_plan: ["free", "basic", "pro", "enterprise"],
      subscription_status: ["trial", "active", "suspended", "cancelled"],
      table_location: ["interior", "exterior", "private", "bar"],
      table_status: ["available", "occupied", "reserved", "maintenance"],
    },
  },
} as const
