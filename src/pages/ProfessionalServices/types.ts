export type ProfessionalServiceCreateData = {
  professional: number;
  title: string;
  description: string;
};

export type ProfessionalServiceListData = {
  id: number;
  professional_name: string;
  professional: number;
  title: string;
  description: string;
  formatted_created_at: string;
};

export type ProfessionalServiceUpdateData = {
  professional: number;
  title: string;
  description: string;
};

export type ProfessionalServiceLoadData = {
  professional: number;
  professional_name: string;
  title: string;
  description: string;
  formatted_created_at: string;
};

export type Person = {
  id: number;
  name: string;
  formatted_born_date: string;
  avatar: string;
};
