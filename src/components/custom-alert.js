import React, { useState } from "react";
import { Snackbar, Alert } from "@mui/material";

let showAlert = () => {}; // Default dummy function

const AlertComponent = () => {
  const [alert, setAlert] = useState({
    open: false,
    type: "",
    msg: "",
  });

  showAlert = (type, msg) => {
    setAlert({ open: true, type, msg });
  };

  const handleClose = () => {
    setAlert({ ...alert, open: false });
  };

  return (
    <Snackbar
      open={alert.open}
      autoHideDuration={1600}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "left" }} // Position at top-left
    >
      <Alert
        severity={alert.type}
        onClose={handleClose}
        // sx={{ minWidth: "300px", padding: "16px", fontSize: "1.2rem" }} // Adjust size here
      >
        {alert.msg}
      </Alert>
    </Snackbar>
  );
};

// Export the alert function for use in other components
export const CustomAlert = (type, msg) => {
  showAlert(type, msg);
};

export default AlertComponent; // Export the AlertComponent
