import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import {
  Avatar,
  Badge,
  Box,
  Menu,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
import { drawerWidth } from "../templates/layout/portal-layout";
import {
  ArrowBack,
  NotificationAddOutlined,
  Notifications,
} from "@mui/icons-material";
import BidaLogo from "../assets/images/profile_avt.png";
import { useLocation, useNavigate } from "react-router-dom";
import { API } from "../services/api-config";
import {
  getApiCallDynamic,
  postApiCallDynamic,
  postApiCallDynamicWithOutReturn,
} from "../services/api-service";
import { BIDA_CUSTOMER, ROLE_LIST } from "../constants/constant";

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open" && prop !== "offsetWith",
})(({ theme, open, offsetWith }) => ({
  [theme.breakpoints.up("sm")]: {
    width: `calc(100% - ${theme.spacing(offsetWith)})`,
  },
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

function AppBarMenu({ open = false, handleToggle, mainProps }) {
  const location = useLocation();
  const activeTab =
    location.pathname.split("/")[location.pathname.split("/").length - 1];

  // const getProfileData = () => {
  //   getApiCallDynamic({ path: API.profileInfo }).then((res) => {
  //     if (res?.status === 200) {
  //       setProfileData(res.data);
  //     }
  //   });
  // };
  // useEffect(() => {
  //   getProfileData();
  // }, [window?.location.pathname]);

  return (
    <AppBar
      position="fixed"
      open={open}
      offsetWith={12}
      elevation={0}
      color="surface1"
    >
      <Toolbar
        sx={{
          paddingRight: "0 !important",
          paddingLeft: { xs: "0 !important", md: "auto !importnat" },
        }}
      >
        <Stack
          width={"100%"}
          direction={`row`}
          justifyContent={"space-between"}
          gap={2}
        >
          <Box display={"flex"} alignItems={"center"} gap={{ xs: 0, md: 1 }}>
            <IconButton
              aria-label="Navbar Toggle"
              onClick={handleToggle}
              sx={{ marginLeft: { xs: 0, md: 1 } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              textTransform={"capitalize"}
              variant="h4"
              fontWeight={700}
            >
              {activeTab?.replace(/-/g, " ")}
            </Typography>
          </Box>

          <Box
            display={`flex`}
            direction={`row`}
            alignItems={`center`}
            gap={{ xs: 0.5, md: 3 }}
          >
            {/* if need language support then comment out this code */}
            {/* <Box display={'flex'} direction={'row'} alignItems={'center'}>
                            <Typography>Bn</Typography>
                            <Switch checked={checked} onChange={handleLanguageChange} />
                            <Typography>En</Typography>
                        </Box> */}
            <Typography
              variant={"h5"}
              fontWeight={600}
              color={"accent2.main"}
              textAlign={"right"}
            >
              {/* {"profileData?.orgName"} */}
            </Typography>

            {/* <Stack
              bgcolor={`#002B7C`}
              display={"flex"}
              direction={"row"}
              p={2}
              gap={2}
              alignItems={`center`}
            >
              <Avatar sx={{ display: { xs: "none", md: "flex" } }} />
              <Box display={"flex"} flexDirection={"column"}>
                <Typography variant="body2" color={`white`}>
                  {profileData?.name}
                </Typography>
                <Typography variant="body2" color={`white`}>
                  {profileData?.userType}
                </Typography>
              </Box>
            </Stack> */}
          </Box>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default AppBarMenu;
