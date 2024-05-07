import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PageHeader from "../../components/PageHeader";
import { Button, Typography, IconButton, Tooltip } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import Slider from "react-slick";
import "./media.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function FileMedia({ isSecuritySystem }) {
  const [directories, setDirectories] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/list-pdfs`)
      .then((response) => response.json())
      .then((data) => {
        if (data.categories) {
          setDirectories(data.categories);
        }
      })
      .catch((error) => console.error("Error fetching PDFs:", error));
  }, []);

  const formatCategoryName = (name) => {
    return name.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/_/g, " ");
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

  return (
    <div
      className="file-media"
      onClick={() => document.body.classList.remove("offcanvas-active")}
    >
      <PageHeader
        HeaderText="File Media"
        Breadcrumb={[
          { name: "File Manager", navigate: "" },
          { name: "File Media", navigate: "" },
        ]}
      />
      {directories.map((dir) => (
        <div key={dir.category} className="category">
          <Typography variant="h5" component="h2" gutterBottom>
            {formatCategoryName(dir.category)}
          </Typography>
          <Slider {...settings}>
            {dir.files.map((file, index) => (
              <div key={index} className="document-card">
                <div className="file-actions">
                  <Tooltip title="View">
                    <IconButton
                      href={`${process.env.REACT_APP_API_URL}/${dir.category}/${file}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Download">
                    <IconButton
                      href={`${process.env.REACT_APP_API_URL}/${dir.category}/${file}`}
                      download
                    >
                      <FileDownloadIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(dir.category, file)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </div>
                <Typography variant="caption" display="block" gutterBottom>
                  {file}
                </Typography>
              </div>
            ))}
          </Slider>
        </div>
      ))}
    </div>
  );
}

export default connect()(FileMedia);
