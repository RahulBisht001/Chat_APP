import React, { useState } from 'react'
import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import FormProvider from '../../components/hook-form/FormProvider'
import { Alert, Button, IconButton, InputAdornment, Stack } from '@mui/material'
import RHFTextField from '../../components/hook-form/RHFTextField'
import { Eye, EyeSlash } from 'phosphor-react'

const RegisterForm = () => {
    const [showPassword, setShowPassword] = useState(false)

    const RegisterSchema = Yup.object().shape({
        firstname: Yup.string().required("First name is required"),
        lastname: Yup.string().required("Lastname is required"),
        email: Yup.string().required("Email is Required").email("Email is not a valid email Address"),
        password: Yup.string().required("Password is required").min(8, 'Password should be AtLeast 8 Characters Long')
    })

    const defaultValues = {
        firstname: '',
        lastname: '',
        email: 'demo.hike@gmail.com',
        password: 'demo@123#$RS'
    }

    const methods = useForm({
        resolver: yupResolver(RegisterSchema),
        defaultValues
    })

    const { reset, setError, handleSubmit,
        formState: { errors, isSubmitting, isSubmitSuccessful } } = methods


    const onSubmit = async () => {
        try {
            // Submission Successful
        } catch (error) {
            console.log("Form Error in LoginForm.js")
            console.log(error)
            reset()
            setError('afterSubmit', {
                ...error,
                message: error.message,
            })
        }
    }

    return (
        <>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={3} sx={{ my: 2, marginTop: '15px !important' }}>
                    {!!errors.afterSubmit && <Alert severity='error'>{errors.afterSubmit.message}</Alert>}
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <RHFTextField name="FirstName" label="First Name" />
                        <RHFTextField name="LastName" label="Last Name" />
                    </Stack>

                    <RHFTextField name="email" label="Email Address" />
                    <RHFTextField name='password'
                        label='Password'
                        type={showPassword ? 'text' : 'password'}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment>
                                    <IconButton
                                        onClick={() => { setShowPassword(!showPassword) }}
                                    >
                                        {showPassword ? <Eye /> : <EyeSlash />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }} />
                </Stack>
                <Button
                    fullWidth
                    variant='contained'
                    type='submit'
                    size='large'
                // sx={{
                //     bgcolor: "text.primary",
                //     color: (theme) =>
                //         theme.palette.mode === "light" ? "common.white" : "grey.800",
                //     "&:hover": {
                //         bgcolor: "text.primary",
                //         color: (theme) =>
                //             theme.palette.mode === "light" ? "common.white" : "grey.800",
                //     },
                // }}
                >
                    Create Account
                </Button>
            </FormProvider>
        </>
    )
}

export default RegisterForm
