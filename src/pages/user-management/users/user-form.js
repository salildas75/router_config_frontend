import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import CustomInput from "../../../components/custom-input";
import {
  Box,
  Button,
  Input,
  InputLabel,
  Stack,
  Typography,
} from "@mui/material";
import {
  getApiCallDynamic,
  postApiCallDynamicWithOutReturn,
} from "../../../services/api-service";
import { API } from "../../../services/api-config";
import { ValidationConstant } from "../../../constants/validation";
import RadioButtonGroup from "../../../helpers/dropdown/radio-button-group";
import { ACTION_TYPE, ROLE_LIST } from "../../../constants/constant";
import { toastNotify } from "../../../helpers/alert-msg";
import CustomDropDown from "../../../components/custom-dropdown";

function UserForm({ isEdit, userData, handleModalClose, setTableRerender }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      fullName: userData?.name,
      employeeId: userData.employeeId,
      mobile: userData?.mobile,
      email: userData?.email,
      activeStatus: userData?.activeStatus?.toString(),
      userTypeAction: userData?.userTypeAction,
      role: userData?.userType,
      divisionId: userData?.divisionId,
      departmentId: userData?.departmentId,
      zoneId: userData?.zoneId,
    },
  });

  const UserValidation = {
    fullName: {
      required: { value: true, message: "Enter full name" },
    },
    employeeId: {
      required: { value: true, message: "Enter employee id" },
    },
    mobile: {
      required: { value: true, message: "Enter mobile" },
      pattern: {
        value: ValidationConstant.bdPhoneNumber,
        message: "Enter valid phone",
      },
    },
    email: {
      required: { value: true, message: "Enter email" },
      pattern: {
        value: ValidationConstant.emailRegx,
        message: "Enter valid email",
      },
    },
    activeStatus: {
      required: { value: true, message: "Enter active Status" },
    },
    userTypeAction: {
      required: { value: true, message: "Enter user type" },
    },
    role: {
      required: { value: true, message: "Enter role" },
    },
    divisionId: {
      required: { value: true, message: "Enter division" },
    },
    departmentId: {
      required: { value: true, message: "Enter department" },
    },
    zoneId: {
      required: { value: true, message: "Enter zone" },
    },
  };

  const [zoneOption, setZoneOption] = useState([]);
  const [roleOption, setRoleOption] = useState([]);
  const [divisionOption, setDivisionOption] = useState([]);
  const [departmentOption, setDepartmentOption] = useState([]);

  //api department
  const departmentList = async (item) => {
    try {
      const res = await getApiCallDynamic({
        param: { parentId: item, type: "DEPARTMENT", activeStatus: true },
        path: API.division,
      });
      if (res?.status === 200) {
        setDepartmentOption(res?.data?.dataList);
      }
    } catch (error) {
      console.error("Error fetching:", error);
    }
  };

  //api division
  const divisionList = async () => {
    try {
      const res = await getApiCallDynamic({
        param: { parentId: 0, type: "DIVISION", activeStatus: true },
        path: API.division,
      });
      if (res?.status === 200) {
        setDivisionOption(res?.data?.dataList);
      }
    } catch (error) {
      console.error("Error fetching :", error);
    }
  };
  // api role
  const roleList = async () => {
    try {
      const res = await getApiCallDynamic({
        path: API.roles,
      });
      if (res?.status === 200) {
        setRoleOption(res?.data?.dataList);
      }
    } catch (error) {
      console.error("Error fetching:", error);
    }
  };
  // api zone
  const zoneList = async (departmentId) => {
    try {
      const res = await getApiCallDynamic({
        param: { departmentId: departmentId, activeStatus: true },
        path: API.zone,
      });
      if (res?.status === 200) {
        setZoneOption(res?.data?.dataList);
      }
    } catch (error) {
      console.error("Error fetching:", error);
    }
  };

  const divisionIdWatch = watch("divisionId");
  const departmentIdWatch = watch("departmentId");
  const userTypeActionWatch = watch("userTypeAction");

  useEffect(() => {
    roleList();
    divisionList();
    if (departmentIdWatch) {
      zoneList(departmentIdWatch);
    }
    if (divisionIdWatch) {
      departmentList(divisionIdWatch);
    }
    // if (!isEdit) {
    //     if (divisionIdWatch) {
    //         if (departmentIdWatch) {
    //             zoneList(departmentIdWatch)
    //         } else {
    //             departmentList(divisionIdWatch)
    //         }
    //     } else {
    //         roleList()
    //         divisionList()
    //     }
    // } else {
    //     roleList()
    //     divisionList()
    //     zoneList(departmentIdWatch)
    //     departmentList(divisionIdWatch)
    // }
  }, [divisionIdWatch, departmentIdWatch]);

  const [signature, setSignature] = useState(null);

  // Function to handle file upload
  const handleSignatureChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "image/png") {
      setSignature(file);
    } else {
      toastNotify("error", "Invalid file type. Please select a PNG file.");
    }
  };

  const handleSubmitUser = async (data) => {
    if (userTypeActionWatch == "Ordinary") {
      data = {
        ...data,
        divisionId: null,
        departmentId: null,
        zoneId: null,
      };
    } else if (userTypeActionWatch == "Divisional") {
      data = {
        ...data,
        departmentId: null,
        zoneId: null,
      };
    } else if (userTypeActionWatch == "Departmental") {
      data = {
        ...data,
        zoneId: null,
      };
    }

    const apiCallData = {
      ...data,
      id: userData?.id,
      userType: data?.role,
      //TODO
      password: "User@123",
    };

    const formData = new FormData();
    const blob = new Blob([JSON.stringify(apiCallData)], {
      type: "application/json",
    });
    formData.append("userInfo", blob);
    // Append signature file
    formData.append("file", signature);

    await postApiCallDynamicWithOutReturn({
      data: formData,
      refresh: (res) => {
        return setTableRerender((prev) => !prev);
      },
      path: API.addPortalUser,
      header: isEdit ? ACTION_TYPE.update : ACTION_TYPE.create,
    });

    handleModalClose();
  };
  return (
    <form onSubmit={handleSubmit(handleSubmitUser)}>
      <Controller
        name="fullName"
        control={control}
        rules={UserValidation.fullName}
        render={({ field }) => (
          <CustomInput
            {...field}
            label="Full Name"
            required
            placeholder={"Enter full name"}
            error={errors?.fullName?.message}
          />
        )}
      />
      <Controller
        name="employeeId"
        control={control}
        rules={UserValidation.employeeId}
        render={({ field }) => (
          <CustomInput
            {...field}
            label="Employee Id"
            required
            placeholder={"Enter employee id"}
            error={errors?.employeeId?.message}
          />
        )}
      />
      <Controller
        name="mobile"
        control={control}
        rules={UserValidation.mobile}
        render={({ field }) => (
          <CustomInput
            {...field}
            label="Phone"
            type={"number"}
            required
            placeholder={"Enter phone"}
            error={errors?.mobile?.message}
          />
        )}
      />
      <Controller
        name="email"
        control={control}
        rules={UserValidation.email}
        render={({ field }) => (
          <CustomInput
            {...field}
            label="Email"
            disabled={isEdit}
            required
            placeholder={"Enter email address"}
            error={errors?.email?.message}
          />
        )}
      />
      {/* Signature upload field */}
      <Box display={"flex"} gap={1} mb={1}>
        <InputLabel>Signature: </InputLabel>
        <Input
          type="file"
          onChange={handleSignatureChange}
          accept="image/png" // Set accepted file types
        />
        {userData?.signature && (
          <Typography>{`${userData?.signature}`}</Typography>
        )}
      </Box>
      <Controller
        name="activeStatus"
        control={control}
        rules={UserValidation.activeStatus}
        render={({ field }) => (
          <RadioButtonGroup
            field={field}
            required
            direction={"row"}
            // defaultValue={false}
            data={[
              { value: true, label: "Active" },
              { value: false, label: "Inactive" },
            ]}
            label={"Active Status"}
            error={errors?.activeStatus?.message}
          />
        )}
      />
      <Controller
        name="userTypeAction"
        control={control}
        rules={UserValidation.userTypeAction}
        render={({ field }) => (
          <RadioButtonGroup
            field={field}
            label={"User Type"}
            required
            direction={"row"}
            data={[
              { value: "Ordinary", label: "Ordinary" },
              { value: "Divisional", label: "Divisional" },
              { value: "Departmental", label: "Departmental" },
              { value: "Zonal", label: "Zonal" },
            ]}
            error={errors?.userTypeAction?.message}
          />
        )}
      />
      <Stack direction={{ md: "row", xs: "column" }} gap={1}>
        <Controller
          name="role"
          control={control}
          rules={UserValidation.role}
          render={({ field }) => (
            <CustomDropDown
              field={field}
              label={"Role"}
              minWidth={{ md: "50%", xs: "100%" }}
              required
              // TODO
              option={roleOption
                ?.filter(
                  (item) =>
                    item.roleName !== ROLE_LIST?.customer &&
                    item.roleName !== ROLE_LIST?.admin
                )
                ?.map((item) => {
                  return {
                    value: item?.roleName,
                    label: item?.roleName,
                  };
                })}
              error={errors?.role?.message}
            />
          )}
        />
        {(userTypeActionWatch == "Divisional" ||
          userTypeActionWatch == "Departmental" ||
          userTypeActionWatch == "Zonal") && (
          <Controller
            name="divisionId"
            control={control}
            rules={UserValidation.divisionId}
            render={({ field }) => (
              <CustomDropDown
                field={field}
                label={"Division"}
                minWidth={{ md: "50%", xs: "100%" }}
                required
                option={divisionOption}
                error={errors?.divisionId?.message}
              />
            )}
          />
        )}
      </Stack>
      <Stack direction={{ md: "row", xs: "column" }} gap={1}>
        {(userTypeActionWatch == "Departmental" ||
          userTypeActionWatch == "Zonal") && (
          <Controller
            name="departmentId"
            control={control}
            rules={UserValidation.departmentId}
            render={({ field }) => (
              <CustomDropDown
                field={field}
                label={"Department"}
                minWidth={{ md: "50%", xs: "100%" }}
                required
                option={departmentOption}
                error={errors?.departmentId?.message}
              />
            )}
          />
        )}
        {userTypeActionWatch == "Zonal" && (
          <Controller
            name="zoneId"
            control={control}
            rules={UserValidation.zoneId}
            render={({ field }) => (
              <CustomDropDown
                field={field}
                label={"Zone"}
                minWidth={{ md: "50%", xs: "100%" }}
                required
                option={zoneOption}
                error={errors?.zoneId?.message}
              />
            )}
          />
        )}
      </Stack>
      <Stack gap={2} direction={"row-reverse"}>
        <Button type="submit" variant="contained">
          {isEdit ? `Update` : `Add`}
        </Button>
      </Stack>
    </form>
  );
}

export default UserForm;
