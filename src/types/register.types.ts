export interface RegisterFields {
  fullName: string;
  email: string;
  password: string;
  mobile: string;
  address: string;
  businessName: string;
}

export type FieldErrors = Partial<Record<keyof RegisterFields, string>> & {
  global?: string;
};
