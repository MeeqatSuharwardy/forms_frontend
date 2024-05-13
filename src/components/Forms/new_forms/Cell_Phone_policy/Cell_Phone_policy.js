import React, { useRef, useState } from "react";
import "./CellPhonePolicyForm.css"; // Assuming you have an external CSS file
import Header from "../../../header/header";
function CellPhonePolicyForm() {
  const [signature, setSignature] = useState("");
  const [date, setDate] = useState("");
  const [dateofbirth, setdateofbirth] = useState("");
  const [printedName, setPrintedName] = useState("");
  const canvasRef = useRef(null);
  const ctx = useRef(null);

  const startPainting = (e) => {
    const canvas = canvasRef.current;
    ctx.current = canvas.getContext("2d");
    ctx.current.beginPath();
    ctx.current.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    canvas.addEventListener("mousemove", paint);
  };

  const paint = (e) => {
    if (ctx.current) {
      ctx.current.lineTo(e.offsetX, e.offsetY);
      ctx.current.stroke();
    }
  };

  const stopPainting = () => {
    if (canvasRef.current) {
      canvasRef.current.removeEventListener("mousemove", paint);
      const imageData = canvasRef.current.toDataURL("image/png");
      setSignature(imageData);
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    ctx.current.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Gather data to be sent to the server
    const formData = {
      printedName: printedName,
      dateOfBirth: dateofbirth,
      date: date,
      signature: signature, // This should be the base64 encoded image data
    };

    // Convert the object to JSON
    const jsonData = JSON.stringify(formData);

    // Set the request options
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: jsonData,
    };

    // Send the request to the server endpoint
    fetch(
      "http://127.0.0.1:8000/submit_cell_phone_policy_form/",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          console.log("Form submitted successfully:", data);
          alert("Form submitted successfully!");
          // Optionally reset the form or redirect the user
        } else {
          console.error("Submission error:", data);
          alert("Error submitting form: " + data.message);
        }
      })
      .catch((error) => {
        console.error("Error with fetch operation:", error);
        alert("Network error or server is not responding");
      });
  };

  return (
    <>
      <div className="form-container">
        <br></br>
        <br></br>
        <Header />
        <form onSubmit={handleSubmit}>
          <h2>Attention All Employees</h2>
          <p className="center-text">
            USING PERSONAL CELL PHONES DURING WORK HOURS IS{" "}
            <strong>STRICTLY PROHIBITED.</strong>
          </p>
          <p className="center-text">
            ANY PERSON(S) FOUND VIOLATING THIS ON THE FIRST INSTANCE WILL BE
            GIVEN A WRITTEN WARNING.
          </p>
          <div className="center-text">
            <label htmlFor="signatureCanvas">Signature:</label>
            <canvas
              ref={canvasRef}
              id="signatureCanvas"
              width="300"
              height="100"
              onMouseDown={startPainting}
              onMouseUp={stopPainting}
              onMouseLeave={stopPainting}
            />
            <button type="button" onClick={clearCanvas}>
              Clear Signature
            </button>
          </div>
          <div className="center-text">
            <label htmlFor="agreementDate" style={{ alignSelf: "center" }}>
              Date:
            </label>
            <br></br>
            <input
              type="date"
              id="agreementDate"
              name="agreementDate"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="center-text">
            <label htmlFor="dateofbirth" style={{ alignSelf: "center" }}>
              Date of Birth:
            </label>
            <br></br>
            <input
              type="date"
              id="dateofbirth"
              name="dateofbirth"
              value={dateofbirth}
              onChange={(e) => setdateofbirth(e.target.value)} // Corrected this line
              required
            />
          </div>

          <div className="center-text">
            <label htmlFor="printedName" style={{ alignSelf: "center" }}>
              Full Name:
            </label>
            <br></br>
            <input
              type="text"
              id="printedName"
              name="printedName"
              value={printedName}
              onChange={(e) => setPrintedName(e.target.value)} // Corrected this line
              required
            />
          </div>

          <div className="center-text">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default CellPhonePolicyForm;
