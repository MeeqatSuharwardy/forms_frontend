import React from "react";
import { Link } from "react-router-dom";
import PageHeader from "../../components/PageHeader";

class FileDocumentsCrdentials extends React.Component {
  state = {
    documents: [
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
