import { Box, Button, IconButton } from "@mui/material"
import React, { useMemo, useState } from "react"
import CustomReactMaterialTable from "../../../helpers/table/custom-react-material-table"
import { API } from "../../../services/api-config"
import { TiconEdit } from "../../../assets/icons/icons"
import { CustomDialog } from "../../../helpers/modal/modal"
import RoleForm from "./role-form"

function Roles() {

  const columns = useMemo(
    () => [
      {
        accessorKey: "roleName",
        header: "Role Name"
      },
      {
        accessorKey: "description",
        header: "Role Description"
      },
      {
        accessorKey: "action",
        header: "Action",
        Cell: ({ row }) => (
          <IconButton
            onClick={() => { handleOpenModal(row.original); setIsEdit(true) }}
          >
            <TiconEdit size={'small'} />
          </IconButton>
        )
      }
    ],
    []
  )

  const [modalOpen, setModalOpen] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [roleData, setRoleData] = useState({})

  const handleOpenModal = (item) => {
    setModalOpen(true)
    setRoleData(item)
  }
  const handleModalClose = () => {
    setModalOpen(false)
    setIsEdit(false)
  }

  return (
    <Box
      bgcolor={"white"}
      borderRadius={2}
      p={{ xs: 1, md: 2 }}
      minHeight={"100%"}
    >
      <Button variant="contained" size="small" style={{ marginBottom: '8px' }} onClick={handleOpenModal}>
        {`Add More`}
      </Button>
      <CustomReactMaterialTable
        enableTopToolbar={false}
        // staticLoad={true}
        columns={columns}
        endPoint={API.roles}
      />
      <CustomDialog
        show={modalOpen}
        handleClose={handleModalClose}
        title={isEdit ? `Update Role` : `Add Role`}
        // size={'500px'}
        closeIcon={true}
        body={
          <RoleForm
            isEdit={isEdit}
            roleData={roleData}
            handleModalClose={handleModalClose}
          />
        }
      />
    </Box>
  )
}

export default Roles
