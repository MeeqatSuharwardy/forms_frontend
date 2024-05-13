import React from "react";
import { connect } from "react-redux";
import { Route, Switch, withRouter } from "react-router-dom";
import I9PDF from "./components/Forms/new_forms/I9/i9";
import Fw4PDF from "./components/Forms/new_forms/w4/w4_form";
import NavbarMenu from "./components/NavbarMenu";
import NavbarMenu2 from "./components/NavbarMenu2";
import NavbarMenu3 from "./components/NavbarMenu3";
import DirectDepositForm from "./components/Forms/new_forms/direct_deposit_authorization/direct_deposit_authorization";
import AntiHarassmentForm from "./components/Forms/new_forms/Anti_harassment/Anti_harassment";
import EmploymentForm from "./components/Forms/new_forms/Application_for_employment/Application_for_employment";
import CellPhonePolicyForm from "./components/Forms/new_forms/Cell_Phone_policy/Cell_Phone_policy";
import filemanagerdashboard from "./screens/FileManager/Dashboard";
import filedocuments from "./screens/FileManager/Documents";
import FileDocumentsEmployee from "./screens/FileManager/Documents_employee";
import FileDocumentsCrdentials from "./screens/FileManager/DocumentsC";
import filemedia from "./screens/FileManager/Media";
import Login from "./screens/Login";
import dashboard from "./screens/Dashbord/Dashbord";
import CredentialingChecklist from "./components/Forms/new_forms/credentialing_checklist/credentialing_checklist";
import CredentialingApplicationForm from "./components/Forms/new_forms/credentialing_comprehensive_checklist/credentialing_comprehensive_checklist";
import EmployeeEmergencyContacts from "./components/Forms/new_forms/emergency_contacts_final/emergency_contacts_final";
import EmployeePayrollForm from "./components/Forms/new_forms/employee_payroll_information/employee_payroll_information";
import EmployeeConfidentialityForm from "./components/Forms/new_forms/hippa/hippa_agreement";
import ReceiptOfCompanyProperty from "./components/Forms/new_forms/receipt_of_company_property/receipt_of_company_property";

window.__DEV__ = true;
const navbarMenu1Paths = ["/filedocuments", "/filemedia"];

const navbarMenu2Paths = [
  "/EmployeeEmergencyContacts",
  "/EmployeePayrollForm",
  "/EmployeeConfidentialityForm",
  "/ReceiptOfCompanyProperty",
  "/AntiHarassmentForm",
  "/EmploymentForm",
  "/CellPhonePolicyForm",
  "/DirectDepositForm",
  "/FileDocumentsEmployee",
  "/I9PDF",
  "/Fw4PDF",
];

const navbarMenu3Paths = [
  "/FileDocumentsCrdentials",
  "/CredentialingChecklist",
  "/CredentialingApplicationForm",
];
class App extends React.Component {
  constructor(props) {
    console.warn = () => {};
    super(props);
    this.state = {
      isLoad: true,
    };
  }
  renderNavbarMenu = (props) => {
    const currentPath = props.location.pathname.replace(
      process.env.PUBLIC_URL,
      ""
    );
    console.log("Current Path:", currentPath);

    if (navbarMenu2Paths.includes(currentPath)) {
      console.log("Rendering NavbarMenu2");
      return <NavbarMenu2 />;
    } else if (navbarMenu1Paths.includes(currentPath)) {
      console.log("Rendering NavbarMenu");
      return <NavbarMenu />;
    } else if (navbarMenu3Paths.includes(currentPath)) {
      console.log("Rendering NavbarMenu");
      return <NavbarMenu3 />;
    }

    console.log("No Navbar Menu Rendered");
    return null;
  };
  render() {
    var res = window.location.pathname;
    var baseUrl = process.env.PUBLIC_URL;
    baseUrl = baseUrl.split("/");
    res = res.split("/");
    res = res.length > 0 ? res[baseUrl.length] : "/";
    res = res ? res : "/";
    const activeKey1 = res;

    return (
      <div id="wrapper">
        <Route path="/" render={(props) => this.renderNavbarMenu(props)} />
        <div id="main-content">
          <Switch>
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/`}
              component={Login}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/login`}
              component={Login}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/dashboard`}
              component={dashboard}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/filemanagerdashboard`}
              component={filemanagerdashboard}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/filedocuments`}
              component={filedocuments}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/FileDocumentsEmployee`}
              component={FileDocumentsEmployee}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/FileDocumentsCrdentials`}
              component={FileDocumentsCrdentials}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/filemedia`}
              component={filemedia}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/AntiHarassmentForm`}
              component={AntiHarassmentForm}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/EmploymentForm`}
              component={EmploymentForm}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/CellPhonePolicyForm`}
              component={CellPhonePolicyForm}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/CredentialingChecklist`}
              component={CredentialingChecklist}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/CredentialingApplicationForm`}
              component={CredentialingApplicationForm}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/DirectDepositForm`}
              component={DirectDepositForm}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/EmployeeEmergencyContacts`}
              component={EmployeeEmergencyContacts}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/EmployeePayrollForm`}
              component={EmployeePayrollForm}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/EmployeeConfidentialityForm`}
              component={EmployeeConfidentialityForm}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/ReceiptOfCompanyProperty`}
              component={ReceiptOfCompanyProperty}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/I9PDF`}
              component={I9PDF}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/Fw4PDF`}
              component={Fw4PDF}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ loginReducer }) => ({
  isLoggedin: loginReducer.isLoggedin,
});

export default withRouter(connect(mapStateToProps, {})(App));
