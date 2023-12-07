import { FC, useState, createContext } from 'react';
import { LanguageType } from 'src/models/language';
import { getAllLanguageService } from 'src/services/Language';
type LanguageContext = {
    languages: LanguageType[],
    load: () => void,
    add: (LanguageType) => void,
    remove: (string) => void,
    edit: (string, LanguageType) => void
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const LanguageContext = createContext<LanguageContext>(
  {} as LanguageContext
);

export const LanguageProvider: FC = ({ children }) => {
    const [languages, setLanguages] = useState<LanguageType[]>([]);

    const load = async () => {
        try {
            const responseData = await getAllLanguageService();
            if ( responseData ) {
                setLanguages(responseData);
            }
        } catch (error) {
        }
    }

    const add = async (language: LanguageType) => {
        setLanguages([
            ...languages,
            language
        ])
    }

    const remove = async ( id: string ) => {
        setLanguages(languages.filter(
            language => (language.id !== id)
        ))
    }

    const edit = async ( id: string, language: LanguageType ) => {
        setLanguages(languages.map(
            language => {
                if ( language.id === id ) return language;
                return 
            }
        ))
    }

  return (
    <LanguageContext.Provider
      value={{ languages, load, add, edit, remove }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
