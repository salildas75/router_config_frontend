import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { Close } from "@mui/icons-material";

export const CustomDialog = ({
  show,
  size = "sm",
  minHeight,
  title,
  headerContent,
  closeIcon = true,
  handleClose,
  bodyBg,
  body,
  footer,
}) => {
  return (
    <Dialog
      fullWidth
      maxWidth={size}
      open={show}
      aria-labelledby="customized-dialog-title"
      PaperProps={{ sx: { minHeight: `calc(${minHeight} - 64px)` } }}
    >
      <DialogTitle
        bgcolor={"#002B7C10"}
        color={"primary.main"}
        sx={{ padding: 2 }}
      >
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          {title && (
            <Typography variant="h5" fontWeight={600}>
              {title}
            </Typography>
          )}

          {headerContent}

          {closeIcon && (
            <IconButton aria-label="close" onClick={handleClose}>
              <Close />
            </IconButton>
          )}
        </Stack>
      </DialogTitle>
      <Divider />

      <DialogContent sx={{ padding: 2, backgroundColor: bodyBg }}>
        {body}
      </DialogContent>
      {footer ? (
        <DialogActions sx={{ py: 1, px: 2, backgroundColor: "#002B7C10" }}>
          {footer}
        </DialogActions>
      ) : null}
    </Dialog>
  );
};
