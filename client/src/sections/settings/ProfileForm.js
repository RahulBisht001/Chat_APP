import React, { useCallback } from 'react'
import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import FormProvider from '../../components/hook-form/FormProvider'
import { Alert, Button, IconButton, InputAdornment, Link, Stack } from '@mui/material'
import RHFTextField from '../../components/hook-form/RHFTextField'
import { Eye, EyeSlash } from 'phosphor-react'
import { Link as RouterLink } from 'react-router-dom'
import { object } from 'prop-types'

const ProfileForm = () => {


    const LoginSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        about: Yup.string().required("about is required"),
        avatarUrl: Yup.string().required("Avatar is required").nullable(true)
    })

    const defaultValues = {
        name: '',
        about: "Using Rahul's Chat APP",
    }

    const methods = useForm({
        resolver: yupResolver(LoginSchema),
        defaultValues
    })

    const { reset, setError, setValue, watch, control, handleSubmit,
        formState: { errors, isSubmitting, isSubmitSuccessful } } = methods


    const values = watch()

    const handleDrop = useCallback((acceptedFiles) => {

        const file = acceptedFiles[0]
        const newFile = object.assign(file, {
            file: URL.createObjectURL(file)
        })

        if (file) {
            setValue("avatarUrl", newFile, { shouldValidate: true })
        }
    }, [setValue])




    const onSubmit = async (data) => {
        try {
            // Submission Successful
            console.log(data)
        } catch (error) {
            console.log("Form Error in ProfileForm.js")
            console.log(error)
            // reset()
            // setError('afterSubmit', {
            //     ...error,
            //     message: error.message,
            // })
        }
    }

    return (
        <>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={3}>

                    <Stack
                        spacing={3}
                    >
                        {
                            !!errors.afterSubmit &&
                            <Alert severity='error'>
                                {errors.afterSubmit.message}
                            </Alert>
                        }

                        <RHFTextField
                            name='name'
                            label='Name'
                            helperText={"This name is visible to your contacts"}
                        />
                        <RHFTextField
                            multiline
                            rows={4}
                            maxRows={5}
                            name='about'
                            label="About"
                        />
                    </Stack>

                    <Stack direction={'row'} alignItems={'center'} justifyContent={'end'}>
                        <Button
                            size='medium'
                            type='submit'
                            variant='contained'
                        >
                            Save
                        </Button>
                    </Stack>
                </Stack>
            </FormProvider >
        </>
    )
}

export default ProfileForm