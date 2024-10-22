import { Stack, Typography } from "@mui/material";
import React from "react";
import {
  APPLICATION_STATUS,
  APPROVAL_STATUS,
  PAYMENT_STATUS,
} from "../constants/constant";

// Status formatter function
export function statusFormatter(value) {
  const combinedStatuses = {
    ...APPLICATION_STATUS,
    ...APPROVAL_STATUS,
    ...PAYMENT_STATUS,
  };
  for (const key in combinedStatuses) {
    if (combinedStatuses[key].value === value) {
      return combinedStatuses[key].label;
    }
  }
  return "Unknown Status";
}

export default function CustomStatus({ status }) {
  return (
    <Stack direction={"row"}>
      <Typography
        py={0.5}
        px={1}
        bgcolor={
          { ...APPLICATION_STATUS, ...APPROVAL_STATUS, ...PAYMENT_STATUS }[
            status
          ]?.color || "black"
        }
        borderRadius={"3px"}
        color={"white"}
        variant="body1"
      >
        {{ ...APPLICATION_STATUS, ...APPROVAL_STATUS, ...PAYMENT_STATUS }[
          status
        ]?.label || status}
      </Typography>
    </Stack>
  );
}
