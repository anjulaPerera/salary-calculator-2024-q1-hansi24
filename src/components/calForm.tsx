import React, { useState } from "react";
import reset from "../assets/images/reset.svg";
import deleteBtn from "../assets/images/delete-btn.svg";
import { ToastContainer, toast } from "react-toastify";
import { useSalaryCalculator } from "../context/salaryCalContext";

const CalForm: React.FC = () => {
  const [allowances, setAllowances] = useState(1);
  const [deductions, setDeductions] = useState(1);
  const [basicSalary, setBasicSalary] = useState("");
  const [allowanceDetails, setAllowanceDetails] = useState([
    { title: "", amount: "", epf: false },
  ]);
  const [deductionDetails, setDeductionDetails] = useState([
    { details: "", amount: "" },
  ]);
  const { formData, setFormData } = useSalaryCalculator();
  const [success, setSuccess] = useState(false);

  const handleAddNewAllowance = () => {
    setAllowances(allowances + 1);
    setAllowanceDetails([
      ...allowanceDetails,
      { title: "", amount: "", epf: false },
    ]);
  };
  const handleDeleteNewAllowance = (index: number) => {
    // if (allowances !== 1) setAllowances(allowances - 1);
    if (allowances > 1) {
      setAllowances(allowances - 1);
      const newAllowanceDetails = allowanceDetails.filter(
        (_, i) => i !== index
      );
      setAllowanceDetails(newAllowanceDetails);
    }
  };
  const handleAllowanceChange = (index: number, field: any, value: any) => {
    const newAllowanceDetails = allowanceDetails.map((allowance, i) => {
      if (i === index) {
        return { ...allowance, [field]: value };
      }
      return allowance;
    });
    setAllowanceDetails(newAllowanceDetails);
  };
  const handleAddNewDeduction = () => {
    setDeductions(deductions + 1);
    setDeductionDetails([...deductionDetails, { details: "", amount: "" }]);
  };
  const handleDeleteNewDeduction = (index: number) => {
    // if (deductions !== 1) setDeductions(deductions - 1);
    if (deductions > 1) {
      setDeductions(deductions - 1);
      const newDeductionDetails = deductionDetails.filter(
        (_, i) => i !== index
      );
      setDeductionDetails(newDeductionDetails);
    }
  };

  const handleDeductionChange = (index: number, field: any, value: any) => {
    const newDeductionDetails = deductionDetails.map((deduction, i) => {
      if (i === index) {
        return { ...deduction, [field]: value };
      }
      return deduction;
    });
    setDeductionDetails(newDeductionDetails);
  };

  const handleReset = () => {
    setBasicSalary("");
    setAllowances(1);
    setDeductions(1);
    setAllowanceDetails([{ title: "", amount: "", epf: false }]);
    setDeductionDetails([{ details: "", amount: "" }]);
  };
  const handleSubmit = () => {
    let totalAllowances: number = 0;
    let totalEarningsForEpfwithoutBasic: number = 0;
    let totalEarningsForEpf: number = 0;
    for (let i = 0; i < allowanceDetails.length; i++) {
      totalAllowances = totalAllowances + parseInt(allowanceDetails[i].amount);
      if (allowanceDetails[i].epf) {
        console.log("allowanceDetails[i].epf", allowanceDetails[i].epf);
        totalEarningsForEpfwithoutBasic =
          totalEarningsForEpfwithoutBasic +
          parseInt(allowanceDetails[i].amount);
      }
    }
    console.log("totalAllowances", totalAllowances);
    let grossDeductions: number = 0;

    let grossSalaryForEpf: number = 0;
    for (let i = 0; i < deductionDetails.length; i++) {
      grossDeductions = grossDeductions + parseInt(deductionDetails[i].amount);
    }

    totalEarningsForEpf =
      totalEarningsForEpfwithoutBasic + parseInt(basicSalary);
    console.log("grossDeductions", grossDeductions);
    grossSalaryForEpf = totalEarningsForEpf - grossDeductions;

    let employeeEpf: number = grossSalaryForEpf * 0.08;
    let employerEpf: number = grossSalaryForEpf * 0.12;
    let employerEtf: number = grossSalaryForEpf * 0.03;

    let totalEarnings: number = parseInt(basicSalary) + totalAllowances;

    let grossEarnings: number = totalEarnings - grossDeductions;

    function calculateAPITTax(totalEarnings: number) {
      let apitTaxPercentage = 0;
      let constantValue = 0;
      let apitDetails = {
        apitTaxPercentage: 0,
        constantValue: 0,
      };

      if (totalEarnings <= 100000) {
        apitTaxPercentage = 0;
        constantValue = 0;
      } else if (totalEarnings <= 141667) {
        apitTaxPercentage = 6 / 100;
        constantValue = 6000;
      } else if (totalEarnings <= 183333) {
        apitTaxPercentage = 12 / 100;
        constantValue = 14500;
      } else if (totalEarnings <= 225000) {
        apitTaxPercentage = 18 / 100;
        constantValue = 25500;
      } else if (totalEarnings <= 266667) {
        apitTaxPercentage = 24 / 100;
        constantValue = 39000;
      } else if (totalEarnings <= 308333) {
        apitTaxPercentage = 30 / 100;
        constantValue = 55000;
      } else {
        apitTaxPercentage = 36 / 100;
        constantValue = 73500;
      }

      apitDetails.apitTaxPercentage = apitTaxPercentage;
      apitDetails.constantValue = constantValue;

      return apitDetails;
    }
    const apitDetails = calculateAPITTax(totalEarnings);
    const apitPre: number = grossEarnings * apitDetails.apitTaxPercentage;
    console.log("apitPre", apitPre);
    const apit: number = apitPre - apitDetails.constantValue;

    const netSalary = grossEarnings - employeeEpf - apit;
    const ctc = grossEarnings + employerEpf + employerEtf;

    const baseSalary = parseInt(basicSalary);

    const data = {
      baseSalary,
      allowanceDetails,
      deductionDetails,
      grossEarnings,
      grossDeductions,
      totalAllowances,
      apit,
      netSalary,
      ctc,
      totalEarnings,
      totalEarningsForEpf,
      totalEarningsForEpfwithoutBasic,
      grossSalaryForEpf,
      employeeEpf,
      employerEpf,
      employerEtf,
      apitDetails,
    };
    setFormData(data);
    setSuccess(!success);
    console.log("submitted data", data);
  };

  return (
    <div className="cal d-flex justify-content-center align-items-center p-3">
      <div className="topic-n-reset d-flex w-100 justify-content-between align-items-center">
        <p className="topic-text">Calculate Your Salary</p>
        <button className="reset-btn" onClick={handleReset}>
          <div className="d-flex justify-content-center align-items-center ">
            {" "}
            <img src={reset} alt="" className="reset-ic" />
            <p className="reset-p">Reset</p>
          </div>
        </button>
      </div>
      <div className="basic-salary d-flex w-100 justify-content-cengter align-items-center">
        <div className="w-100 h-auto d-flex flex-column align-items-start">
          <label className="tolabelic-text" htmlFor="basic-salary-input">
            Basic Salary
          </label>
          <input
            className="basic-sal-ip"
            type="text"
            id="basic-salary-input"
            value={basicSalary}
            onChange={(e) => setBasicSalary(e.target.value)}
          />{" "}
        </div>
      </div>
      <div className="earnings d-flex w-100 justify-content-between align-items-center mt-3">
        <div className="d-flex flex-column w-100">
          <div className="d-flex flex-column align-items-start">
            <p className="topic-text-earnings">Earnings</p>
            <p className="sub-text-earnings">
              Allowance, Fixed Allowance, Bonus and etc.
            </p>
          </div>
          {allowanceDetails.map((_, index) => (
            <div
              key={index}
              className="mb-3 allowances-container w-100 h-auto d-flex justify-content-start align-items-center"
            >
              <input
                className="earnings-ip1"
                type="text"
                placeholder="Pay Details (Title)"
                value={allowanceDetails[index]?.title || ""}
                onChange={(e) =>
                  handleAllowanceChange(index, "title", e.target.value)
                }
              />
              <input
                className="earnings-ip2"
                type="text"
                placeholder="Amount"
                value={allowanceDetails[index]?.amount || ""}
                onChange={(e) =>
                  handleAllowanceChange(index, "amount", e.target.value)
                }
              />

              <button
                className="delete-btn"
                onClick={() => handleDeleteNewAllowance(index)}
              >
                <img src={deleteBtn} alt="" />
              </button>
              <div className="d-flex justify-content-center align-items-center">
                <input
                  className="form-check-input epf-cb"
                  type="checkbox"
                  checked={allowanceDetails[index]?.epf || false}
                  onChange={(e) =>
                    handleAllowanceChange(index, "epf", e.target.checked)
                  }
                />

                <span className="ml-3">EPF/ETF</span>
              </div>
            </div>
          ))}
          <div
            className="add-new-allowance d-flex justify-content-start align-items-center"
            onClick={handleAddNewAllowance}
          >
            <p className="plus-ic">+</p>
            <p className="add-n-a">Add New Allowance</p>
          </div>
          <div className="horizontal-line"></div>
        </div>
      </div>
      <div className="deductions d-flex w-100 justify-content-between align-items-center">
        <div className="d-flex flex-column w-100">
          <div className="d-flex flex-column align-items-start">
            <p className="topic-text-earnings">Deductions</p>
            <p className="sub-text-earnings">
              Salary Advances, Loan Deductions and all
            </p>
          </div>
          {deductionDetails.map((_, index) => (
            <div
              key={index}
              className="mb-3 allowances-container w-100 h-auto d-flex justify-content-start align-items-center"
            >
              <input
                className="earnings-ip1"
                type="text"
                placeholder="Deduction Details"
                value={deductionDetails[index]?.details || ""}
                onChange={(e) =>
                  handleDeductionChange(index, "details", e.target.value)
                }
              />
              <input
                className="earnings-ip2"
                type="text"
                placeholder="Amount"
                value={deductionDetails[index]?.amount || ""}
                onChange={(e) =>
                  handleDeductionChange(index, "amount", e.target.value)
                }
              />
              <button
                className="delete-btn"
                onClick={() => handleDeleteNewDeduction(index)}
              >
                <img src={deleteBtn} alt="" />
              </button>
            </div>
          ))}
          <div
            className="add-new-allowance d-flex justify-content-start align-items-center"
            onClick={handleAddNewDeduction}
          >
            <p className="plus-ic ded">+</p>
            <p className="add-n-a ded">Add New Deduction</p>
          </div>
          {success ? (
            <p className="success-msg">Data submitted successfully</p>
          ) : null}
          <button
            className="btn btn-sm btn-primary w-50"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalForm;
