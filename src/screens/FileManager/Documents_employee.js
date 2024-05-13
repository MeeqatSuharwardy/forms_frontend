import React from "react";
import { Link } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import I9 from "../../assets/files/i-9.pdf";
import FW4 from "../../assets/files/fw4.pdf";
class FileDocumentsEmployee extends React.Component {
  state = {
    documents: [
      {
        name: "Anti Harassment",
        path: `${process.env.PUBLIC_URL}/AntiHarassmentForm`,
      },
      {
        name: "Application for Employment",
        path: `${process.env.PUBLIC_URL}/EmploymentForm`,
      },
      {
        name: "Cell Phone Policy",
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
        name: "Direct Deposit Authorization",
        path: `${process.env.PUBLIC_URL}/DirectDepositForm`,
      },
      {
        name: "Employee Emergency Contacts",
        path: `${process.env.PUBLIC_URL}/EmployeeEmergencyContacts`,
      },
      {
        name: "Employee Payroll Information",
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
        name: "I-9 Form",
        path: `${process.env.PUBLIC_URL}/I9PDF`,
      },

      {
        name: "W4 Form",
        path: `${process.env.PUBLIC_URL}/Fw4PDF`,
      },
    ],
  };
  renderLink(doc) {
    if (doc.path === I9 || doc.path === FW4) {
      // If the path is a direct file like a PDF
      return (
        <a
          href={doc.path}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
        >
          View Form
        </a>
      );
    } else {
      // For internal app navigation
      return (
        <Link to={doc.path} className="btn btn-primary">
          View Form
        </Link>
      );
    }
  }
  render() {
    return (
      <div className="container-fluid">
        <br></br>
        <h2>Employment Forms</h2>
        <br></br>
        <div className="row clearfix">
          {this.state.documents.map((doc, index) => (
            <div key={index} className="col-lg-4 col-md-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{doc.name}</h5>
                  {this.renderLink(doc)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default FileDocumentsEmployee;
