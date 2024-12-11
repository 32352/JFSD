"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Button,
  Stack,
  AppBar,
  Toolbar,
  Container,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import { differenceInDays, parseISO } from "date-fns";

const initialCertifications = [
  {
    id: 1,
    title: "React Certification",
    issuedBy: "Coursera",
    issuedDate: "2023-01-15",
    expirationDate: "2025-01-15",
    pdfFile: "/assets/react-cert.pdf",
  },
  {
    id: 2,
    title: "Spring Boot Certification",
    issuedBy: "Udemy",
    issuedDate: "2022-10-10",
    expirationDate: "2024-10-10",
    pdfFile: "/assets/spring-cert.pdf",
  },
];

const getCertificateStatus = (expirationDate: string) => {
  const daysToExpire = differenceInDays(parseISO(expirationDate), new Date());
  if (daysToExpire < 0) return { status: "Expired", color: "error.main" };
  if (daysToExpire <= 30) return { status: "Expiring Soon", color: "warning.main" };
  return { status: "Active", color: "success.main" };
};

export default function Views(): React.JSX.Element {
  const [certifications, setCertifications] = React.useState(initialCertifications);
  const [isAdding, setIsAdding] = React.useState(false);
  const [editCert, setEditCert] = React.useState(null);
  const [viewCert, setViewCert] = React.useState(null);
  const [uploadedFile, setUploadedFile] = React.useState(null); // For file upload
  const [snackbar, setSnackbar] = React.useState({ open: false, message: "", severity: "success" });

  const handleAddCertificateClick = () => {
    setIsAdding(true);
    setUploadedFile(null);
  };

  const handleFileDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file.type !== "application/pdf") {
      setSnackbar({ open: true, message: "Only PDF files are allowed.", severity: "error" });
      return;
    }
    setUploadedFile(file);
    setSnackbar({ open: true, message: "File uploaded successfully.", severity: "success" });
  };

  const handleAddCertificateSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const newCertificate = {
      id: certifications.length + 1,
      title: data.get("title"),
      issuedBy: data.get("issuedBy"),
      issuedDate: data.get("issuedDate"),
      expirationDate: data.get("expirationDate"),
      pdfFile: uploadedFile ? URL.createObjectURL(uploadedFile) : "",
    };

    if (new Date(newCertificate.expirationDate) <= new Date(newCertificate.issuedDate)) {
      setSnackbar({
        open: true,
        message: "Expiration date must be after the issued date.",
        severity: "error",
      });
      return;
    }

    setCertifications((prev) => [...prev, newCertificate]);
    setIsAdding(false);
    setSnackbar({ open: true, message: "Certificate added successfully.", severity: "success" });
  };

  const handleCancelAdd = () => {
    setIsAdding(false);
  };

  const handleDelete = (id) => {
    setCertifications((prev) => prev.filter((cert) => cert.id !== id));
    setSnackbar({ open: true, message: "Certificate deleted successfully.", severity: "info" });
  };

  const handleView = (cert) => {
    setViewCert(cert);
  };

  const handleEdit = (cert) => {
    setEditCert(cert);
    setIsAdding(true);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "application/pdf": [] },
    onDrop: handleFileDrop,
  });

  return (
    <Container>
      <AppBar position="sticky" sx={{ marginBottom: 3 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Certifications
          </Typography>
          <Button variant="contained" color="primary" onClick={handleAddCertificateClick}>
            + Add Certificate
          </Button>
        </Toolbar>
      </AppBar>

      <Grid container spacing={3}>
        {certifications.map((cert) => {
          const { status, color } = getCertificateStatus(cert.expirationDate);

          return (
            <Grid item xs={12} sm={6} md={4} key={cert.id}>
              <Card
                sx={{
                  maxWidth: 345,
                  boxShadow: 3,
                  borderRadius: 2,
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: 6,
                  },
                }}
              >
                <CardContent>
                  <Typography variant="h6" component="div" sx={{ fontWeight: "bold", marginBottom: 1 }}>
                    {cert.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Issued By:</strong> {cert.issuedBy}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Issued Date:</strong> {cert.issuedDate}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    <strong>Expiration Date:</strong> {cert.expirationDate}
                  </Typography>
                  <Box
                    sx={{
                      backgroundColor: color,
                      color: "white",
                      textAlign: "center",
                      padding: "4px 8px",
                      borderRadius: "4px",
                      display: "inline-block",
                    }}
                  >
                    {status}
                  </Box>
                  <Stack direction="row" spacing={1} sx={{ marginTop: 2 }}>
                    <Button variant="outlined" size="small" onClick={() => handleView(cert)}>
                      View
                    </Button>
                    <Button variant="outlined" size="small" color="secondary" onClick={() => handleEdit(cert)}>
                      Edit
                    </Button>
                    <Button variant="contained" size="small" color="error" onClick={() => handleDelete(cert.id)}>
                      Delete
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Add/Edit Dialog */}
      {isAdding && (
        <Dialog open={isAdding} onClose={handleCancelAdd}>
          <DialogTitle>{editCert ? "Edit Certificate" : "Add New Certificate"}</DialogTitle>
          <DialogContent>
            <Box
              component="form"
              onSubmit={handleAddCertificateSubmit}
              sx={{
                "& .MuiTextField-root": { marginBottom: 2 },
                display: "flex",
                flexDirection: "column",
              }}
            >
              <TextField
                label="Title"
                name="title"
                fullWidth
                defaultValue={editCert?.title || ""}
                required
              />
              <TextField
                label="Issued By"
                name="issuedBy"
                fullWidth
                defaultValue={editCert?.issuedBy || ""}
                required
              />
              <TextField
                label="Issued Date"
                name="issuedDate"
                type="date"
                InputLabelProps={{ shrink: true }}
                fullWidth
                defaultValue={editCert?.issuedDate || ""}
                required
              />
              <TextField
                label="Expiration Date"
                name="expirationDate"
                type="date"
                InputLabelProps={{ shrink: true }}
                fullWidth
                defaultValue={editCert?.expirationDate || ""}
                required
              />
              <Box
                {...getRootProps()}
                sx={{
                  border: "2px dashed grey",
                  padding: 2,
                  textAlign: "center",
                  marginBottom: 2,
                  cursor: "pointer",
                }}
              >
                <input {...getInputProps()} />
                {uploadedFile ? (
                  <Typography>{uploadedFile.name}</Typography>
                ) : (
                  <Typography>Drag and drop a PDF file here, or click to select one.</Typography>
                )}
              </Box>
              <DialogActions>
                <Button type="submit" variant="contained" color="primary">
                  {editCert ? "Update" : "Add"}
                </Button>
                <Button onClick={handleCancelAdd} variant="outlined" color="secondary">
                  Cancel
                </Button>
              </DialogActions>
            </Box>
          </DialogContent>
        </Dialog>
      )}

      {/* View Dialog */}
      {viewCert && (
        <Dialog open={Boolean(viewCert)} onClose={() => setViewCert(null)}>
          <DialogTitle>Certificate Details</DialogTitle>
          <DialogContent>
            <Typography variant="h6">{viewCert.title}</Typography>
            <Typography variant="body1">Issued By: {viewCert.issuedBy}</Typography>
            <Typography variant="body1">Issued Date: {viewCert.issuedDate}</Typography>
            <Typography variant="body1">Expiration Date: {viewCert.expirationDate}</Typography>
            {viewCert.pdfFile && (
              <Button
                variant="contained"
                color="primary"
                href={viewCert.pdfFile}
                target="_blank"
                sx={{ marginTop: 2 }}
              >
                View PDF
              </Button>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setViewCert(null)}>Close</Button>
          </DialogActions>
        </Dialog>
      )}

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      >
        <Alert onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
