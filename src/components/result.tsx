import React from "react";
import { useSalaryCalculator } from "../context/salaryCalContext";

const Result: React.FC = () => {
  const { formData } = useSalaryCalculator();

  console.log("from context", formData);

  return (
    <div className="answers p-3 d-flex justify-content-center align-items-center flex-column w-100">
      <div className="your-salary-topic d-flex w-100 justify-content-start align-items-center">
        <p className="topic-text">Your salary</p>
      </div>
      <div className="items-container d-flex w-100 justify-content-between align-items-center">
        <table className="items-table">
          <thead>
            <tr>
              <td className="table-head-text">Items</td>
              <td className="text-align-right table-head-text">Amount</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Basic Salary</td>
              <td className="text-align-right">
                {formData.baseSalary ? formData.baseSalary : <span>-</span>}
              </td>
            </tr>
            <tr>
              <td>Gross Earning</td>
              <td className="text-align-right">
                {formData.grossEarnings ? (
                  formData.grossEarnings
                ) : (
                  <span>-</span>
                )}
              </td>
            </tr>
            <tr>
              <td>Gross Deduction</td>
              <td className="text-align-right">
                {formData.grossDeductions ? (
                  formData.grossDeductions
                ) : (
                  <span>-</span>
                )}
              </td>
            </tr>
            <tr>
              <td>Employee EPF (8%)</td>
              <td className="text-align-right">
                {formData.employeeEpf ? formData.employeeEpf : <span>-</span>}
              </td>
            </tr>
            <tr>
              <td>APIT</td>
              <td className="text-align-right">
                {formData.apit ? formData.apit : <span>-</span>}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="net-salary mt-3 w-100 mt-2 d-flex justify-content-center align-items-center">
        <div className="net-sal-texts d-flex justify-content-between align-items-center ">
          <p className="p-0 m-0 net-sal-text">Net Salary (Take Home)</p>
          <p className="p-0 m-0 net-sal-text">
            {formData.netSalary ? formData.netSalary : <span>-</span>}
          </p>
        </div>
      </div>
      <div className="contibution-container d-flex w-100 justify-content-between align-items-center">
        <table className="contribution-table">
          <thead>
            <tr>
              <td className="table-head-text">
                Contribution from tde Employer
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Employer EPF (12%)</td>
              <td className="text-align-right">
                {formData.employerEpf ? formData.employerEpf : <span>-</span>}
              </td>
            </tr>
            <tr>
              <td>Employer ETF (3%)</td>
              <td className="text-align-right">
                {formData.employerEtf ? formData.employerEtf : <span>-</span>}
              </td>
            </tr>
            <tr>
              <td>CTC (Cost to Company)</td>
              <td className="text-align-right">
                {formData.ctc ? formData.ctc : <span>-</span>}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Result;
