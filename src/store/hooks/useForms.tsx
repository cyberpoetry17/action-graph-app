import { useContext } from "react";
import { FormContext } from "..";

export const useForms = () => {
  const context = useContext(FormContext);
  if (!context)
    throw new Error("Error useForms hook must be used within a provider!");
  return context;
};
