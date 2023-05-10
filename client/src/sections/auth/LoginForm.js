import React, { useState } from 'react'
import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import FormProvider from '../../components/hook-form/FormProvider'
import { Alert, Button, IconButton, InputAdornment, Link, Stack } from '@mui/material'
import RHFTextField from '../../components/hook-form/RHFTextField'
import { Eye, EyeSlash } from 'phosphor-react'
import { Link as RouterLink } from 'react-router-dom'
import { loginUser } from '../../Redux/Slices/auth'


import { useDispatch } from 'react-redux'



const LoginForm = () => {

    const dispatch = useDispatch()
    const [showPassword, setShowPassword] = useState(false)

    const LoginSchema = Yup.object().shape({
        email: Yup.string().required("Email is Required").email("Email is not a valid email Address"),
        password: Yup.string().required("Password is required").min(8, 'Password should be AtLeast 8 Characters Long')
    })

    const defaultValues = {
        email: 'demo.hike@gmail.com',
        password: 'demo@123#$RS'
    }

    const methods = useForm({
        resolver: yupResolver(LoginSchema),
        defaultValues
    })

    const { reset, setError, handleSubmit,
        formState: { errors, isSubmitting, isSubmitSuccessful } } = methods


    const onSubmit = async (data) => {
        try {
            // Submission Successful
            //^ this data is basically form data
            dispatch(loginUser(data))
            console.log("LoginData " + data)

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
                <Stack spacing={3}>
                    {!!errors.afterSubmit && <Alert severity='error'>{errors.afterSubmit.message}</Alert>}

                    <RHFTextField name='email' label='Email Address' />
                    <RHFTextField
                        name='password'
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
                        }}
                    />
                </Stack>
                <Stack alignItems={'flex-end'} sx={{ my: 2 }}>
                    <Link
                        component={RouterLink}
                        to='/auth/reset-password'
                        variant='body2'
                        color={'inherit'}
                        underline='always'
                        sx={{ cursor: 'pointer' }}

                    >
                        Forgot Password ?
                    </Link>
                </Stack>
                <Button
                    fullWidth
                    variant='contained'
                    type='submit'
                    size='large'
                >
                    Login
                </Button>
            </FormProvider >
        </>
    )
}

export default LoginForm