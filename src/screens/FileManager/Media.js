import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Button,
  Typography,
  IconButton,
  Tooltip,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
  CardActions,
  CardContent,
  Grid,
  Paper,
  Container,
} from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import Slider from "react-slick";
import "./media.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function FileMedia({ isSecuritySystem }) {
  const [directories, setDirectories] = useState([]);
  const [searchType, setSearchType] = useState("");
  const [searchParams, setSearchParams] = useState({
    printed_name: "",
    date_of_birth: "",
    position: "",
    name: "",
    date: "",
  });
  const [searchResults, setSearchResults] = useState([]);
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
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  const handleDelete = (category, filename) => {
    if (!window.confirm(`Are you sure you want to delete ${filename}?`)) {
      return;
    }
    const url = `${process.env.REACT_APP_API_URL}/${category}/${filename}`;
    fetch(url, { method: "DELETE" })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          alert(data.message);
          setDirectories((prev) =>
            prev.map((dir) =>
              dir.category === category
                ? {
                    ...dir,
                    files: dir.files.filter((file) => file !== filename),
                  }
                : dir
            )
          );
        } else if (data.error) {
          alert(data.error);
        }
      })
      .catch((error) => {
        console.error("Error deleting the file:", error);
        alert("Failed to delete the file");
      });
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
      default:
        return;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data && data.applications) {
        // Check and use the `applications` array from the response
        setSearchResults(data.applications);
      } else {
        setSearchResults([]); // Set to an empty array if no applications are found
      }
    } catch (error) {
      console.error("Search failed:", error);
      setSearchResults([]); // Ensure searchResults is reset or set to an empty array on error
      alert("Failed to fetch search results.");
    }
  };
  const inputsToRender = searchType ? searchFields[searchType] : [];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 2 }}>
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
              Anti Harassment Form Search
            </MenuItem>
            <MenuItem value="applications">Applications Search</MenuItem>
            <MenuItem value="cell_phone">
              Cell Phone Policy Records Search
            </MenuItem>
            <MenuItem value="direct_deposits">Direct Deposits Search</MenuItem>
            <MenuItem value="emergency_contacts">
              Emergency Contacts Search
            </MenuItem>
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
                style={{ width: "60%" }}
              />
            </Grid>
          ))}
        </Grid>
        <br></br>
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
                      Name: {result.name}
                      <br />
                      Position: {result.position_applying_for}
                      <br />
                      Date of Birth: {result.date_of_birth}
                    </Typography>
                    <iframe
                      src={result.pdf_url}
                      style={{ width: "100%", height: "500px" }}
                      frameBorder="0"
                    >
                      PDF cannot be displayed
                    </iframe>
                  </CardContent>
                  <CardActions>
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
                  </CardActions>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography
              variant="h6"
              sx={{ width: "100%", mt: 2, textAlign: "center" }}
            >
              No results found or error in fetching data.
            </Typography>
          )}
        </Grid>
      </Paper>
    </Container>
  );
}

export default connect()(FileMedia);
