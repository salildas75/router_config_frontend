import { Home } from "@mui/icons-material";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import AuthBg from "../../assets/auth_bg.png";
import NotFoundImg from "../../assets/images/not_found_img.png";
import { useNavigate } from "react-router";

function NotFound() {
  const route = useNavigate();
  return (
    <Box
      height={"100vh"}
      overflow={"auto"}
      sx={{
        backgroundImage: `url(${AuthBg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: { xs: "cover", md: "contain" },
        backgroundPosition: "bottom",
      }}
    >
      <Stack
        direction={"column"}
        height={"100%"}
        justifyContent={"space-between"}
      >
        <Box flexGrow={1} overflow={"auto"} display={"flex"}>
          <Box p={3} margin={"auto"}>
            <Paper elevation={3}>
              <Box
                p={3}
                borderRadius={1.5}
                minHeight={"50vh"}
                minWidth={"25vw"}
                display={"flex"}
              >
                <Stack
                  direction={"column"}
                  gap={2}
                  alignItems={"center"}
                  m={"auto"}
                >
                  {/* <img src={NotFoundImg} height={"97px"} width={"250px"} /> */}
                  <Typography
                    pt={2}
                    variant="h1"
                    fontWeight={600}
                    color={`accent4.main`}
                  >{`Oops !`}</Typography>
                  <Typography variant="h5">{`SORRY, PAGE NOT FOUND 😭`}</Typography>
                  <Typography variant="body1">{`The page you are looking for not available!`}</Typography>
                  <Button
                    onClick={() => {
                      route("/");
                    }}
                    variant="contained"
                    startIcon={<Home />}
                    fullWidth
                  >
                    {`Back to portal`}
                  </Button>
                </Stack>
              </Box>
            </Paper>
          </Box>
        </Box>
        <Box>
          <Typography
            my={3}
            align={"center"}
          >{`Copyright ©2024 Tirzok All Rights & Reserved`}</Typography>
        </Box>
      </Stack>
    </Box>
  );
}

export default NotFound;
