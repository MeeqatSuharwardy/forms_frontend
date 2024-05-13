import React, { useState, useRef } from "react";
import "./DirectDepositForm.css"; // Ensure to update CSS based on new style requirements
import depositslip from "../../../../assets/images/deposit/direct_deposit.png";

function DirectDepositForm() {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    cityStateZip: "",
    bankName: "",
    accountNumber: "",
    routingNumber: "",
    amount: "",
    percentage: "",
    accountType: "",
    companyName: "",
    date: "",
  });
  const signatureCanvas = useRef(null);
  const [signatureImage, setSignatureImage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const clearCanvas = () => {
    const canvas = signatureCanvas.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setSignatureImage("");
  };

  const handleCanvas = (e) => {
    const canvas = signatureCanvas.current;
    const ctx = canvas.getContext("2d");
    if (!painting) return;
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  };

  let painting = false;

  const startPaint = (e) => {
    painting = true;
    handleCanvas(e);
  };

  const endPaint = () => {
    painting = false;
    const canvas = signatureCanvas.current;
    setSignatureImage(canvas.toDataURL("image/png"));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formSubmissionData = {
      ...formData,
      signatureImage,
    };

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/submit_direct_deposit/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formSubmissionData),
        }
      );

      const data = await response.json();
      if (response.ok) {
        console.log("Form submitted successfully:", data);
        alert("Direct Deposit Authorization submitted successfully!");
      } else {
        throw new Error(data.message || "Failed to submit form");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(error.message);
    }
  };

  return (
    <div className="WordSection1">
      <h2 style={{ textAlign: "center" }}>DIRECT DEPOSIT AUTHORIZATION</h2>
      <p style={{ textAlign: "center" }}>
        Please complete ALL the information below.
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          className="input-line"
          placeholder="Name"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address"
          className="input-line"
          placeholder="Full Address"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="cityStateZip"
          className="input-line"
          placeholder="City, State, Zip"
          onChange={handleChange}
          required
        />
        <img
          src={depositslip}
          alt="Direct Deposit Image"
          style={{ width: "100%", height: "auto" }}
        />

        <table className="TableGrid">
          <tbody>
            <tr>
              <td>
                <strong>Name of Bank:</strong>
              </td>
              <td>
                <input
                  type="text"
                  name="bankName"
                  className="input-line"
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <strong>Account #:</strong>
              </td>
              <td>
                <input
                  type="text"
                  name="accountNumber"
                  className="input-line"
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <strong>9-Digit Routing #:</strong>
              </td>
              <td>
                <input
                  type="text"
                  name="routingNumber"
                  className="input-line"
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <strong>Amount or % of Paycheck:</strong>
              </td>
              <td>
                <input
                  type="text"
                  name="amount"
                  className="input-line"
                  placeholder="Amount"
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="percentage"
                  className="input-line"
                  placeholder="Percentage"
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <strong>Type of Account:</strong>
              </td>
              <td>
                <input
                  type="text"
                  name="accountType"
                  className="input-line"
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
          </tbody>
        </table>

        <input
          type="text"
          name="companyName"
          className="input-line"
          placeholder="Company Name"
          onChange={handleChange}
          required
        />
        <div>
          <canvas
            ref={signatureCanvas}
            onMouseDown={startPaint}
            onMouseUp={endPaint}
            onMouseMove={handleCanvas}
            onMouseLeave={endPaint}
          />
          <button type="button" onClick={clearCanvas}>
            Clear Signature
          </button>
          <input type="hidden" value={signatureImage} />
        </div>
        <input type="date" name="date" onChange={handleChange} required />
        <input type="submit" value="Submit Authorization" />
      </form>
    </div>
  );
}

export default DirectDepositForm;
