import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
  Typography,
  FormLabel,
  Divider,
  Box
} from "@mui/material"
import React from "react"

export default function RadioButtonGroup({
  label,
  required,
  data = [],
  defaultValue,
  state,
  direction = "column",
  labelColor = false,
  field,
  error = null,
  labelComponent,
  borderBottom = false,
  row = true,
  ...props
}) {
  const handleChange = (event) => {
    state.saveValue(event.target.value)
  }

  return (
    <FormControl>
      <FormLabel sx={{ color: "surface2.main" }}>
        {label}
        {required && (
          <Typography variant="small" color="error">
            *
          </Typography>
        )}
      </FormLabel>

      <RadioGroup
        row={row}
        defaultValue={defaultValue}
        {...(field ? field : { onChange: handleChange })}
      >
        {data?.map((item) => (
          <FormControlLabel
            key={item.value}
            value={item.value}
            control={<Radio />}
            label={item.label}
          // sx={{ color: item.value == field?.value ? "primary.main" : "" }}
          />
        ))}
      </RadioGroup>
      {borderBottom ? <Divider /> : null}
      {error && <FormHelperText error>{error}</FormHelperText>}
    </FormControl>
  )
}

export function GenericRadioButton({
  data = [],
  field,
  showErrorMessage = true,
  error
}) {


  return (
    <Box>
      <RadioGroup
        {...field}
        row
        sx={{ flexWrap: "nowrap" }}
      >
        {data?.map((item) => (
          <FormControlLabel
            key={item.value}
            value={item.value}
            control={<Radio size="small" sx={error && {
              color: 'red',
              '&.Mui-checked': {
                color: 'red',
              },
            }} />}
            label={item.label}
            sx={{ color: item.value == field?.value ? "primary.main" : "" }}
          />
        ))}
      </RadioGroup>
      {error && showErrorMessage && <FormHelperText error>{error}</FormHelperText>}
    </Box>
  )
}