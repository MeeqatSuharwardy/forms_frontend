import React, { useState } from "react";
import "./CredentialingApplicationForm.css"; // Make sure the CSS file exists and is correctly linked

function CredentialingApplicationForm() {
  const [formData, setFormData] = useState({
    caqhId: "",
    caqhLogin: "",
    caqhPassword: "",
    npireg: "",
    npiNumber: "",
    npiPassword: "",
    fullName: "",
    ssn: "",
    phoneNumber: "",
    dob: "",
    pob: "",
    homeAddress: "",
    email: "",
    specialty: "",
    taxonomy: "",
    flLicenseNumber: "",
    documentType: "",
    fileUpload: null,
    reasonIfNoDocument: "",
    // You might need to add a field for populations and modalities if those are also being submitted
  });

  const handleChange = (event) => {
    const { name, value, type, files } = event.target;
    if (type === "file") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: files[0],
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formDataToSend = new FormData();
    for (const key in formData) {
      if (formData[key] !== null && key !== "fileUpload") {
        formDataToSend.append(key, formData[key]);
      }
    }
    if (formData.fileUpload) {
      formDataToSend.append("fileUpload", formData.fileUpload);
    }

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/submit_credential_application/",
        {
          method: "POST",
          body: formDataToSend,
        }
      );
      const result = await response.json();
      console.log(result);
      if (response.ok) {
        alert("Application submitted successfully!");
      } else {
        alert("Failed to submit application: " + result.message);
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("Error submitting application. Check console for more details.");
    }
  };

  return (
    <div className="container">
      <h2>Credentialing Application</h2>
      <form onSubmit={handleSubmit}>
        <div className="section">
          <h3>Portal Logins</h3>
          <label htmlFor="caqhId">
            CAQH ID (to set up go to: CAQHproview.org) #:
          </label>
          <input
            type="text"
            id="caqhId"
            name="caqhId"
            value={formData.caqhId}
            onChange={handleChange}
          />
          <label htmlFor="caqhLogin">
            CAQH Login (to set up go to: CAQHproview.org) #:
          </label>
          <input
            type="text"
            id="caqhLogin"
            name="caqhLogin"
            value={formData.caqhLogin}
            onChange={handleChange}
          />
          <label htmlFor="caqhPassword">
            CAQH Password (to set up go to: CAQHproview.org) #:
          </label>
          <input
            type="text"
            id="caqhPassword"
            name="caqhPassword"
            value={formData.caqhPassword}
            onChange={handleChange}
          />
          <label htmlFor="caqhPassword">NPI Rgistration Login #:</label>
          <input
            type="text"
            id="npireg"
            name="npireg"
            value={formData.npireg}
            onChange={handleChange}
          />
          <label htmlFor="caqhPassword">NPI Rgistration Password #:</label>
          <input
            type="text"
            id="npiPassword"
            name="npiPassword"
            value={formData.npiPassword}
            onChange={handleChange}
          />

          <h3>Provider Basic Information</h3>
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
          <label htmlFor="ssn">NPI Number:</label>
          <input
            type="text"
            id="npiNumber"
            name="npiNumber"
            value={formData.npiNumber}
            onChange={handleChange}
          />
          <label htmlFor="ssn">Social Security Number:</label>
          <input
            type="text"
            id="ssn"
            name="ssn"
            value={formData.ssn}
            onChange={handleChange}
          />
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          <label htmlFor="dob">Date of Birth:</label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
          />
          <label htmlFor="pob">Place of Birth:</label>
          <input
            type="text"
            id="pob"
            name="pob"
            value={formData.pob}
            onChange={handleChange}
          />
          <label htmlFor="homeAddress">Home Address:</label>
          <input
            type="text"
            id="homeAddress"
            name="homeAddress"
            value={formData.homeAddress}
            onChange={handleChange}
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <label htmlFor="specialty">Specialty:</label>
          <input
            type="text"
            id="specialty"
            name="specialty"
            value={formData.specialty}
            onChange={handleChange}
          />
          <label htmlFor="taxonomy">Taxonomy:</label>
          <input
            type="text"
            id="taxonomy"
            name="taxonomy"
            value={formData.taxonomy}
            onChange={handleChange}
          />
          <label htmlFor="flLicenseNumber">FL License Number:</label>
          <input
            type="text"
            id="flLicenseNumber"
            name="flLicenseNumber"
            value={formData.flLicenseNumber}
            onChange={handleChange}
          />

          <h3>Document Uploads</h3>
          <label htmlFor="documentType">Select Document Type:</label>
          <select
            id="documentType"
            name="documentType"
            value={formData.documentType}
            onChange={handleChange}
          >
            <option value="FL_License_Copy">FL License Copy</option>
            <option value="Board_certificate_Copy">
              Board Certificate Copy
            </option>
            <option value="FL_state_DEA">FL State DEA</option>
            <option value="FL_Driving_License">FL Driving License</option>
            <option value="Medical_Degree_Diploma">
              Medical Degree/ Diploma
            </option>
            <option value="Updated_CV">Updated CV</option>
            <option value="Professional_Picture">Professional Picture</option>
            <option value="SSN_Copy">SSN Copy</option>
            <option value="Professional_Malpractice_Insurance_certificate">
              Professional Malpractice Insurance Certificate
            </option>
            <option value="ECFMG">ECFMG (if applicable)</option>
            {/* Add more options here */}
          </select>
          <label htmlFor="fileUpload">Upload Document:</label>
          <input
            type="file"
            id="fileUpload"
            name="fileUpload"
            onChange={handleChange}
          />

          <button type="submit">Submit Application</button>
        </div>
      </form>
    </div>
  );
}

export default CredentialingApplicationForm;
