import React, { useState, useRef } from "react";
import "./hippa_agreement.css";
function EmployeeConfidentialityForm() {
  const [formData, setFormData] = useState({
    agreementDate: "",
    agreementMonth: "",
    agreementYear: "",
    employeeName: "",
    signatureImageData: "",
  });

  const signatureCanvas = useRef(null);
  const [isPainting, setIsPainting] = useState(false);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const startPaint = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    setIsPainting(true);
    setLastPos({ x: offsetX, y: offsetY });
  };

  const paint = ({ nativeEvent }) => {
    if (!isPainting) return;
    const { offsetX, offsetY } = nativeEvent;
    const canvas = signatureCanvas.current;
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(lastPos.x, lastPos.y);
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
    setLastPos({ x: offsetX, y: offsetY });
  };

  const stopPaint = () => {
    if (isPainting) {
      setIsPainting(false);
      const canvas = signatureCanvas.current;
      const imageData = canvas.toDataURL("image/png");
      setFormData((prev) => ({ ...prev, signatureImageData: imageData }));
    }
  };

  const clearCanvas = () => {
    const canvas = signatureCanvas.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setFormData((prev) => ({ ...prev, signatureImageData: "" }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "http://127.0.0.1:5000/submit_hipaa_agreement/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            agreementDate: formData.agreementDate,
            agreementMonth: formData.agreementMonth,
            agreementYear: formData.agreementYear,
            employeeName: formData.employeeName,
            signatureImageData: formData.signatureImageData,
          }),
        }
      );

      const result = await response.json();
      if (response.ok) {
        alert("Form submitted successfully!");
        console.log(result);
        // Optionally reset the form here or handle navigation/redirect
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
      <form className="form" onSubmit={handleSubmit}>
        <div className="document">
          <h2>Hippa Agreement</h2>
          <p>
            THIS AGREEMENT ("Agreement") entered into this
            <input
              type="text"
              name="agreementDate"
              placeholder="Date"
              value={formData.agreementDate}
              onChange={handleInputChange}
              required
            />{" "}
            day of
            <input
              type="text"
              name="agreementMonth"
              placeholder="Month"
              value={formData.agreementMonth}
              onChange={handleInputChange}
              required
            />
            ,
            <input
              type="text"
              name="agreementYear"
              placeholder="Year"
              value={formData.agreementYear}
              onChange={handleInputChange}
              required
            />
            , by and between Health and Psychiatry, known as the "Healthcare
            Facility", and
            <input
              type="text"
              name="employeeName"
              placeholder="Employee's Full Name"
              value={formData.employeeName}
              onChange={handleInputChange}
              required
            />
            , hereinafter referred to as the "Employee", and known collectively
            as the "Parties", set forth the terms and conditions under which
            Confidential Information, as defined in this Agreement, may be used.
          </p>
          <p>
            WHEREAS, Healthcare Facility desires to employ Employee in a
            position which involves the processing and receipt of Confidential
            Information, as defined in this Agreement; and
          </p>
          <h2>Terms and Conditions</h2>
          <ol>
            <li>
              <strong>Confidential Information:</strong> The Parties acknowledge
              that meaningful employment may or will necessitate disclosure of
              Confidential Information by this Healthcare Facility to the
              Employee and use of such Confidential Information by the Employee.
              The term "Confidential Information” means: (1) “education records”
              as defined in the Family Education Rights and Privacy Act
              (“FERPA”) and other applicable laws and regulations; (2)
              “protected health information” as defined in the Health Insurance
              Portability and Accountability Act (“HIPAA”); (3) employee medical
              information protected by the confidentiality requirements of the
              Americans with Disability Act (“ADA”); (4) employee medical
              information protected by confidentiality requirements of the
              Family Medical Leave Act (“FMLA”); and (5) information deemed
              confidential by other applicable laws and regulations, as well as
              any information or materials which are confidentially disclosed by
              the Healthcare Facility to the Employee, or obtained by the
              Employee in the course of his/her duties to the Healthcare
              Facility, including, but not limited to, trade secret information;
              matters of a technical nature such as processes, devices,
              techniques, data and formulas, research subjects and results;
              marketing methods; plans and strategies; information about
              operations, products, services, revenues, expenses, profits,
              sales, key personnel, customers, suppliers, and pricing policies;
              and any information concerning the marketing and other business
              affairs and methods of the Healthcare Facility which is not
              readily available to the public.
              <br />
            </li>
            <li>
              <strong>Disclosure:</strong> Disclosure and use of Confidential
              Information includes oral communications as well as display or
              distribution of tangible physical documentation, in whole or in
              part, from any source or in any format (e.g., paper, digital,
              electronic, internet, social networks, magnetic or optical media,
              film, etc.). The Parties have entered into this Agreement to
              induce use and disclosure of Confidential Information and are
              relying on the covenants contained herein in making any such use
              or disclosure. This Healthcare Facility, not the Employee, is the
              owner of all Confidential Information and the Employee has no
              right or ownership interest in any Confidential Information. All
              records, materials, documents or other objects containing
              Confidential Information, and copies thereof, obtained by the
              Employee in the course of his or her employment with the
              Healthcare Facility are confidential and shall not be used or
              disclosed in any manner by the Employee, except as allowed by
              applicable law and regulations and the policies and practices of
              the Healthcare Facility. Notwithstanding the policies and
              practices of the Healthcare Facility, in no event shall the
              Employee use or disclose Confidential Information in violation of
              HIPAA, FERPA, ADA, FMLA or other applicable law or regulations.
              After the termination of his or her employment with the Healthcare
              Facility for any reason, the Employee shall not use or disclose
              the contents of such Confidential Information for any purpose
              whatsoever, except as may be required by law, provided that the
              Employee must first provide prompt notice thereof to the
              Healthcare Facility to permit the Healthcare Facility an
              opportunity to contest such disclosure.
              <br />
            </li>
            <li>
              <strong>Removal of Confidential Information:</strong> The Employee
              agrees not to remove from the premises of the Healthcare Facility,
              except as an employee of the Healthcare Facility in pursuit of the
              businesses of the Healthcare Facility or except as authorized or
              directed by the Healthcare Facility, any records, materials,
              documents or object containing or reflecting any Confidential
              Information. The Employee recognizes that all such documents and
              objects, whether developed by her or by someone else, are the
              exclusive property of the Healthcare Facility.
              <br />
            </li>
            <li>
              <strong>Applicable Law:</strong> Confidential information will not
              be used or disclosed by the Employee: in violation of applicable
              law, including, but not limited to, HIPAA Federal and State
              records owner statute; this Agreement; the Healthcare Facility’s
              Notice of Privacy Practices, as amended; or any other limitations
              as put in place by Practice from time to time. The intent of this
              Agreement is to ensure that the Employee will use and access only
              the minimum amount of Confidential Information necessary to
              perform the Employee’s duties and will not disclose Confidential
              Information outside this Healthcare Facility unless expressly
              authorized in writing to do so by this Healthcare Facility. All
              Confidential Information received (or which may be received in the
              future) by Employee will be held and treated by him or her as
              confidential and win not be disclosed in any manner whatsoever, in
              whole or in part, except as authorized by this Healthcare Facility
              and will not be used other than in connection with the employment
              relationship.
              <br />
            </li>
            <li>
              <strong>Log-on Code and Password:</strong> The Employee
              understands that he or she will be assigned a log-on code or
              password by the Healthcare Facility, which may be changed as this
              Healthcare Facility, in its sole discretion, sees fit. The
              Employee will not change the log-on code or password without this
              Healthcare Facility’s permission. Nor will the Employee leave
              Confidential Information unattended (e.g., so that it remains
              visible on computer screens after the Employee’s use). The
              Employee agrees that his or her log-on code or password is
              equivalent to a legally binding signature and will not be
              disclosed to or used by anyone other than the Employee. Nor will
              the Employee use or even attempt to learn another person’s log-on
              code or password. The Employee immediately will notify this
              Healthcare Facility's HIPAA Privacy Officer if Employee reasonably
              believes that his or her log-on code or password no longer is
              confidential.
              <br />
              <br />
              The Employee agrees that all computer systems are the exclusive
              property of the Healthcare Facility and will not be used by the
              Employee for any purpose unrelated to his or her employment. The
              Employee acknowledges that he or she has no right of privacy when
              using this Healthcare Facility’s computer systems and that his or
              her computer use periodically will be monitored by this Healthcare
              Facility to ensure compliance with this Agreement and applicable
              law.
              <br />
            </li>
            <li>
              <strong>Returning Confidential Information:</strong> Immediately
              upon request by this Healthcare Facility the Employee will return
              all Confidential Information to this Healthcare Facility and will
              not retain any copies of any Confidential Information, except as
              otherwise expressly permitted in writing signed by this Healthcare
              Facility. All Confidential Information, including copies thereof,
              will remain and be the exclusive property of this Healthcare
              Facility, unless Otherwise required by applicable law. The
              Employee specifically agrees that he or she will not and will not
              allow anyone working on their behalf or affiliated with the
              Employee in any way, to use any or all of the Confidential
              Information for any purpose other than as expressly allowed by
              this Agreement. The Employee understands that violating the terms
              of this Agreement may, in this Healthcare Facility’s sole
              discretion, result in disciplinary action including termination of
              employment and/or legal action to prevent or recover damages for
              breach. Breach reporting is imperative.
              <br />
            </li>
            <li>
              <strong>Breach:</strong> The Parties agree that any breach of any
              of the covenants or agreements set forth herein by the Employee
              will result in irreparable injury to this Healthcare Facility for
              which money damages are inadequate; therefore, in the event of a
              breach or an anticipatory breach, the Healthcare Facility will be
              entitled (in addition to any other rights and remedies which it
              may have at law or in equity, including money damages) and to have
              an injunction, without bond, issued enjoining and restraining the
              Employee and/or any other person involved from breaching this
              Agreement.
              <br />
            </li>
            <li>
              <strong>Binding Arrangement:</strong> This Agreement shall be
              binding upon and endure to the benefit of all Parties hereto and
              to each of their successors, assigns, officers, agents, employees,
              shareholders and directors. This Agreement commences on the date
              set forth above and the terms of this Agreement shall survive any
              termination, cancellation, expiration or other conclusion of this
              Agreement unless the Parties otherwise expressly agree in writing.
              <br />
            </li>
            <li>
              <strong>Governing Law:</strong> The Parties agree that the
              interpretation, legal effect and enforcement of this Agreement
              shall be governed by the laws in the State of Florida and by
              execution hereof, each party agrees to the jurisdiction of the
              courts of the State of Florida. The Parties agree that any suit
              arising out of or relation to this Agreement shalt be brought in
              the county where this Healthcare Facility’s principal place of
              business is located.
              <br />
            </li>
            <li>
              <strong>Correspondence:</strong> The Employee agrees that all
              Healthcare Facility correspondence with patients must be made
              through approved channels. Approved correspondence methods are as
              follows: (1) using the Healthcare Facility’s landline telephones
              or facsimile machine; (2) using the Healthcare Facility’s provided
              email; (3) through letters on Healthcare Facility approved
              Letterhead. If a cellular text message is necessary and required,
              the Employee understands that he or she must use a Healthcare
              Facility owned cell phone, which can be made available in the
              Front Office upon request. Employee agrees that under no
              circumstances may any correspondence with patients to be made with
              personal cell phones.
              <br />
            </li>
            <li>
              <strong>Severability:</strong> If any provision under this
              Agreement shall be held invalid or unenforceable for any reason.
              the remaining provisions and statements shall continue to be valid
              and enforceable.
              <br />
            </li>
          </ol>

          <br />
          <p>
            IN WITNESS WHEREOF, and intending to be legally bound, the Parties
            hereto have executed this Agreement on the date first above written,
            when signing below and after training on HIPAA Law with full
            understanding this agreement shall stand.
          </p>
          <br />
        </div>
        <h2>Signature</h2>
        <label>Employee Signature</label>
        <canvas
          ref={signatureCanvas}
          id="signatureCanvas"
          width="300"
          height="100"
          onMouseDown={startPaint}
          onMouseMove={paint}
          onMouseUp={stopPaint}
          onMouseLeave={stopPaint}
        />
        <button type="button" onClick={clearCanvas}>
          Clear Signature
        </button>
        <br></br>
        <br></br>

        <input
          type="hidden"
          value={formData.signatureImageData}
          name="signatureImageData"
        />

        <div className="form-group text-center">
          <button type="submit" className="btn-submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default EmployeeConfidentialityForm;
