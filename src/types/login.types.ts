export interface LoginFields {
  email: string;
  password: string;
  role: string;
}

export type FieldErrors = Partial<Record<keyof LoginFields, string>> & {
  global?: string;
};
