import React, { useState, useEffect } from "react";
import { PDFDocument } from "pdf-lib";
import I9 from "../../../../assets/files/i-9.pdf";

export default function I9PDF() {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [file, setFile] = useState(null); // To hold the uploaded file

  // Load the initial PDF and create a blob URL
  useEffect(() => {
    async function loadInitialPDF() {
      const response = await fetch(I9); // Adjust the path if necessary
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
    }

    loadInitialPDF().catch(console.error);
  }, []);

  const onFileChange = async (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile); // Save the uploaded file
      const pdfDoc = await PDFDocument.load(await uploadedFile.arrayBuffer());
      const pages = pdfDoc.getPages();
      const firstPage = pages[0];
      firstPage.drawText("This is an edited text!", {
        x: 50,
        y: firstPage.getHeight() - 100,
        size: 24,
      });

      const newPdfBytes = await pdfDoc.save();
      const blob = new Blob([newPdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
    }
  };

  const downloadPdf = () => {
    if (!pdfUrl) {
      alert("No PDF available to download.");
      return;
    }
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "I9.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const onFormSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      alert("No file loaded for submission.");
      return;
    }

    const formData = new FormData();
    formData.append("full_name", event.target.full_name.value);
    formData.append("date_of_birth", event.target.date_of_birth.value);
    formData.append("submitted_year", new Date().getFullYear());
    formData.append("pdf_file", file, file.name); // Send the uploaded file

    try {
      const response = await fetch("http://127.0.0.1:8000/upload_pdf/", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      alert("PDF submitted successfully!");
      console.log(data);
    } catch (error) {
      console.error("Error submitting PDF:", error);
      alert("Failed to submit PDF.");
    }
  };

  return (
    <div>
      <div style={{ margin: "20px 0" }}>
        <label htmlFor="upload" style={{ marginRight: 10 }}>
          Upload your PDF:
        </label>
        <input
          id="upload"
          type="file"
          onChange={onFileChange}
          accept="application/pdf"
        />
      </div>
      {pdfUrl && (
        <button
          onClick={downloadPdf}
          style={{ margin: "10px", padding: "10px 20px" }}
        >
          Download PDF
        </button>
      )}
      <form onSubmit={onFormSubmit} enctype="multipart/form-data">
        <input
          name="full_name"
          placeholder="Full Name"
          required
          style={{ marginRight: "10px" }}
        />
        <input
          type="date"
          name="date_of_birth"
          required
          style={{ marginRight: "10px" }}
        />
        <button type="submit" style={{ padding: "10px 20px" }}>
          Save PDF
        </button>
      </form>
    </div>
  );
}
