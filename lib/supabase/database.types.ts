export interface Database {
  public: {
    Tables: {
      waitlist_users: {
        Row: {
          id: string;
          email: string;
          email_normalized: string;
          referral_code: string;
          referred_by: string | null;
          referral_count: number;
          display_alias: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          referral_code: string;
          referred_by?: string | null;
          referral_count?: number;
          display_alias: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          referral_code?: string;
          referred_by?: string | null;
          referral_count?: number;
          display_alias?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      referral_events: {
        Row: {
          id: string;
          referrer_id: string;
          referred_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          referrer_id: string;
          referred_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          referrer_id?: string;
          referred_id?: string;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      waitlist_queue: {
        Row: {
          id: string;
          email_normalized: string;
          referral_code: string;
          referred_by: string | null;
          referral_count: number;
          display_alias: string;
          created_at: string;
          queue_position: number;
        };
        Relationships: [];
      };
      waitlist_leaderboard: {
        Row: {
          display_alias: string;
          referral_count: number;
          rank: number;
        };
        Relationships: [];
      };
    };
    Functions: {
      increment_referral_count: {
        Args: { referrer_id: string };
        Returns: undefined;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
