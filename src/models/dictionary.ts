import { LanguageName } from "./language";

export interface DictionaryType {
    id: string;
    language: LanguageName;
    badEntry: string;
    rightEntry: string;
}
