import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { auth } from "./firebaseConfig"; // Import Firebase authentication
import Logo from "../assets/images/logo/psychiatry_logo.png";
import { updateEmail, updatePassword } from "../actions";
import { signInWithEmailAndPassword } from "firebase/auth";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoad: true,
      error: null, // Added to handle authentication errors
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ isLoad: false });
    }, 500);
    document.body.classList.remove("theme-cyan");
  }

  handleLogin = async (event) => {
    event.preventDefault();
    const { email, password } = this.props;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Logged in successfully!");
      // Redirect or handle the success case
    } catch (error) {
      this.setState({ error: error.message });
      console.error("Authentication error:", error);
    }
  };

  render() {
    const { isLoad, error } = this.state;
    return (
      <div className="theme-cyan">
        <div
          className="page-loader-wrapper"
          style={{ display: isLoad ? "block" : "none" }}
        >
          <div className="loader">
            <img src={Logo} alt="Lucid" width="48" height="48" />
            <p>Please wait...</p>
          </div>
        </div>
        <div className="auth-main">
          <div className="auth-box">
            <div className="top">
              <img
                src={Logo}
                alt="Lucid"
                style={{ height: "40px", margin: "10px" }}
              />
            </div>
            <div className="card">
              <div className="header">
                <p className="lead">Login to your account</p>
              </div>
              <div className="body">
                <form onSubmit={this.handleLogin}>
                  {error && <p className="text-danger">{error}</p>}
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      value={this.props.email}
                      onChange={(e) => this.props.updateEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      value={this.props.password}
                      onChange={(e) =>
                        this.props.updatePassword(e.target.value)
                      }
                    />
                  </div>
                  <a
                    className="btn btn-primary btn-lg btn-block"
                    href="filedocuments"
                  >
                    Login
                  </a>
                </form>
                {/* <div className="bottom">
                  <span className="helper-text">
                    <i className="fa fa-lock"></i>{" "}
                    <a href="forgotpassword">Forgot password?</a>
                  </span>
                  <span>
                    Don't have an account? <a href="registration">Register</a>
                  </span>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  updateEmail: PropTypes.func.isRequired,
  updatePassword: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.loginReducer.email,
  password: state.loginReducer.password,
});

const mapDispatchToProps = {
  updateEmail,
  updatePassword,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
