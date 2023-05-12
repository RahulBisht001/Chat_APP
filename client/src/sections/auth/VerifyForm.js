import React from 'react'
import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import FormProvider from '../../components/hook-form/FormProvider'
import { Button, Stack } from '@mui/material'
import RHFCodes from '../../components/hook-form/RHFCodes'
import { useDispatch, useSelector } from 'react-redux'
import { VerifyEmail } from '../../Redux/Slices/auth'





const VerifyForm = () => {

    const dispatch = useDispatch()
    const { email } = useSelector((state) => state.auth)
    //^ we will get email from store (redux)

    const VerifyCodeSchema = Yup.object().shape({
        code1: Yup.string().required('Code is required'),
        code2: Yup.string().required('Code is required'),
        code3: Yup.string().required('Code is required'),
        code4: Yup.string().required('Code is required'),
        code5: Yup.string().required('Code is required'),
        code6: Yup.string().required('Code is required'),
    })

    const defaultValues = {
        code1: '',
        code2: '',
        code3: '',
        code4: '',
        code5: '',
        code6: '',
    }

    const methods = useForm({
        mode: "onChange",
        resolver: yupResolver(VerifyCodeSchema),
        defaultValues,
    })

    const { handleSubmit, formState: { errors } } = methods

    const onSubmit = async (data) => {
        try {
            //^  _______Successful Submission
            dispatch(VerifyEmail({
                otp: `${data.code1}${data.code2}${data.code3}${data.code4}${data.code5}${data.code6}`,
                email: email
            }))
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={3}>

                    {/* Custom OTP field */}
                    <RHFCodes
                        keyName="code"
                        inputs={["code1", "code2", "code3", "code4", "code5", "code6"]}
                    />

                    <Button
                        fullWidth
                        variant='contained'
                        type='submit'
                        size='large'
                    >
                        Verify OTP
                    </Button>
                </Stack>
            </FormProvider>
        </>
    )
}

export default VerifyForm