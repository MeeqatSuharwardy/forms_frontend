import React from "react";
import { Link } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import I9 from "../../assets/files/i-9.pdf";
import FW4 from "../../assets/files/fw4.pdf";
import EH from "../../assets/files/HAP_Employee_Handbook_FINAL.pdf";

class FileDocumentsEmployee extends React.Component {
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
