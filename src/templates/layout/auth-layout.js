import React from "react";
import { Box, Grid2, Paper, Stack, Typography } from "@mui/material";
import AuthBg from "../../assets/auth_bg.png";
import LogInImage from "../../assets/login_image.png";

export default function AuthLayout({ ...props }) {
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
      <Grid2
        container
        direction={"column"}
        height={"inherit"}
        flexWrap={"nowrap"}
      >
        <Grid2 flexGrow={1} overflow={"auto"} display={"flex"}>
          <Box p={3} margin={"auto"}>
            <Paper elevation={10} square={false}>
              <Box p={3} borderRadius={1.5}>
                <Stack direction={"column"} gap={2} alignItems={"center"}>
                  <img
                    alt="log in"
                    src={LogInImage}
                    height={"115px"}
                    width={"115px"}
                  />
                  <Box align={"center"}>
                    <Typography variant="h4" fontWeight={`600`}>
                      {`ABC `}
                    </Typography>
                  </Box>
                </Stack>

                <Box minWidth={{ xs: "auto", md: "380px" }}>
                  {props.children}
                </Box>
              </Box>
            </Paper>
          </Box>
        </Grid2>
        <Grid2 flexGrow={0}>
          {/* <Typography
            my={3}
            align="center"
            variant="h5"
            fontWeight={`600`}
          >{`Copyright ©2024 Tirzok All Rights & Reserved`}</Typography> */}
        </Grid2>
      </Grid2>
    </Box>
  );
}
