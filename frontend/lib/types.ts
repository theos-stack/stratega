export type CalendarRecord = {
  Day?: string;
  Topic?: string;
  Platform?: string;
  Description?: string;
  [key: string]: string | number | boolean | null | undefined;
};

export type GeneratePayload = {
  company_details: string;
  weekly_focus: string;
  file_name?: string;
};

export type GenerateResponse = {
  records: CalendarRecord[];
  file_name: string;
  download_url: string;
};

export type HealthResponse = {
  status: string;
};
