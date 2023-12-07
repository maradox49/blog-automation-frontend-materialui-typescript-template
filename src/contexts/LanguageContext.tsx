import { FC, useState, createContext } from 'react';
import { LanguageType } from 'src/models/language';
import { getAllLanguageService } from 'src/services/Language';
type LanguageContext = {
    languages: LanguageType[],
    loadLanguage: () => void,
    addLanguage: (LanguageType) => void,
    removeLanguage: (string) => void,
    editLanguage: (string, LanguageType) => void
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const LanguageContext = createContext<LanguageContext>(
  {} as LanguageContext
);

export const LanguageProvider: FC = ({ children }) => {
    const [languages, setLanguages] = useState<LanguageType[]>([]);

    const loadLanguage = async () => {
        try {
            const responseData = await getAllLanguageService();
            if ( responseData ) {
                setLanguages(responseData);
            }
        } catch (error) {
        }
    }

    const addLanguage = async (language: LanguageType) => {
        setLanguages([
            ...languages,
            language
        ])
    }

    const removeLanguage = async ( id: string ) => {
        setLanguages(languages.filter(
            language => (language.id !== id)
        ))
    }

    const editLanguage = async ( id: string, _language: LanguageType ) => {
        setLanguages(languages.map(
            language => {
                if ( language.id === id ) return _language;
                return language;
            }
        ))
    }

  return (
    <LanguageContext.Provider
      value={{ languages, loadLanguage, addLanguage, editLanguage, removeLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
