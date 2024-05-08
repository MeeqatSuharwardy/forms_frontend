import React from "react";
import { connect } from "react-redux";
import PageHeader from "../../components/PageHeader";
import axios from "axios";

class FileDocuments extends React.Component {
  state = {
    documents: [
      {
        name: "Application for Employment",
        endpoint: `${process.env.REACT_APP_API_URL}/application_for_employment`,
        pdfEndpoint: `${process.env.REACT_APP_PDF_PATH}/Application_for_Employment.pdf`,
      },
      {
        name: "Emergency Contacts",
        endpoint: `${process.env.REACT_APP_API_URL}/emergency_contacts_final`,
        pdfEndpoint: `${process.env.REACT_APP_PDF_PATH}/Emergency_Contacts.pdf`,
      },
      {
        name: "Anti Harassment Discrimination",
        endpoint: `${process.env.REACT_APP_API_URL}/anti_harassment_discrimination_final`,
        pdfEndpoint: `${process.env.REACT_APP_PDF_PATH}/Anti_Harassment_Discrimination.pdf`,
      },
      {
        name: "Employment Payroll",
        endpoint: `${process.env.REACT_APP_API_URL}/submit_employment_payroll`,
        pdfEndpoint: `${process.env.REACT_APP_PDF_PATH}/Employment_Payroll.pdf`,
      },
      {
        name: "Receipt of Company Property",
        endpoint: `${process.env.REACT_APP_API_URL}/receipt_of_company_property`,
        pdfEndpoint: `${process.env.REACT_APP_PDF_PATH}/Receipt_of_Property.pdf`,
      },
      {
        name: "HIPPA Agreement",
        endpoint: `${process.env.REACT_APP_API_URL}/hippa_agreement`,
        pdfEndpoint: `${process.env.REACT_APP_PDF_PATH}/hippa_agreement.pdf`,
      },
      {
        name: "Cell Phone Policy",
        endpoint: `${process.env.REACT_APP_API_URL}/cell_phone_policy`,
        pdfEndpoint: `${process.env.REACT_APP_PDF_PATH}/cell_phone_policy.pdf`,
      },
      {
        name: "Employee’s Withholding Certificate",
        endpoint: `${process.env.REACT_APP_API_URL}/Employees_Withholding_Certificate`,
        pdfEndpoint: `${process.env.REACT_APP_PDF_PATH}/Employees_Withholding_Certificate.pdf`,
      },
      {
        name: "Direct Deposit Authorization",
        endpoint: `${process.env.REACT_APP_API_URL}/direct_deposit_authorization`,
        pdfEndpoint: `${process.env.REACT_APP_PDF_PATH}/direct_deposit_authorization.pdf`,
      },
      {
        name: "Employee Handbook",
        endpoint: `${process.env.REACT_APP_API_URL}/hap_employee_handbook`,
        pdfEndpoint: `${process.env.REACT_APP_PDF_PATH}/hap_employee_handbook.pdf`,
      },
      {
        name: "Receipt of Employee Handbook",
        endpoint: `${process.env.REACT_APP_API_URL}/receipt_of_employee_handbook`,
        pdfEndpoint: `${process.env.REACT_APP_PDF_PATH}/receipt_of_employee_handbook.pdf`,
      },
      {
        name: "I-9",
        endpoint: `${process.env.REACT_APP_API_URL}/i-9`,
        pdfEndpoint: `${process.env.REACT_APP_PDF_PATH}/i-9`,
      },
      {
        name: "UHC Employee Enrollment Form - Health & Psychiatry",
        endpoint: `${process.env.REACT_APP_API_URL}/Employee_Enrollment_form`,
        pdfEndpoint: `${process.env.REACT_APP_PDF_PATH}/Employee_Enrollment_form`,
      },

      {
        name: "Credentialing Checklist",
        endpoint: `${process.env.REACT_APP_API_URL}/credentialing_checklist`,
        pdfEndpoint: `${process.env.REACT_APP_PDF_PATH}/credentialing_checklist`,
      },
      {
        name: "Credentialing Checklist Comprehensive",
        endpoint: `${process.env.REACT_APP_API_URL}/credentialing_comprehensive_checklist`,
        pdfEndpoint: `${process.env.REACT_APP_PDF_PATH}/credentialing_comprehensive_checklist`,
      },
    ],
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  downloadPdf = async (endpoint) => {
    const response = await axios({
      url: endpoint,
      method: "GET",
      responseType: "blob",
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", endpoint.split("/").pop());
    document.body.appendChild(link);
    link.click();
  };

  render() {
    return (
      <div
        style={{ flex: 1 }}
        onClick={() => {
          document.body.classList.remove("offcanvas-active");
        }}
      >
        <PageHeader
          HeaderText="File Documents"
          Breadcrumb={[
            { name: "File Manager", navigate: "" },
            { name: "File Documents", navigate: "" },
          ]}
        />
        <div className="container-fluid">
          <div className="row clearfix">
            {this.state.documents.map((doc, i) => (
              <div key={i} className="col-lg-4 col-md-6">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{doc.name}</h5>
                    <a
                      href={doc.endpoint}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                    >
                      View Form
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ ioTReducer }) => ({
  isSecuritySystem: ioTReducer.isSecuritySystem,
});

export default connect(mapStateToProps, {})(FileDocuments);
