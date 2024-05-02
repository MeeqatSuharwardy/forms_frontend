import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PageHeader from "../../components/PageHeader";
import Button from "@mui/material/Button";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import "./media.css";
import axios from "axios";

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

  const handleDelete = (category, filename) => {
    if (!window.confirm(`Are you sure you want to delete ${filename}?`)) {
      return;
    }

    const url = `${process.env.REACT_APP_API_URL}/delete-pdf/${category}/${filename}`;

    fetch(url, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          alert(data.message);
          // Update the state to remove the deleted item
          setDirectories((prevDirectories) =>
            prevDirectories.map((dir) => {
              if (dir.category === category) {
                return {
                  ...dir,
                  files: dir.files.filter((file) => file !== filename),
                };
              }
              return dir;
            })
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
      <div className="container">
        {directories.map((dir) => (
          <div key={dir.category} className="category">
            <h3 className="category-title">
              {dir.category.replace(/_/g, " ").toUpperCase()}
            </h3>
            <div className="document-scroll">
              {dir.files.map((file, index) => (
                <div key={index} className="document-card">
                  <div className="document-name" data-title={file}>
                    {file}
                  </div>
                  <div className="buttons">
                    <a
                      href={`${process.env.REACT_APP_API_URL}/pdfs/${dir.category}/${file}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<VisibilityIcon />}
                      >
                        View
                      </Button>
                    </a>
                    <a
                      href={`${process.env.REACT_APP_API_URL}/pdfs/${dir.category}/${file}`}
                      download={`${file}`}
                    >
                      <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<FileDownloadIcon />}
                      >
                        Download
                      </Button>
                    </a>
                    <Button
                      variant="contained"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDelete(dir.category, file)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default connect()(FileMedia);
