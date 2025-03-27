export type Event = {
  id: string;
  code: string;
  source: string;
  user_id: string;
  owner_id: string;
  fund_usi: string;
  author_type: string;
  author_id: string;
  trigger_time: string;
  data: string;
  delivery_status: string;
  delivered_at?: string;
  accepted: boolean;
  accepted_from?: string;
  created_at: string;
  updated_at: string;
};

export type OffboardingEventData = {
  termination_date: string;
  member_number: string;
  fund_name: string;
  owner_name: string;
};
