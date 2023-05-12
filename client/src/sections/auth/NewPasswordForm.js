import React, { useState } from 'react'
import * as Yup from 'yup'
import { useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import FormProvider from '../../components/hook-form/FormProvider'
import { Alert, Button, IconButton, InputAdornment, Stack } from '@mui/material'
import RHFTextField from '../../components/hook-form/RHFTextField'
import { Eye, EyeSlash } from 'phosphor-react'
import { useDispatch } from 'react-redux'
import { NewPassword } from '../../Redux/Slices/auth'





const NewPasswordForm = () => {

    const dispatch = useDispatch()
    const [queryParameters] = useSearchParams()


    const [showPassword, setShowPassword] = useState(false)

    const NewPasswordSchema = Yup.object().shape({
        password: Yup.string()
            .required("Password is required")
            .min(8, 'Password should be AtLeast 8 Characters Long'),
        passwordConfirm: Yup.string()
            .required("Password is required")
            .oneOf([Yup.ref('password'), null], 'NewPassword and Confirm Password must be the same ')
    })

    const defaultValues = {
        password: '',
        passwordConfirm: ''
    }

    const methods = useForm({
        resolver: yupResolver(NewPasswordSchema),
        defaultValues,
    })

    const { reset, setError, handleSubmit,
        formState: { errors, isSubmitting, isSubmitSuccessful } } = methods


    const onSubmit = async (data) => {
        try {
            //^ Submit to backend
            dispatch(NewPassword({ ...data, token: queryParameters.get('token') }))
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
                        name='password'
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
                        name='passwordConfirm'
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