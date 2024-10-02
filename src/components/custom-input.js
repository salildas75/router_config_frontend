import {
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import Error from "@mui/icons-material/Error";

const CustomInput = ({
  label,
  sicon, // prefix Icon
  eicon, // postfixs Icon
  change,
  field,
  placeholder,
  size = "small",
  type = "text",
  error = null,
  disabled = false,
  fullWidth = true,
  required,
  marginBottom = 2,
  marginTop = 1,
  multiline = false,
  maxRows = 3,
  ...props
}) => {
  return (
    <Box mb={marginBottom} mt={marginTop}>
      <InputLabel sx={{ color: "surface2.main", pb: 0.5 }}>
        {label}
        {required && (
          <Typography variant="small" color="error">
            *
          </Typography>
        )}
      </InputLabel>
      <TextField
        {...field}
        helperText={error}
        error={error && true}
        multiline={multiline}
        maxRows={maxRows}
        disabled={disabled}
        type={type}
        size={size}
        fullWidth={fullWidth}
        placeholder={placeholder}
        {...change}
        slotProps={{
          input: {
            startAdornment: sicon && (
              <InputAdornment position="start">{sicon}</InputAdornment>
            ),
            endAdornment:
              error && props?.id !== "password" ? (
                <Error color="error" />
              ) : (
                eicon && (
                  <InputAdornment position="start">{eicon}</InputAdornment>
                )
              ),
          },
        }}
      />
    </Box>
  );
};

export default CustomInput;
