import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { EnrichedForm } from "../types/form";

interface FormContextType {
  enrichedForms?: EnrichedForm[];
  setEnrichedForms: Dispatch<SetStateAction<EnrichedForm[] | undefined>>;

  selectedFormId?: string;
  setSelectedFormId: Dispatch<SetStateAction<string | undefined>>;
}

export const FormContext = createContext<FormContextType | undefined>(
  undefined
);

export const FormProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [enrichedForms, setEnrichedForms] = useState<EnrichedForm[]>();
  const [selectedFormId, setSelectedFormId] = useState<string>();

  return (
    <FormContext.Provider
      value={{
        enrichedForms,
        setEnrichedForms,
        selectedFormId,
        setSelectedFormId,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
