import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useState } from "react"; // Import useState

export default function CustomDropDown({
  size = "small",
  options = [],
  label,
  required = false,
  field, // Optional for react-hook-form
  error = null,
  fullWidth = true,
  marginBottom = 2,
  marginTop = 1,
  disabled = false,
  onChange, // Optional for standalone usage
}) {
  const [selectedValue, setSelectedValue] = useState(""); // State to manage selected value

  const handleChange = (event) => {
    const newValue = options.find((item) => item.value === event.target.value);
    setSelectedValue(newValue); // Update local state for standalone usage

    if (field) {
      field.onChange(newValue); // Call react-hook-form's onChange if field is provided
    }
    if (onChange) {
      onChange(newValue); // Call the onChange prop if provided
    }
  };

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
      <FormControl
        size={size}
        fullWidth={fullWidth}
        error={error && true}
        disabled={disabled}
      >
        <Select
          value={field ? field.value?.value || "" : selectedValue?.value || ""} // Use local state for standalone
          displayEmpty
          onChange={handleChange}
        >
          <MenuItem value="">{"Select"}</MenuItem>
          {options.map((item, i) => (
            <MenuItem key={i} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
        {error && <FormHelperText error>{error}</FormHelperText>}
      </FormControl>
    </Box>
  );
}
