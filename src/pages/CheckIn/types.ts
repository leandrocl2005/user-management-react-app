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
  social_vacancy: boolean;
  observation: string;
  companion: number;
};

export type CheckinListData = {
  id: number;
  person: number;
  person_name: string;
  reason: string;
  companion_name?: string;
  companion?: number;
  formatted_created_at: string;
  active: boolean;
};

export type CheckinUpdatePatientData = {
  id: number;
  person: number;
  person_name: string;
  companion: number;
  companion_name: number;
  reason: 'patient';
  chemotherapy: boolean;
  radiotherapy: boolean;
  surgery: boolean;
  exams: boolean;
  appointment: boolean;
  other: boolean;
  ca_number: string;
  social_vacancy: boolean;
  observation: string;
  active: boolean;
};

export type CheckinUpdateNoPatientData = {
  id?: number;
  person: number;
  person_name: string;
  reason: string;
  active: boolean;
};

export type Person = {
  id: number;
  name: string;
  formatted_born_date: string;
  avatar: string;
};
