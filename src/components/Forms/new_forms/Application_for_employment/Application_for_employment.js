import React, { useState } from "react";
import "./Application_for_employment.css";
import Header from "../../../header/header";

function EmploymentForm() {
  const [formData, setFormData] = useState({
    positionApplyingFor: "",
    name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    homeTelephone: "",
    businessTelephone: "",
    cellular: "",
    startDate: "",
    salaryDesired: "",
    hours: [],
    days: [],
    authorized: "",
    specialSkills: "",
    dateofbirth: "",
    references: [{ name: "", phone: "", relationship: "" }],
    workHistory: [
      {
        jobTitle: "",
        startDate: "",
        endDate: "",
        companyName: "",
        supervisorName: "",
        phoneNumber: "",
        city: "",
        state: "",
        zip: "",
        duties: "",
        reasonForLeaving: "",
        startingSalary: "",
        endingSalary: "",
      },
    ],
    qualifications: [{ schoolName: "", degree: "" }],
  });

  const handleInputChange = (e, section, index) => {
    const { name, value } = e.target;
    if (section) {
      const list = [...formData[section]];
      list[index][name] = value;
      setFormData({ ...formData, [section]: list });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleCheckboxChange = (e, field) => {
    const { checked, value } = e.target;
    if (checked) {
      setFormData({ ...formData, [field]: [...formData[field], value] });
    } else {
      setFormData({
        ...formData,
        [field]: formData[field].filter((v) => v !== value),
      });
    }
  };

  const addSectionField = (section) => {
    const newField =
      section === "workHistory"
        ? {
            jobTitle: "",
            startDate: "",
            endDate: "",
            companyName: "",
            supervisorName: "",
            phoneNumber: "",
            city: "",
            state: "",
            zip: "",
            duties: "",
            reasonForLeaving: "",
            startingSalary: "",
            endingSalary: "",
          }
        : { name: "", phone: "", relationship: "" };
    setFormData({
      ...formData,
      [section]: [...formData[section], newField],
    });
  };

  const removeSectionField = (section, index) => {
    const updatedSection = formData[section].filter((_, i) => i !== index);
    setFormData({ ...formData, [section]: updatedSection });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);

    // Prepare the data to match backend expectations (especially for dates and arrays)
    const payload = {
      ...formData,
      startDate: formData.startDate,
      dateofbirth: formData.dateofbirth,
      hours: formData.hours.join(","),
      days: formData.days.join(","),
    };

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/submit_application/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();
      if (response.ok) {
        alert("Application Submitted Successfully!");
      } else {
        alert("Submission failed: " + result.message);
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      alert("Error submitting the form");
    }
  };

  return (
    <>
      <br></br>
      <br></br>
      <Header />
      <br></br>
      <div style={{ margin: "20px", marginTop: "0.1%" }}>
        <form onSubmit={handleSubmit}>
          <div>
            <h2>Standard Application for Employment</h2>
            <p>
              It is our policy to comply with all applicable state and federal
              laws prohibiting discrimination in employment based on race, age,
              color, sex, religion, national origin, disability, or other
              protected classifications.
            </p>
            <p>
              Please carefully read and answer all questions. You will not be
              considered for employment if you fail to completely answer all the
              questions on this application. You may attach a résumé but all
              questions must be answered.
            </p>
            <label>Position applying for:</label>
            <input
              type="text"
              name="positionApplyingFor"
              value={formData.positionApplyingFor}
              onChange={handleInputChange}
            />
            <br></br>
            <br></br>
            <h3>PERSONAL DATA</h3>
            <label>Name (Last, First, Middle):</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <label>Date of Birth :</label>
            <input
              type="date"
              name="dateofbirth"
              value={formData.dateofbirth}
              onChange={handleInputChange}
            />
            <label>Full Address:</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
            />
            <br></br>
            <label>Home Telephone Number:</label> <br></br>
            <input
              type="tel"
              name="homeTelephone"
              value={formData.homeTelephone}
              onChange={handleInputChange}
            />
            <br></br>
            <label>Business Telephone Number:</label> <br></br>
            <input
              type="tel"
              name="businessTelephone"
              value={formData.businessTelephone}
              onChange={handleInputChange}
            />
            <br></br>
            <label>Cellular Telephone Number:</label> <br></br>
            <input
              type="tel"
              name="cellular"
              value={formData.cellular}
              onChange={handleInputChange}
            />
            <br></br>
            <label>Date you can start work:</label> <br></br>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
            />
            <br></br>
            <label>Salary Desired:</label>
            <input
              type="text"
              name="salaryDesired"
              value={formData.salaryDesired}
              onChange={handleInputChange}
            />
            <br></br>
            <br></br>
            <h3>POSITION INFORMATION</h3>
            <h4>Hours (check all that you are willing to work):</h4>
            <div>
              <input
                type="checkbox"
                id="full-time"
                value="Full Time"
                onChange={(e) => handleCheckboxChange(e, "hours")}
                checked={formData.hours.includes("Full Time")}
              />
              <label htmlFor="full-time">Full Time</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="part-time"
                value="Part Time"
                onChange={(e) => handleCheckboxChange(e, "hours")}
                checked={formData.hours.includes("Part Time")}
              />
              <label htmlFor="part-time">Part Time</label>
            </div>
            <h4 style={{ color: "black" }}>Days</h4>
            <div>
              <input
                type="checkbox"
                id="evenings"
                value="Evenings"
                onChange={(e) => handleCheckboxChange(e, "days")}
                checked={formData.days.includes("Evenings")}
              />
              <label htmlFor="evenings">Evenings</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="weekends"
                value="Weekends"
                onChange={(e) => handleCheckboxChange(e, "days")}
                checked={formData.days.includes("Weekends")}
              />
              <label htmlFor="weekends">Weekends</label>
            </div>
            <label>
              Are you authorized to work in the U.S. on an unrestricted basis?
            </label>
            <select
              name="authorized"
              value={formData.authorized}
              onChange={handleInputChange}
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            <br></br>
            <br></br>
            <h3>QUALIFICATIONS</h3>
            {formData.qualifications.map((qualification, index) => (
              <div key={index}>
                <label>School Name:</label>
                <input
                  type="text"
                  name="schoolName"
                  value={qualification.schoolName}
                  onChange={(e) =>
                    handleInputChange(e, "qualifications", index)
                  }
                />
                <label>Degree:</label>
                <input
                  type="text"
                  name="degree"
                  value={qualification.degree}
                  onChange={(e) =>
                    handleInputChange(e, "qualifications", index)
                  }
                />
                <br></br>
                <br></br>
                <button
                  type="button"
                  onClick={() => removeSectionField("qualifications", index)}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addSectionField("qualifications")}
            >
              + Add Qualification
            </button>
            <br></br>
            <br></br>
            <h3>SPECIAL SKILLS</h3>
            <textarea
              name="specialSkills"
              value={formData.specialSkills}
              onChange={handleInputChange}
              rows="4"
            ></textarea>
            <br></br>
            <br></br>
            <h3>REFERENCES</h3>
            {formData.references.map((reference, index) => (
              <div key={index}>
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={reference.name}
                  onChange={(e) => handleInputChange(e, "references", index)}
                />
                <label>Phone:</label>
                <br></br>
                <input
                  type="tel"
                  name="phone"
                  value={reference.phone}
                  onChange={(e) => handleInputChange(e, "references", index)}
                />
                <br></br>
                <label>Relationship:</label>
                <input
                  type="text"
                  name="relationship"
                  value={reference.relationship}
                  onChange={(e) => handleInputChange(e, "references", index)}
                />
                <br></br>
                <br></br>
                <button
                  type="button"
                  onClick={() => removeSectionField("references", index)}
                >
                  Remove
                </button>
                <br></br>
              </div>
            ))}
            <button type="button" onClick={() => addSectionField("references")}>
              + Add Reference
            </button>
            <br></br>
            <br></br>
            <h3>WORK HISTORY</h3>
            {formData.workHistory.map((job, index) => (
              <div key={index}>
                <label>Job Title:</label>
                <input
                  type="text"
                  name="jobTitle"
                  value={job.jobTitle}
                  onChange={(e) => handleInputChange(e, "workHistory", index)}
                />
                <label>Start Date (mo/day/yr):</label>
                <br></br>
                <input
                  type="date"
                  name="startDate"
                  value={job.startDate}
                  onChange={(e) => handleInputChange(e, "workHistory", index)}
                />
                <br></br>
                <label>End Date (mo/day/yr):</label>
                <br></br>
                <input
                  type="date"
                  name="endDate"
                  value={job.endDate}
                  onChange={(e) => handleInputChange(e, "workHistory", index)}
                />
                <br></br>
                <label>Company Name:</label>
                <input
                  type="text"
                  name="companyName"
                  value={job.companyName}
                  onChange={(e) => handleInputChange(e, "workHistory", index)}
                />
                <label>Supervisor’s Name:</label>
                <input
                  type="text"
                  name="supervisorName"
                  value={job.supervisorName}
                  onChange={(e) => handleInputChange(e, "workHistory", index)}
                />
                <label>Phone Number:</label>
                <br></br>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={job.phoneNumber}
                  onChange={(e) => handleInputChange(e, "workHistory", index)}
                />
                <br></br>
                <label>City:</label>
                <input
                  type="text"
                  name="city"
                  value={job.city}
                  onChange={(e) => handleInputChange(e, "workHistory", index)}
                />
                <label>State:</label>
                <input
                  type="text"
                  name="state"
                  value={job.state}
                  onChange={(e) => handleInputChange(e, "workHistory", index)}
                />
                <label>Zip:</label>
                <input
                  type="text"
                  name="zip"
                  value={job.zip}
                  onChange={(e) => handleInputChange(e, "workHistory", index)}
                />
                <label>Duties:</label>
                <textarea
                  name="duties"
                  value={job.duties}
                  onChange={(e) => handleInputChange(e, "workHistory", index)}
                ></textarea>
                <label>Reason for Leaving:</label>
                <input
                  type="text"
                  name="reasonForLeaving"
                  value={job.reasonForLeaving}
                  onChange={(e) => handleInputChange(e, "workHistory", index)}
                />
                <label>Starting Salary:</label>
                <input
                  type="text"
                  name="startingSalary"
                  value={job.startingSalary}
                  onChange={(e) => handleInputChange(e, "workHistory", index)}
                />
                <label>Ending Salary:</label>
                <input
                  type="text"
                  name="endingSalary"
                  value={job.endingSalary}
                  onChange={(e) => handleInputChange(e, "workHistory", index)}
                />
                <br></br>
                <br></br>
                <button
                  type="button"
                  onClick={() => removeSectionField("workHistory", index)}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addSectionField("workHistory")}
            >
              + Add Work History
            </button>
            <br></br>
            <br></br>
          </div>
          <input type="submit" value="Submit Application" />
        </form>
      </div>
    </>
  );
}

export default EmploymentForm;
