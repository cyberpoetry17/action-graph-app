import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { MappedNodeForm } from "../types/form";

interface FormContextType {
  enrichedForms?: MappedNodeForm[];
  setEnrichedForms: Dispatch<SetStateAction<MappedNodeForm[] | undefined>>;

  selectedFormId?: string;
  setSelectedFormId: Dispatch<SetStateAction<string | undefined>>;
}

export const FormContext = createContext<FormContextType | undefined>(
  undefined
);

export const FormProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [enrichedForms, setEnrichedForms] = useState<MappedNodeForm[]>();
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
