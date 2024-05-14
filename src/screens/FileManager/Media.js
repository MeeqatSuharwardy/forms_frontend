import React, { useState } from "react";
import {
  Button,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Paper,
  Container,
  OutlinedInput,
  Checkbox,
  ListItemText,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import { connect } from "react-redux";
import "./media.css";

function FileMedia() {
  const [searchType, setSearchType] = useState("");
  const [searchParams, setSearchParams] = useState({
    printed_name: "",
    date_of_birth: "",
    position: "",
    name: "",
    date: "",
  });
  const [searchResults, setSearchResults] = useState([]);
  const [emailParams, setEmailParams] = useState({
    email: "",
    subject: "",
    message: "",
    filenames: [],
    user: "",
    password: "",
  });
  const [availableForms, setAvailableForms] = useState([]);

  const searchFields = {
    anti_harassment: [
      ["printed_name", "Printed Name"],
      ["date_of_birth", "Date of Birth"],
    ],
    applications: [
      ["position", "Position"],
      ["name", "Name"],
      ["date_of_birth", "Date of Birth"],
    ],
    cell_phone: [
      ["printed_name", "Printed Name"],
      ["date_of_birth", "Date of Birth"],
    ],
    direct_deposits: [
      ["name", "Name"],
      ["date", "Date"],
    ],
    emergency_contacts: [
      ["name", "Name"],
      ["date", "Date"],
    ],
  };

  const handleInputChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  const handleSearch = async () => {
    let url;
    switch (searchType) {
      case "anti_harassment":
        url = `http://127.0.0.1:5000/anti_harassment_submit_form_search?printed_name=${searchParams.printed_name}&date_of_birth=${searchParams.date_of_birth}`;
        break;
      case "applications":
        url = `http://127.0.0.1:5000/search_applications?position=${searchParams.position}&name=${searchParams.name}&date_of_birth=${searchParams.date_of_birth}`;
        break;
      case "cell_phone":
        url = `http://127.0.0.1:5000/search_cell_phone_policy_records?printed_name=${searchParams.printed_name}&date_of_birth=${searchParams.date_of_birth}`;
        break;
      case "direct_deposits":
        url = `http://127.0.0.1:5000/search_direct_deposits?name=${searchParams.name}&date=${searchParams.date}`;
        break;
      case "emergency_contacts":
        url = `http://127.0.0.1:5000/search_emergency_contacts?name=${searchParams.name}&date=${searchParams.date}`;
        break;
      case "i9":
        url = `http://127.0.0.1:5000/search_i9_forms/?full_name=${searchParams.full_name}&date_of_birth=${searchParams.date_of_birth}`;
        break;
      case "w4":
        url = `http://127.0.0.1:5000/search_w4_forms/?full_name=${searchParams.full_name}&date_of_birth=${searchParams.date_of_birth}`;
        break;
      default:
        return;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (searchType === "applications") {
        setSearchResults(data.applications || []);
      } else {
        setSearchResults(data.records || []);
      }
    } catch (error) {
      console.error("Search failed:", error);
      setSearchResults([]);
      alert("Failed to fetch search results.");
    }
  };

  const handleEmailChange = (e) => {
    setEmailParams({ ...emailParams, [e.target.name]: e.target.value });
  };

  const handleSendEmail = async () => {
    const url = "http://127.0.0.1:5000/send_email/";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailParams),
    });

    if (response.ok) {
      alert("Email sent successfully");
    } else {
      alert("Failed to send email");
    }
  };

  const inputsToRender = searchType ? searchFields[searchType] : [];

  return (
    <Container maxWidth="lg" className="file-media-container">
      <Paper elevation={3} className="file-media-paper">
        <Typography variant="h4" gutterBottom>
          Document Management Dashboard
        </Typography>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="search-type-label">Search Type</InputLabel>
          <Select
            labelId="search-type-label"
            value={searchType}
            label="Search Type"
            onChange={(e) => setSearchType(e.target.value)}
          >
            <MenuItem value="anti_harassment">
              Anti-Harassment Agreement
            </MenuItem>
            <MenuItem value="applications">Employee Information</MenuItem>
            <MenuItem value="cell_phone">Cellphone Agreement</MenuItem>
            <MenuItem value="direct_deposits">Direct Deposits Search</MenuItem>
            <MenuItem value="emergency_contacts">Emergency Contacts</MenuItem>
            <MenuItem value="i9">2024 W-4 Form</MenuItem>
            <MenuItem value="w4">2024 I-9 Form</MenuItem>
          </Select>
        </FormControl>
        <Grid container spacing={2}>
          {inputsToRender.map(([key, label]) => (
            <Grid item xs={12} sm={6} md={4} key={key}>
              <TextField
                label={label}
                name={key}
                value={searchParams[key] || ""}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                margin="normal"
              />
            </Grid>
          ))}
        </Grid>
        <br />
        <Grid item xs={12}>
          <Button onClick={handleSearch} variant="contained" color="primary">
            Search
          </Button>
        </Grid>

        <br />
        <Grid container spacing={2}>
          {searchResults.length > 0 ? (
            searchResults.map((result, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card raised>
                  <CardContent>
                    <Typography variant="body2" component="p">
                      Name: {result.name || result.printed_name}
                      <br />
                      {result.position_applying_for && (
                        <>
                          Position: {result.position_applying_for}
                          <br />
                        </>
                      )}
                      Date of Birth: {result.date_of_birth}
                      {result.date && (
                        <>
                          <br />
                          Date: {result.date}
                        </>
                      )}
                    </Typography>
                    {result.pdf_url && (
                      <iframe
                        src={result.pdf_url}
                        className="file-media-iframe"
                        title={`pdf-${index}`}
                        width="100%"
                        height="500px"
                      >
                        PDF cannot be displayed
                      </iframe>
                    )}
                  </CardContent>
                  <CardActions>
                    {result.pdf_url && (
                      <>
                        <Button
                          variant="contained"
                          color="primary"
                          href={result.pdf_url}
                          target="_blank"
                        >
                          View PDF
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          href={result.pdf_url}
                          download
                        >
                          Download PDF
                        </Button>
                      </>
                    )}
                  </CardActions>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="h6" className="no-results-message">
              No results found or error in fetching data.
            </Typography>
          )}
        </Grid>

        <br />
        <Typography variant="h5" gutterBottom>
          Send Form via Email
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Email"
              name="email"
              value={emailParams.email}
              onChange={handleEmailChange}
              fullWidth
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Subject"
              name="subject"
              value={emailParams.subject}
              onChange={handleEmailChange}
              fullWidth
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Message"
              name="message"
              value={emailParams.message}
              onChange={handleEmailChange}
              fullWidth
              variant="outlined"
              margin="normal"
              multiline
              rows={4}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel id="select-forms-label">Select Forms</InputLabel>
              <Select
                labelId="select-forms-label"
                multiple
                value={emailParams.filenames}
                onChange={(e) =>
                  setEmailParams({ ...emailParams, filenames: e.target.value })
                }
                input={<OutlinedInput label="Select Forms" />}
                renderValue={(selected) => selected.join(", ")}
              >
                {availableForms.map((form) => (
                  <MenuItem key={form} value={form}>
                    <Checkbox
                      checked={emailParams.filenames.indexOf(form) > -1}
                    />
                    <ListItemText primary={form} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="User"
              name="user"
              value={emailParams.user}
              onChange={handleEmailChange}
              fullWidth
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Password"
              name="password"
              type="password"
              value={emailParams.password}
              onChange={handleEmailChange}
              fullWidth
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              onClick={handleSendEmail}
              variant="contained"
              color="primary"
            >
              Send Email
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default connect()(FileMedia);
