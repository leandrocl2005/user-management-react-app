export type CheckinCreateNoPatientData = {
  person: number;
  reason: string;
};

export type CheckinCreatePatientData = {
  person: number;
  reason: 'patient';
  chemotherapy: boolean;
  radiotherapy: boolean;
  surgery: boolean;
  exams: boolean;
  appointment: boolean;
  other: boolean;
  ca_number: string;
  social_vacancy: string;
  observation: string;
};

export type CheckinListData = {
  id: number;
  person_name: string;
  companion_name?: string;
  formatted_created_at: string;
  active: boolean;
};

export type CheckinUpdateData = {
  breakfast: boolean;
  lunch: boolean;
  shower: boolean;
  dinner: boolean;
  snack: boolean;
  sleep: boolean;
  person: number;
};

export type Person = {
  id: number;
  name: string;
  formatted_born_date: string;
  avatar: string;
};
