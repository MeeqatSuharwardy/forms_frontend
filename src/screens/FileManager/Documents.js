import React from "react";
import { Link } from "react-router-dom";
import I9 from "../../assets/files/i-9.pdf";
import FW4 from "../../assets/files/fw4.pdf";
import EH from "../../assets/files/HAP_Employee_Handbook_FINAL.pdf";

class FileDocumentsEmployee extends React.Component {
  state = {
    documents: [
      {
        name: "Anti-Harassment Agreement",
        path: `${process.env.PUBLIC_URL}/AntiHarassmentForm`,
      },
      {
        name: "Employee Information",
        path: `${process.env.PUBLIC_URL}/EmploymentForm`,
      },
      {
        name: "Cell Phone Agreement",
        path: `${process.env.PUBLIC_URL}/CellPhonePolicyForm`,
      },
      {
        name: "Credentialing Checklist",
        path: `${process.env.PUBLIC_URL}/CredentialingChecklist`,
      },
      {
        name: "Credentialing Application Form",
        path: `${process.env.PUBLIC_URL}/CredentialingApplicationForm`,
      },
      {
        name: "Direct Deposit",
        path: `${process.env.PUBLIC_URL}/DirectDepositForm`,
      },
      {
        name: "Emergency Contacts",
        path: `${process.env.PUBLIC_URL}/EmployeeEmergencyContacts`,
      },
      {
        name: "Employee Payroll",
        path: `${process.env.PUBLIC_URL}/EmployeePayrollForm`,
      },
      {
        name: "HIPPA Agreement",
        path: `${process.env.PUBLIC_URL}/EmployeeConfidentialityForm`,
      },
      {
        name: "Receipt of Company Property",
        path: `${process.env.PUBLIC_URL}/ReceiptOfCompanyProperty`,
      },
      {
        name: "2024 I-9 Form ",
        path: `${process.env.PUBLIC_URL}/I9PDF`,
      },

      {
        name: "2024 W-4 Form",
        path: `${process.env.PUBLIC_URL}/Fw4PDF`,
      },
      {
        name: "Employee Handbook",
        path: EH,
      },
    ],
  };

  render() {
    return (
      <div className="container-fluid">
        <br></br>
        <br></br>
        <h2>Employement Forms</h2>
        <br></br>
        <br></br>
        <div className="row clearfix">
          {this.state.documents.map((doc, i) => (
            <div key={i} className="col-lg-4 col-md-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{doc.name}</h5>
                  <Link to={doc.path} className="btn btn-primary">
                    View Form
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default FileDocuments;
