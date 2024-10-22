import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import CustomReactMaterialTable from "../../../helpers/table/custom-react-material-table";
import { API } from "../../../services/api-config";
import { CustomDialog } from "../../../helpers/modal/modal";
import UserForm from "./user-form";
import { TiconEdit } from "../../../assets/icons/icons";
import { ACTIVE_STATUS, ROLE_LIST } from "../../../constants/constant";
import { getApiCallDynamic } from "../../../services/api-service";
import CustomInput from "../../../components/custom-input";
import CustomDropDown from "../../../components/custom-dropdown";

function Users() {
  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "employeeId",
        header: "Employee Id",
      },
      {
        accessorKey: "mobile",
        header: "Mobile",
      },
      {
        accessorKey: "userType",
        header: "Role",
      },
      {
        accessorKey: "activeStatus",
        header: "Status",
        Cell: ({ row }) => (
          <Typography color={ACTIVE_STATUS[row?.original?.activeStatus]?.color}>
            {ACTIVE_STATUS[row?.original?.activeStatus]?.label}
          </Typography>
        ),
      },
      {
        accessorKey: "action",
        header: "Action",
        Cell: ({ row }) => (
          <IconButton
            onClick={() => {
              handleOpenModal(row.original);
              setIsEdit(true);
            }}
          >
            <TiconEdit size={"small"} />
          </IconButton>
        ),
      },
    ],
    []
  );
  const [roleParam, setRoleParam] = useState({});
  const getSelectedRole = (item) => {
    if (item?.value) {
      setRoleParam({ role: item?.value });
    } else {
      setRoleParam({});
    }
  };

  const [employeeId, setEmployeeId] = useState();
  const [employeeName, setEmployeeName] = useState();
  const [employeeEmail, setEmployeeEmail] = useState();
  const [tableParams, setTableParams] = useState({});
  const handleSubmitSearch = () => {
    setTableParams({
      ...roleParam,
      ...employeeId,
      ...employeeName,
      ...employeeEmail,
    });
  };
  //----------------------------
  const [modalOpen, setModalOpen] = useState(false);
  const [tableRerender, setTableRerender] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [userData, setUserData] = useState({});
  const [dropdownKey, setDropdownKey] = useState(0);

  const handleOpenModal = (item) => {
    setModalOpen(true);
    setUserData(item);
  };
  const handleModalClose = () => {
    setModalOpen(false);
    setIsEdit(false);
  };

  const handleClearSearch = () => {
    setTableParams({});
    setRoleParam({ role: "" });
    setEmployeeId({ employeeId: "" });
    setEmployeeName({ name: "" });
    setEmployeeEmail({ email: "" });
    setDropdownKey((prevKey) => prevKey + 1);
  };

  // api role
  const [roleOption, setRoleOption] = useState([]);
  const roleList = async () => {
    try {
      const res = await getApiCallDynamic({
        path: API.roles,
      });
      if (res?.status === 200) {
        setRoleOption(res?.data);
      }
    } catch (error) {
      console.error("Error fetching:", error);
    }
  };

  useEffect(() => {
    roleList();
  }, []);

  return (
    <Box
      bgcolor={"white"}
      borderRadius={2}
      p={{ xs: 1, md: 2 }}
      minHeight={"100%"}
    >
      <Button
        variant="contained"
        size="small"
        style={{ marginBottom: "8px" }}
        onClick={handleOpenModal}
      >
        {`Add More`}
      </Button>
      {/* <Stack
        direction={{ xs: "column", md: "row" }}
        gap={2}
        alignItems={{ xs: "", md: "end" }}
        mb={2}
      >
        <CustomDropDown
          key={dropdownKey}
          label={"User Role"}
          changeCallBack={getSelectedRole}
          // TODO
          option={roleOption
            ?.filter(
              (item) =>
                item.roleName !== ROLE_LIST?.customer &&
                item.roleName !== ROLE_LIST?.admin
            )
            ?.map((item) => {
              return {
                id: item?.roleName,
                value: item?.roleName,
                label: item?.roleName,
              };
            })}
          defaultValue={roleParam?.role}
          marginBottom={0}
        />
        <CustomInput
          label="Employee Name"
          placeholder={"Enter employee name"}
          value={employeeName?.name}
          change={{
            onChange: (event) => {
              setEmployeeName({ name: event.target.value });
            },
          }}
          marginBottom={0}
        />
        <CustomInput
          label="Employee Id"
          placeholder={"Enter employee id"}
          value={employeeId?.employeeId}
          change={{
            onChange: (event) => {
              setEmployeeId({ employeeId: event.target.value });
            },
          }}
          marginBottom={0}
        />
        <CustomInput
          label="Employee Email"
          placeholder={"Enter employee email"}
          value={employeeEmail?.email}
          change={{
            onChange: (event) => {
              setEmployeeEmail({ email: event.target.value });
            },
          }}
          marginBottom={0}
        />
        <Button
          onClick={handleSubmitSearch}
          variant="outlined"
          color={"warning"}
          sx={{ color: "warning.main" }}
        >
          {`Search`}
        </Button>
        <Button
          variant="text"
          color={"error"}
          // size='small'
          sx={{ color: "error.main" }}
          onClick={handleClearSearch}
        >
          {`Clear Search`}
        </Button>
      </Stack> */}
      <CustomReactMaterialTable
        enableTopToolbar={false}
        // staticLoad={true}
        enablePagination={false}
        columns={columns}
        endPoint={API.systemAllUser}
        params={tableParams}
        refetch={tableRerender}
      />

      <CustomDialog
        show={modalOpen}
        handleClose={handleModalClose}
        title={isEdit ? `Update User` : `Add User`}
        // size={'500px'}
        closeIcon={true}
        body={
          <UserForm
            isEdit={isEdit}
            userData={userData}
            handleModalClose={handleModalClose}
            setTableRerender={setTableRerender}
          />
        }
      />
    </Box>
  );
}

export default Users;
