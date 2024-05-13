import React from "react";
import logo from "../../assets/images/logo/psychiatry_logo.png";
const headerStyles = {
  backgroundColor: "white", // Light grey background
  padding: "20px 40px", // Padding around the content
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)", // Subtle shadow for depth
  display: "flex", // Flex layout to align logo and address
  alignItems: "center", // Align items vertically
  justifyContent: "space-between", // Space between logo and address
};

const addressStyles = {
  color: "#333", // Dark grey text for good readability
  textAlign: "right", // Right-align the address
  fontFamily: "'Arial', sans-serif", // Modern, readable font
  fontSize: "14px", // Appropriate font size for address
  lineHeight: "1.5", // Spacing between lines
};

function Header() {
  return (
    <header style={headerStyles}>
      <img src={logo} alt="Company Logo" style={{ width: "200px" }} />
      <address style={addressStyles}>
        3919 Tampa Road
        <br />
        Oldsmar, FL 34677
        <br />
        Phone (727) 733-6111 Fax (727) 733-6002
        <br />
        <a
          href="http://www.healthandpsychiatry.com"
          style={{ color: "#0056b3", textDecoration: "none" }}
        >
          www.healthandpsychiatry.com
        </a>
      </address>
    </header>
  );
}

export default Header;
