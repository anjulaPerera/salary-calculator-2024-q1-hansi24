import React, { createContext, useContext, useState } from "react";

// Define the shape of your form data
interface FormData {
  baseSalary: number;
  allowanceDetails: Allowance[];
  deductionDetails: Deduction[];
  grossEarnings: number;
  grossDeductions: number;
  totalAllowances: number;
  apit: number;
  netSalary: number;
  ctc: number;
  totalEarnings: number;
  totalEarningsForEpf: number;
  totalEarningsForEpfwithoutBasic: number;
  grossSalaryForEpf: number;
  employeeEpf: number;
  employerEpf: number;
  employerEtf: number;
  apitDetails: ApitDetails; // Updated to use ApitDetails type
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

// Define the shape of the APIT details object
interface ApitDetails {
  apitTaxPercentage: number;
  constantValue: number;
}

// Define the shape of the context
interface SalaryCalculatorContextType {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

// Create the context
const SalaryCalculatorContext = createContext<SalaryCalculatorContextType>({
  formData: {
    baseSalary: 0,
    allowanceDetails: [],
    deductionDetails: [],
    grossEarnings: 0,
    grossDeductions: 0,
    totalAllowances: 0,
    apit: 0,
    netSalary: 0,
    ctc: 0,
    totalEarnings: 0,
    totalEarningsForEpf: 0,
    totalEarningsForEpfwithoutBasic: 0,
    grossSalaryForEpf: 0,
    employeeEpf: 0,
    employerEpf: 0,
    employerEtf: 0,
    apitDetails: { apitTaxPercentage: 0, constantValue: 0 },
  },
  setFormData: () => {},
});

// Create a provider component
export const SalaryCalculatorProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [formData, setFormData] = useState<FormData>({
    baseSalary: 0,
    allowanceDetails: [],
    deductionDetails: [],
    grossEarnings: 0,
    grossDeductions: 0,
    totalAllowances: 0,
    apit: 0,
    netSalary: 0,
    ctc: 0,
    totalEarnings: 0,
    totalEarningsForEpf: 0,
    totalEarningsForEpfwithoutBasic: 0,
    grossSalaryForEpf: 0,
    employeeEpf: 0,
    employerEpf: 0,
    employerEtf: 0,
    apitDetails: { apitTaxPercentage: 0, constantValue: 0 },
  });

  return (
    <SalaryCalculatorContext.Provider value={{ formData, setFormData }}>
      {children}
    </SalaryCalculatorContext.Provider>
  );
};

// Custom hook to access the context
export const useSalaryCalculator = () => useContext(SalaryCalculatorContext);
