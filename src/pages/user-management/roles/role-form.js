import { Box, Button, DialogActions, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import CustomInput from '../../../components/custom-input'
import { getApiCallDynamic, postApiCallDynamicWithOutReturn } from '../../../services/api-service'
import { API } from '../../../services/api-config'
import CustomSwitch from '../../../helpers/dropdown/custom-switch'
import { ACTION_TYPE } from '../../../constants/constant'

function RoleForm({ isEdit, roleData, handleModalClose }) {
    const { control, handleSubmit, formState: { errors }, watch } = useForm({
        defaultValues: {
            roleName: roleData?.roleName,
            description: roleData?.description
        }
    })

    const RoleValidation = {
        roleName: {
            required: { value: true, message: "Enter role name" }
        },
        description: {
            required: { value: true, message: "Enter role description" }
        },
    }

    const handleSubmitUser = (data) => {
        const apiCallData = {
            ...data,
            companyName: "titas-admin-company",
            featureList: featureList

        };
        postApiCallDynamicWithOutReturn({
            data: apiCallData,
            refresh: (res) => {
                return res
            },
            path: API.roles,
            header: isEdit ? ACTION_TYPE.update : ACTION_TYPE.create
        })
        handleModalClose()

    }
    const [featureList, setFeatureList] = useState(roleData?.featureList)
    const features = async () => {
        try {
            const res = await getApiCallDynamic({
                path: API.features
            })
            if (res?.status === 200) {
                setFeatureList(res?.data)
            }
        } catch (error) {
            console.error("Error fetching:", error)
        }
    }
    useEffect(() => {
        if (!isEdit)
            features()
    }, [])

    return (
        <form onSubmit={handleSubmit(handleSubmitUser)}>
            <Controller
                name="roleName"
                control={control}
                rules={RoleValidation.roleName}
                render={({ field }) => (
                    <CustomInput
                        {...field}
                        label="Role Name"
                        required
                        placeholder={"Enter role name"}
                        error={errors?.roleName?.message}
                    />
                )}
            />
            <Controller
                name="description"
                control={control}
                rules={RoleValidation.description}
                render={({ field }) => (
                    <CustomInput
                        {...field}
                        label="Role description"
                        required
                        placeholder={"Enter role description"}
                        error={errors?.description?.message}
                    />
                )}
            />
            {featureList?.map((item, i) => (
                <Box key={i} mb={2}>
                    <Typography variant='body1' fontWeight={400}>Permission of {item.featureName}</Typography>
                    {item?.action?.map((childItem, ci) => (
                        <CustomSwitch
                            key={ci}
                            label={childItem}
                            defaultChecked={item.actionChosen.includes(childItem)}
                            changeCallBack={
                                (selected) => {
                                    if (item.actionChosen.includes(childItem)) {
                                        item.actionChosen.splice(
                                            item.actionChosen.indexOf(childItem),
                                            1
                                        );
                                    } else {
                                        item.actionChosen.push(childItem);
                                    }
                                }
                            }
                        // value={ }
                        // onChange={}
                        />
                    ))}

                </Box>
            )
            )}

            {/* <DialogActions sx={{ py: 1, px: 2, mx: -2, mb: -2, mt: 2, backgroundColor: "#002B7C10" }}> */}
            {/* TODO */}
            <Stack gap={2} direction={"row-reverse"} >
                <Button type='submit' variant="contained" >
                    {isEdit ? `Update` : `Add`}
                </Button>
            </Stack>
            {/* </DialogActions> */}
        </form>
    )
}

export default RoleForm