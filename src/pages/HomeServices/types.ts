export type HomeServiceCreateData = {
  breakfast: boolean;
  lunch: boolean;
  shower: boolean;
  dinner: boolean;
  snack: boolean;
  sleep: boolean;
  person?: number;
};

export type HomeServiceListData = {
  id: number;
  breakfast: boolean;
  lunch: boolean;
  shower: boolean;
  dinner: boolean;
  snack: boolean;
  sleep: boolean;
  person: number;
  formatted_created_at: string;
  person_name: string;
};

export type HomeServiceUpdateData = {
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
