import React, { useState, useRef } from "react";
import "./emergency_contacts_final.css";

function EmployeeEmergencyContacts() {
  const [formData, setFormData] = useState({
    employeeName: "",
    phoneNumber: "",
    address: "",
    cityStateZip: "",
    primaryName: "",
    primaryRelationship: "",
    primaryPhone: "",
    primaryAltPhone: "",
    secondaryName: "",
    secondaryRelationship: "",
    secondaryPhone: "",
    secondaryAltPhone: "",
    doctorName: "",
    doctorPhone: "",
    doctorAddress: "",
    dateSigned: "",
  });

  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    const ctx = canvasRef.current.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    const ctx = canvasRef.current.getContext("2d");
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
  };

  const stopDrawing = () => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.closePath();
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Using the existing formData from state and adding the signature image
    const signatureImage = canvasRef.current.toDataURL("image/png");
    const completeFormData = {
      ...formData,
      signatureImage,
      dateSigned: formData.dateSigned || new Date().toISOString().split("T")[0], // Ensuring a date is always sent
    };

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/submit_emergency_contact/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(completeFormData),
        }
      );

      const result = await response.json();
      if (response.ok) {
        alert("Form submitted successfully!");
        console.log(result);
        // Optionally reset the form here
        setFormData({
          employeeName: "",
          phoneNumber: "",
          address: "",
          cityStateZip: "",
          primaryName: "",
          primaryRelationship: "",
          primaryPhone: "",
          primaryAltPhone: "",
          secondaryName: "",
          secondaryRelationship: "",
          secondaryPhone: "",
          secondaryAltPhone: "",
          doctorName: "",
          doctorPhone: "",
          doctorAddress: "",
          dateSigned: "",
        });
        clearCanvas(); // Clear the signature canvas
      } else {
        throw new Error(result.message || "An unknown error occurred");
      }
    } catch (error) {
      alert("Failed to submit form: " + error.message);
      console.error("Error submitting form: ", error);
    }
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        maxWidth: "800px",
        margin: "auto",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          textAlign: "center",
          border: "2px solid #009688",
          padding: "20px",
        }}
      >
        <h2 style={{ color: "#009688" }}>Employee Emergency Contacts</h2>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            marginBottom: "15px",
          }}
        >
          <div style={{ flexBasis: "48%", minWidth: "200px" }}>
            <label>Employee Name:</label>
            <input
              type="text"
              name="employeeName"
              value={formData.employeeName}
              onChange={handleInputChange}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </div>
          <div style={{ flexBasis: "48%", minWidth: "200px" }}>
            <label>Phone Number:</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </div>
        </div>

        <div class="form-group">
          <label for="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
          />
        </div>

        <h3>Emergency Contacts:</h3>

        <div>
          <strong>Primary Contact:</strong>
        </div>
        <div class="form-group-inline">
          <div class="form-group">
            <label for="primaryName">Name:</label>
            <input
              type="text"
              id="primaryName"
              name="primaryName"
              value={formData.primaryName}
              onChange={handleInputChange}
            />
          </div>
          <div class="form-group">
            <label for="primaryRelationship">Relationship:</label>
            <input
              type="text"
              id="primaryRelationship"
              name="primaryRelationship"
              value={formData.primaryRelationship}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div class="form-group-inline">
          <div class="form-group">
            <label for="primaryPhone">Phone Number:</label>
            <input
              type="text"
              id="primaryPhone"
              name="primaryPhone"
              value={formData.primaryPhone}
              onChange={handleInputChange}
            />
          </div>
          <div class="form-group">
            <label for="primaryAltPhone">Alt. Phone Number:</label>
            <input
              type="text"
              id="primaryAltPhone"
              name="primaryAltPhone"
              value={formData.primaryAltPhone}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <strong>Secondary Contact:</strong>
        </div>
        <div class="form-group-inline">
          <div class="form-group">
            <label for="secondaryName">Name:</label>
            <input
              type="text"
              id="secondaryName"
              name="secondaryName"
              value={formData.secondaryName}
              onChange={handleInputChange}
            />
          </div>
          <div class="form-group">
            <label for="secondaryRelationship">Relationship:</label>
            <input
              type="text"
              id="secondaryRelationship"
              name="secondaryRelationship"
              value={formData.secondaryRelationship}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div class="form-group-inline">
          <div class="form-group">
            <label for="secondaryPhone">Phone Number:</label>
            <input
              type="text"
              id="secondaryPhone"
              name="secondaryPhone"
              value={formData.secondaryPhone}
              onChange={handleInputChange}
            />
          </div>
          <div class="form-group">
            <label for="secondaryAltPhone">Alt. Phone Number:</label>
            <input
              type="text"
              id="secondaryAltPhone"
              name="secondaryAltPhone"
              value={formData.secondaryAltPhone}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <h3>Physician Contacts:</h3>
        <div class="form-group-inline">
          <div class="form-group">
            <label for="doctorName">Doctor’s Name:</label>
            <input
              type="text"
              id="doctorName"
              name="doctorName"
              value={formData.doctorName}
              onChange={handleInputChange}
            />
          </div>
          <div class="form-group">
            <label for="doctorPhone">Phone Number:</label>
            <input
              type="text"
              id="doctorPhone"
              name="doctorPhone"
              value={formData.doctorPhone}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div class="form-group">
          <label for="doctorAddress">Address:</label>
          <input
            type="text"
            id="doctorAddress"
            name="doctorAddress"
            value={formData.doctorAddress}
            onChange={handleInputChange}
          />
        </div>

        <div class="authorization">
          <p>Employee Authorization</p>
          <p>
            I have voluntarily provided the above contact information and
            authorize Health and Psychiatry Consultants, LLC and its
            representatives to contact any of the above individuals on my behalf
            in case of an emergency.
          </p>
        </div>
        <div
          className="signature-line"
          style={{
            borderTop: "1px solid #000",
            width: "300px",
            margin: "20px auto",
            paddingTop: "10px",
          }}
        >
          <label>Employee Signature</label>
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseOut={stopDrawing}
            style={{ border: "1px solid #ccc" }}
          />
          <button
            type="button"
            onClick={clearCanvas}
            style={{
              width: "100%",
              padding: "10px",
              margin: "10px 0",
              backgroundColor: "black",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Clear Signature
          </button>
        </div>

        <input type="submit" value="Submit Application" />
      </form>
    </div>
  );
}

export default EmployeeEmergencyContacts;
