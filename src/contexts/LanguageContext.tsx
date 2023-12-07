import { FC, useState, createContext } from 'react';
import { LanguageType } from 'src/models/language';
import { getAllLanguageService } from 'src/services/Language';
type LanguageContext = {
    languages: LanguageType[],
    load: () => void,
    add: (LanguageType) => void,
    delete: (string) => void,
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

  return (
    <LanguageContext.Provider
      value={{ isLoading, loadingMessage, startLoading, stopLoading }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
