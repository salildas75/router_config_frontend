import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { Stack } from "@mui/system";
import { Outlet } from "react-router";
import Sidemenu from "../../menu/side-menu";
import AppBarMenu from "../../menu/app-bar-menu";
import { Toolbar } from "@mui/material";
import OssLogo from "../../assets/layout_image.png";
import BidaLogo from "../../assets/bida_logo.png";
import { useState } from "react";
import { TitasLogoSVG } from "../../assets/icons/icons";
import { all } from "axios";
import { useRecoilState } from "recoil";
import { profileState } from "../../recoil/atoms";
import { BIDA_CUSTOMER } from "../../constants/constant";
import LogInImage from "../../assets/login_image.png";
export const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: 0,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(12)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer(mainProps) {
  const d = new Date();
  let year = d.getFullYear();

  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };
  let [profileData, setProfileData] = useRecoilState(profileState);
  return (
    <Box display={"flex"} overflow={`hidden`}>
      {/* App bar and top menu bar */}
      <AppBarMenu
        handleToggle={handleToggle}
        open={open}
        drawerWidth={drawerWidth}
        mainProps={mainProps}
      />

      {profileData?.customerType !== BIDA_CUSTOMER && (
        <Drawer variant="permanent" open={open}>
          <Stack
            color={"#FFFFFF"}
            bgcolor={"#365E32"}
            width={"100%"}
            height={"100%"}
            justifyContent={"space-between"}
            sx={{
              overflowY: "auto",
              overflowX: "hidden",
            }}
          >
            <Box>
              <Box
                mx={"auto"}
                mt={open ? 2 : 1}
                width={open ? "35%" : "80%"}
                sx={{
                  transition: "width 150ms ease-in",
                }}
              >
                <img
                  alt="log in"
                  src={LogInImage}
                  height={"80px"}
                  width={"80px"}
                />
                {/* <TitasLogoSVG /> */}
              </Box>
              {/* <Box
                mb={open ? 2 : 1}
                textAlign={"center"}
                height={open ? "auto" : 0}
                overflow={"hidden"}
              >
                <Typography variant="caption" fontWeight={600} component={"p"}>
                  {`Titas Gas`}
                </Typography>
                <Typography variant="caption" fontWeight={600} component={"p"}>
                  {`Transmission & Distribution`}
                </Typography>
                <Typography variant="caption" fontWeight={600} component={"p"}>
                  {`Company Limited`}
                </Typography>
              </Box> */}
              <Divider sx={{ mx: 1 }} color={"white"} />

              {/* Side menu bar  */}
              <Sidemenu open={open} mainProps={mainProps} />
            </Box>
          </Stack>
        </Drawer>
      )}

      <Box
        component="main"
        bgcolor={"#EAEEF2"}
        height={"100vh"}
        sx={{
          display: "flex",
          flexWrap: "nowrap",
          flexDirection: "column",
          flexGrow: 1,
        }}
      >
        <Toolbar />
        <Box
          px={2}
          pt={3}
          flexGrow={1}
          width={{ xs: "100vw", md: "100%" }}
          overflow={"auto"}
          textAlign={"initial"}
        >
          <Outlet />
        </Box>
        <Box textAlign={"center"}>
          <Typography variant="body2" color={"#A5ADB3"} py={0.5}>
            {`Copyright © ${year} Tirzok All Rights & Reserved`}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
