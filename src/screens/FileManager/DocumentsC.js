import React from "react";
import { Link } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import EH from "../../assets/files/HAP_Employee_Handbook_FINAL.pdf";

class FileDocumentsCrdentials extends React.Component {
  state = {
    documents: [
      {
        name: "Employee Information",
        path: `${process.env.PUBLIC_URL}/EmploymentForm`,
      },
      {
        name: "Emergency Contacts",
        path: `${process.env.PUBLIC_URL}/EmployeeEmergencyContacts`,
      },
      {
        name: "Anti-Harassment Agreement",
        path: `${process.env.PUBLIC_URL}/AntiHarassmentForm`,
      },
      {
        name: "HIPAA Agreement",
        path: `${process.env.PUBLIC_URL}/EmployeeConfidentialityForm`,
      },
      {
        name: "Cell Phone Agreement",
        path: `${process.env.PUBLIC_URL}/CellPhonePolicyForm`,
      },
      {
        name: "Employee Payroll",
        path: `${process.env.PUBLIC_URL}/EmployeePayrollForm`,
      },

      {
        name: "2024 W-4 Form",
        path: `${process.env.PUBLIC_URL}/Fw4PDF`,
      },
      {
        name: "2024 I-9 Form ",
        path: `${process.env.PUBLIC_URL}/I9PDF`,
      },

      {
        name: "Direct Deposit",
        path: `${process.env.PUBLIC_URL}/DirectDepositForm`,
      },

      {
        name: "Employee Handbook",
        path: EH,
      },

      {
        name: "Receipt of Company Property",
        path: `${process.env.PUBLIC_URL}/ReceiptOfCompanyProperty`,
      },
      {
        name: "Credentialing Checklist",
        path: `${process.env.PUBLIC_URL}/CredentialingChecklist`,
      },
      {
        name: "Credentialing Application Form",
        path: `${process.env.PUBLIC_URL}/CredentialingApplicationForm`,
      },
    ],
  };

  render() {
    return (
      <div className="container-fluid">
        <br></br>
        <br></br>
        <h2>Credential Forms</h2>
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

export default FileDocumentsCrdentials;
