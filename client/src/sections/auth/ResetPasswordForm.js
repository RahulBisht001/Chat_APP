import React from 'react'
import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import FormProvider from '../../components/hook-form/FormProvider'
import { Alert, Button, Stack } from '@mui/material'
import RHFTextField from '../../components/hook-form/RHFTextField'

const ResetPasswordForm = () => {

    const ResetPasswordSchema = Yup.object().shape({
        email: Yup.string().required("Email is Required").email("Email is not a valid email Address"),
    })

    const defaultValues = {
        email: 'demo.hike@gmail.com',
    }

    const methods = useForm({
        resolver: yupResolver(ResetPasswordSchema),
        defaultValues
    })

    const { reset, setError, handleSubmit,
        formState: { errors, isSubmitting, isSubmitSuccessful } } = methods


    const onSubmit = async () => {
        try {
            // Submission Successful
        } catch (error) {
            console.log("Form Error in ResetPasswordForm.js")
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
                    {!!errors.afterSubmit &&
                        <Alert severity='error'>{errors.afterSubmit.message}</Alert>}

                    <RHFTextField name='email' label='Email Address' />
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
                    Send Request
                </Button>
            </FormProvider >
        </>
    )
}

export default ResetPasswordForm