import React, { createContext, useContext, useState } from "react";

// Define the shape of your form data
interface FormData {
  basicSalary: string;
  allowanceDetails: Allowance[];
  deductionDetails: Deduction[];
}

// Define the shape of allowance and deduction details
interface Allowance {
  title: string;
  amount: string;
  epf: boolean;
}

interface Deduction {
  details: string;
  amount: string;
}

// Define the shape of the context
interface SalaryCalculatorContextType {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

// Create the context
const SalaryCalculatorContext = createContext<SalaryCalculatorContextType>({
  formData: {
    basicSalary: "",
    allowanceDetails: [],
    deductionDetails: [],
  },
  setFormData: () => {},
});

// Create a provider component
export const SalaryCalculatorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<FormData>({
    basicSalary: "",
    allowanceDetails: [],
    deductionDetails: [],
  });

  return (
    <SalaryCalculatorContext.Provider value={{ formData, setFormData }}>
      {children}
    </SalaryCalculatorContext.Provider>
  );
};

// Custom hook to access the context
export const useSalaryCalculator = () => useContext(SalaryCalculatorContext);
