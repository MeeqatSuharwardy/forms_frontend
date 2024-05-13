import React, { useState, useRef } from "react";
import "./employee_payroll_information.css"; // Ensure you have your CSS styles defined appropriately

function EmployeePayrollForm() {
  const [formData, setFormData] = useState({
    employeeName: "",
    dateOfHire: "",
    originalPosition: "",
    changePositionDate: "",
    payType: "",
    payFrequency: "",
    hirePayRate: "",
    effectiveDate: "",
    approvalDate: "",
    dateSigned: "",
    signature: "",
  });

  const signatureCanvas = useRef(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const startDrawing = (event) => {
    const canvas = signatureCanvas.current;
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
    canvas.isDrawing = true;
  };

  const draw = (event) => {
    if (!signatureCanvas.current.isDrawing) return;
    const ctx = signatureCanvas.current.getContext("2d");
    ctx.lineTo(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
    ctx.stroke();
  };

  const finishDrawing = () => {
    const canvas = signatureCanvas.current;
    const ctx = canvas.getContext("2d");
    ctx.closePath();
    canvas.isDrawing = false;
    const dataURL = canvas.toDataURL("image/png");
    setFormData((prev) => ({ ...prev, signature: dataURL }));
  };

  const clearSignature = () => {
    const ctx = signatureCanvas.current.getContext("2d");
    ctx.clearRect(
      0,
      0,
      signatureCanvas.current.width,
      signatureCanvas.current.height
    );
    setFormData((prev) => ({ ...prev, signature: "" }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Prepare the form data, including the signature image
    const formDataWithSignature = {
      ...formData,
      dateSigned: formData.dateSigned || new Date().toISOString().split("T")[0], // Ensure date is set
      signature: formData.signature, // Ensure this contains the base64 image data from the canvas
    };

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/submit_employee_payroll/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formDataWithSignature),
        }
      );

      const result = await response.json();
      if (response.ok) {
        alert("Form submitted successfully!");
        console.log(result);
        // Optionally, reset the form here or handle navigation/redirect
        setFormData({
          employeeName: "",
          dateOfHire: "",
          originalPosition: "",
          changePositionDate: "",
          payType: "",
          payFrequency: "",
          hirePayRate: "",
          effectiveDate: "",
          approvalDate: "",
          dateSigned: "",
          signature: "",
        });
      } else {
        throw new Error(
          result.message || "An unknown error occurred during form submission."
        );
      }
    } catch (error) {
      alert(`Failed to submit form: ${error.message}`);
      console.error("Error submitting form: ", error);
    }
  };

  return (
    <div className="container">
      <h1 className="text-center mb-4">Employee Payroll Information Form</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Employee Name:</label>
          <input
            type="text"
            name="employeeName"
            value={formData.employeeName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Date of Hire:</label>
          <input
            type="date"
            name="dateOfHire"
            value={formData.dateOfHire}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Original Position:</label>
          <input
            type="text"
            name="originalPosition"
            value={formData.originalPosition}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Change of Position/Date Effective:</label>
          <input
            type="date"
            name="changePositionDate"
            value={formData.changePositionDate}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Pay Type:</label>
          <select
            name="payType"
            value={formData.payType}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Type</option>
            <option value="Hourly">Hourly</option>
            <option value="Salaried">Salaried</option>
            <option value="Commission">Commission</option>
          </select>
        </div>
        <div className="form-group">
          <label>Pay Frequency:</label>
          <select
            name="payFrequency"
            value={formData.payFrequency}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Frequency</option>
            <option value="Weekly">Weekly</option>
            <option value="Bi-weekly">Bi-weekly</option>
            <option value="Monthly">Monthly</option>
          </select>
        </div>
        <div className="form-group">
          <label>Hire Pay Rate $:</label>
          <input
            type="text"
            name="hirePayRate"
            value={formData.hirePayRate}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Effective Date:</label>
          <input
            type="date"
            name="effectiveDate"
            value={formData.effectiveDate}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Approval Date:</label>
          <input
            type="date"
            name="approvalDate"
            value={formData.approvalDate}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>
            I acknowledge and agree to the payroll information above, including
            my pay rate:
          </label>
          <div className="signature-container">
            <canvas
              ref={signatureCanvas}
              id="signatureCanvas"
              width="400"
              height="200"
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={finishDrawing}
              onMouseLeave={finishDrawing}
            />
            <button
              type="button"
              className="btn btn-secondary btn-clear"
              onClick={clearSignature}
            >
              Clear Signature
            </button>
          </div>
        </div>
        <div className="form-group">
          <label>Date Signed:</label>
          <input
            type="date"
            name="dateSigned"
            value={formData.dateSigned}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group text-center">
          <button type="submit" className="btn-submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default EmployeePayrollForm;
