import {
  Checkbox,
  Box,
  FormControlLabel,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import React, { useState } from "react";
import CustomInput from "../../components/custom-input";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import AuthLayout from "../../templates/layout/auth-layout";
import { Auth } from "../../auth/auth";
import { Path } from "../../routes/route-config";
import { toastNotify } from "../../helpers/alert-msg";
import { InputValidation } from "../../constants/validation";
import { Controller, useForm } from "react-hook-form";
// import CustomDropdown from "../../components/custom-dropdown";

function Login(mainProps) {
  const [checked, setChecked] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmitLogin = (data) => {
    let loginData = { ...data, checked: checked };
    console.log(loginData);
    toastNotify("success", "res?.data?.message");
    // signIn(loginData);
  };
  const signIn = (loginData) => {
    Auth.signin(loginData.username, loginData.password).then((response) => {
      mainProps.userHasAuthenticated(response[0], response[1]);

      if (response[0]) {
        // mainProps.navigate(Path.index);
        const { state } = mainProps.location;
        if (state?.initialLocation) {
          mainProps.navigate(state.initialLocation);
        } else {
          mainProps.navigate(Path.index);
        }
      } else {
        if (response[1]?.error?.errorCode) {
          if (response[1].error.errorCode === 2005) {
            alert(response[1].error.errorMessage);
          } else {
            toastNotify("error", response[1].error.errorMessage);
          }
        } else {
          toastNotify("error", "Something went wrong. Please try Again!");
        }
      }
    });
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit(onSubmitLogin)}>
        <Typography variant="h5" align="center" sx={{ marginBottom: 2 }}>
          Login
        </Typography>
        <Box direction="column" justifyContent="center">
          {/* <Controller
            name="dropTest"
            control={control}
            rules={InputValidation.dropTest}
            render={({ field }) => (
              <CustomDropdown
                field={field}
                label="Name"
                options={[
                  { label: "Test Ice", value: "testIce" },
                  { label: "Test Ice 2", value: "testIce2" },
                ]}
                // onChange={handleDropdownChange}
                required
                error={errors?.dropTest?.message}
              />
            )}
          /> */}
          <Controller
            name="username"
            control={control}
            rules={InputValidation.username}
            render={({ field }) => (
              <CustomInput
                field={field}
                label="Username"
                required
                placeholder="Enter username"
                error={errors?.username?.message}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            rules={InputValidation.password}
            render={({ field }) => (
              <CustomInput
                field={field}
                id={"password"}
                label="Password"
                required
                type={showPassword ? "text" : "password"}
                eicon={
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                }
                placeholder="Enter password"
                error={errors?.password?.message}
              />
            )}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={checked}
                onChange={handleChange}
                inputProps={{ "aria-label": "primary checkbox" }}
              />
            }
            label="Keep me logged in"
          />
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
          </Box>
        </Box>
      </form>
    </AuthLayout>
  );
}

export default Login;
