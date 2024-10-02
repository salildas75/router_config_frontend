import { createTheme } from "@mui/material";

let theme = createTheme({
  palette: {
    accent1: {
      main: "#13007C",
    },

    accent2: {
      main: "#697C00",
    },

    accent3: {
      main: "#F7B84B",
    },

    accent4: {
      main: "#002B7C",
    },

    accent5: {
      main: "#8BD7DF",
    },

    // primary: {
    //   main: "#FFFFFF",
    // },

    // secondary: {
    //   main: "#000435",
    // },

    surface1: {
      main: "#FFFFFF",
    },

    surface2: {
      main: "#0E0D0D",
    },

    success: {
      main: "#38C976",
    },

    warning: {
      main: "#FFA23A",
    },

    info: {
      main: "#3EAEFF",
    },

    error: {
      main: "#FE5050",
    },
    disable: {
      main: "#D9E2E6",
    },
  },

  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          "&:hover": {
            cursor: "pointer",
          },
        },
      },
    },
    MuiButton: {
      defaultProps: {
        color: "success",
      },
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.variant === "contained" && {
            color: "#fff",
          }),
          ...(ownerState.color === "accent5" && {
            color: "#000",
          }),
          fontWeight: "bold",
        }),
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "black",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.variant = "outlined" &&
            ownerState.disabled && {
              backgroundColor: "#F2F2F2",
            }),
        }),
      },
    },
  },

  typography: {
    h1: {
      fontSize: "48px",
      fontWeight: 700,
      color: "#0A6847",
    },
    h2: {
      fontSize: "39px",
      fontWeight: 700,
      color: "#0A6847",
    },
    h3: {
      fontSize: "31px",
      fontWeight: 700,
      color: "#0A6847",
    },
    h4: {
      fontSize: "25px",
      fontWeight: 500,
      color: "#0A6847",
    },
    h5: {
      fontSize: "20px",
      fontWeight: 500,
      color: "#0A6847",
    },
    h6: {
      fontSize: "16px",
      fontWeight: 500,
      color: "#0A6847",
    },
    body1: {
      fontSize: "16px",
      fontWeight: 300,
    },
    body2: {
      fontSize: "14px",
      fontWeight: 300,
    },
    caption: {
      fontSize: "12px",
      fontWeight: 300,
    },
    overline: {
      fontSize: "10px",
      fontWeight: 300,
      lineHeight: "12px",
    },
  },
});

theme = {
  ...theme,
  typography: {
    ...theme.typography,
    h1: {
      ...theme.typography.h1,
      [theme.breakpoints.between("sm", "md")]: {
        fontSize: "36px",
      },
      [theme.breakpoints.between("xs", "sm")]: {
        fontSize: "28px",
      },
    },
    h2: {
      ...theme.typography.h2,
      [theme.breakpoints.between("sm", "md")]: {
        fontSize: "27px",
      },
      [theme.breakpoints.between("xs", "sm")]: {
        fontSize: "22px",
      },
    },
    h3: {
      ...theme.typography.h3,
      [theme.breakpoints.between("sm", "md")]: {
        fontSize: "21px",
      },
      [theme.breakpoints.between("xs", "sm")]: {
        fontSize: "18px",
      },
    },
    h4: {
      ...theme.typography.h4,
      [theme.breakpoints.between("sm", "md")]: {
        fontSize: "18px",
      },
      [theme.breakpoints.between("xs", "sm")]: {
        fontSize: "16px",
      },
    },
    h5: {
      ...theme.typography.h5,
      [theme.breakpoints.between("sm", "md")]: {
        fontSize: "16px",
      },
      [theme.breakpoints.between("xs", "sm")]: {
        fontSize: "15px",
      },
    },
    h6: {
      ...theme.typography.h6,
      [theme.breakpoints.between("sm", "md")]: {
        fontSize: "15px",
      },
      [theme.breakpoints.between("xs", "sm")]: {
        fontSize: "14px",
      },
    },
    body1: {
      ...theme.typography.body1,
      [theme.breakpoints.between("sm", "md")]: {
        fontSize: "15px",
      },
      [theme.breakpoints.between("xs", "sm")]: {
        fontSize: "14px",
      },
    },
    body2: {
      ...theme.typography.body2,
      [theme.breakpoints.between("sm", "md")]: {
        fontSize: "13px",
      },
      [theme.breakpoints.between("xs", "sm")]: {
        fontSize: "12px",
      },
    },
    caption: {
      ...theme.typography.caption,
      [theme.breakpoints.between("sm", "md")]: {
        fontSize: "12px",
      },
      [theme.breakpoints.between("xs", "sm")]: {
        fontSize: "8px",
      },
    },
  },
};

export const customTheme = theme;
