import React, { createContext, useContext, useState } from 'react';

type InstitutionData = {
  retirement_or_center: string;
  latitude: number;
  longitude: number;
  name: string;
  about: string;
  phone: string;
  images: string[];
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
};

type InstitutionContextTypes = {
  institution: InstitutionData;
  setInstitution: React.Dispatch<React.SetStateAction<InstitutionData>>;
};

const InstitutionContext = createContext({} as InstitutionContextTypes);

const InstitutionProvider: React.FC = ({ children }) => {
  const [institution, setInstitution] = useState<InstitutionData>(
    {} as InstitutionData,
  );

  return (
    <InstitutionContext.Provider value={{ institution, setInstitution }}>
      {children}
    </InstitutionContext.Provider>
  );
};

function useInstitutionContext(): InstitutionContextTypes {
  const context = useContext(InstitutionContext);
  if (!context) {
    throw new Error('Context must be within an InstitutionProvider');
  }
  return context;
}

export { InstitutionProvider, useInstitutionContext };
