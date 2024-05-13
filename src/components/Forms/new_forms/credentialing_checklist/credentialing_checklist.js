import React from "react";
import "./CredentialingChecklist.css"; // Assuming you have an external CSS file for styles
import Header from "../../../header/header";

const CredentialingChecklist = () => {
  const documents = [
    "All board certification",
    "DEA",
    "FL Driver’s License/PP copy",
    "Licensure copies",
    "Medical Degree",
    "Updated CV",
    "Professional Picture",
    "SSN copy",
    "CAQH Login credentials",
    "CMS/PECOS Login credentials",
    "Professional malpractice insurance",
    "NPI number",
    "State-specific Authorization & Release",
    "Treatment Modalities",
  ];

  return (
    <>
      <br></br>
      <br></br>
      <Header />
      <div className="checklist-container">
        <h2 className="title">
          Credentialing Checklist (Information/Documents)
        </h2>
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Provider</th>
              <th>Documents</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td></td>
              <td>
                <ul>
                  {documents.map((doc, index) => (
                    <li key={index}>{doc}</li>
                  ))}
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CredentialingChecklist;
