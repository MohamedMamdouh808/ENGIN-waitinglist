export interface WaitlistUser {
  id: string;
  referral_code: string;
  referred_by: string | null;
  referral_count: number;
  display_alias: string;
  created_at: string;
}

export interface WaitlistState extends WaitlistUser {
  queue_position: number;
  referral_link: string;
}

export interface LeaderboardEntry {
  display_alias: string;
  referral_count: number;
  rank: number;
}

export interface StatsPayload {
  total_signups: number;
}

export type SignupErrorCode =
  | "invalid_email"
  | "already_registered"
  | "invalid_referral_code"
  | "self_referral"
  | "server_error";

export interface SignupError {
  code: SignupErrorCode;
  message: string;
}
