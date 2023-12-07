export type LanguageName = "Italian" | "German" | "English" | "French" | "Holland";

export interface LanguageType {
  id: string;
  name: LanguageName;
  url: string;
  username: string;
  password: string;
}
