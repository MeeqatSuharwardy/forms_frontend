import React, { useRef, useState, useEffect } from "react";
import "./receipt_of_company_property.css";

function ReceiptOfCompanyProperty() {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    description: "",
    employeeSignatureData: "",
    managerSignatureData: "",
    employeeDate: "",
    managerDate: "",
  });

  const employeeCanvasRef = useRef(null);
  const managerCanvasRef = useRef(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Function to initialize and handle canvas drawing
  const initCanvas = (canvasRef, dataFieldName) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let drawing = false;

    const startDrawing = (e) => {
      drawing = true;
      draw(e);
    };

    const draw = (e) => {
      if (!drawing) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x, y);
    };

    const stopDrawing = () => {
      drawing = false;
      ctx.beginPath();
      setFormData((prev) => ({
        ...prev,
        [dataFieldName]: canvas.toDataURL(),
      }));
    };

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseleave", stopDrawing);

    const clearCanvas = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setFormData((prev) => ({
        ...prev,
        [dataFieldName]: "",
      }));
    };

    return clearCanvas;
  };

  // Use effect hooks to setup the canvas after component mounts
  useEffect(() => {
    const clearEmployeeCanvas = initCanvas(
      employeeCanvasRef,
      "employeeSignatureData"
    );
    const clearManagerCanvas = initCanvas(
      managerCanvasRef,
      "managerSignatureData"
    );

    // Cleanup function to remove event listeners
    return () => {
      clearEmployeeCanvas();
      clearManagerCanvas();
    };
  }, []);

  return (
    <>
      <div className="container">
        <h2 className="text-center">
          Acknowledgement of Receipt of Company Property
        </h2>

        <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              name="name"
              required
            />
          </div>

          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={handleInputChange}
              name="date"
              required
            />
          </div>

          <div className="form-group">
            <label>
              Description of Equipment or Property Issued to Employee
            </label>
            <textarea
              rows="4"
              value={formData.description}
              onChange={handleInputChange}
              name="description"
              required
            />
          </div>

          <div className="form-group">
            <label>Employee Signature</label>
            <canvas ref={employeeCanvasRef} className="signature-canvas" />
            <button
              type="button"
              onClick={() =>
                initCanvas(employeeCanvasRef, "employeeSignatureData")()
              }
            >
              Clear Signature
            </button>
          </div>

          <div className="form-group">
            <label>Manager Signature</label>
            <canvas ref={managerCanvasRef} className="signature-canvas" />
            <button
              type="button"
              onClick={() =>
                initCanvas(managerCanvasRef, "managerSignatureData")()
              }
            >
              Clear Signature
            </button>
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
      <footer>
        &copy; {new Date().getFullYear()} Health and Psychiatry. All rights
        reserved.
      </footer>
    </>
  );
}

export default ReceiptOfCompanyProperty;
