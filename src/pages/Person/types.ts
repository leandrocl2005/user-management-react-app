export type PersonListData = {
  id: number;
  name: string;
  formatted_born_date: string;
};

export type PersonCreateData = {
  name: string;
  mother_name?: string;
  born_date?: string;
  death_date?: string;
  email?: string;
  gender?: string;
  cpf?: string;
  rg?: string;
  rg_ssp?: string;
  state?: string;
  address_line_1?: string;
  address_line_2?: string;
  neighbourhood?: string;
  city?: string;
  postal_code?: string;
  residence_type?: string;
  ddd_private_phone?: string;
  private_phone?: string;
  ddd_message_phone?: string;
  message_phone?: string;
  observation?: string;
};

export type PersonUpdateData = {
  id?: number;
  name: string;
  mother_name?: string;
  born_date?: string;
  death_date?: string;
  email?: string;
  gender?: string;
  cpf?: string;
  rg?: string;
  rg_ssp?: string;
  state?: string;
  address_line_1?: string;
  address_line_2?: string;
  neighbourhood?: string;
  city?: string;
  postal_code?: string;
  residence_type?: string;
  ddd_private_phone?: string;
  private_phone?: string;
  ddd_message_phone?: string;
  message_phone?: string;
  observation?: string;
};
