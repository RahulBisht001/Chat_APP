import React, { useState } from 'react'
import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import FormProvider from '../../components/hook-form/FormProvider'
import { Alert, Button, IconButton, InputAdornment, Link, Stack } from '@mui/material'
import RHFTextField from '../../components/hook-form/RHFTextField'
import { Eye, EyeSlash } from 'phosphor-react'
import { Link as RouterLink } from 'react-router-dom'

const NewPasswordForm = () => {

    const [showPassword, setShowPassword] = useState(false)

    const NewPasswordSchema = Yup.object().shape({
        newPassword: Yup.string()
            .required("Password is required")
            .min(8, 'Password should be AtLeast 8 Characters Long'),
        confirmPassword: Yup.string()
            .required("Password is required")
            .oneOf([Yup.ref('newPassword'), null], 'NewPassword and Confirm Password must be the same ')
    })

    const defaultValues = {
        newPassword: '',
        confirmPassword: ''
    }

    const methods = useForm({
        resolver: yupResolver(NewPasswordSchema),
        defaultValues,
    })

    const { reset, setError, handleSubmit,
        formState: { errors, isSubmitting, isSubmitSuccessful } } = methods


    const onSubmit = async () => {
        try {
            // Submission Successful
        } catch (error) {
            console.log("Form Error in NewPasswordForm.js")
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
                <Stack spacing={3} sx={{ mb: 3 }}>
                    {!!errors.afterSubmit && <Alert severity='error'>{errors.afterSubmit.message}</Alert>}

                    <RHFTextField
                        name='newPassword'
                        label='New Password'
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
                        }}
                    />
                    <RHFTextField
                        name='confirmPassword'
                        label='Confirm Password'
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
                        }}
                    />
                    <Button
                        fullWidth
                        variant='contained'
                        type='submit'
                        size='large'
                    >
                        Submit
                    </Button>
                </Stack>
            </FormProvider >
        </>
    )
}

export default NewPasswordForm