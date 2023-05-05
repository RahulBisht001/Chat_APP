import React from 'react'
import { Button, Dialog, DialogContent, DialogTitle, Slide, Stack } from '@mui/material'

import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form';
import FormProvider from '../../components/hook-form/FormProvider';
import RHFTextField from '../../components/hook-form/RHFTextField';
import RHFAutocomplete from '../../components/hook-form/RHFAutocomplete';



const MEMBERS = [
    "Rahul", "Jyoti", "Ujjwal", "Sati", "Nikku", "Maa", "Papa", "Dadi", "Siya", "Swati"
]


// Todo -> Create a Component for it
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const CreateGroupForm = ({ handleClose }) => {
    const NewGroupSchema = Yup.object().shape({
        title: Yup.string().required("Title is required"),
        members: Yup.array().min(2, "Must have at least 2 members")
    })

    const defaultValues = {
        title: '',
        members: []
    }

    const methods = useForm({
        resolver: yupResolver(NewGroupSchema),
        defaultValues,
    })

    const { reset, watch, setError, handleSubmit,
        formState: { errors, isSubmitting, isSubmitSuccessful, isValid } } = methods


    const onSubmit = async (data) => {
        try {
            // Submission Successful 
            //! API call
        } catch (error) {
            console.log("Form Error in CreateGroup.js")
            console.log(error)
            // reset()
            // setError('afterSubmit', {
            //     ...error,
            //     message: error.message,
            // })
        }
    }

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3} sx={{ mt: 1 }}>
                <RHFTextField name="title" label="Group Name" />
                <RHFAutocomplete
                    name="members"
                    label="Members"
                    multiple
                    freeSolo
                    options={MEMBERS.map((option) => option)}
                    ChipProps={{ size: "medium" }}
                />
                <Stack spacing={2} direction={'row'} alignItems={'center'} justifyContent={'end'}>
                    <Button onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant='contained' type='submit'>
                        Create
                    </Button>
                </Stack>
            </Stack>
        </FormProvider>
    )
}




const CreateGroup = ({ open, handleClose }) => {
    return (
        <>
            <Dialog
                fullWidth
                maxWidth="xs"
                open={open}
                TransitionComponent={Transition}
                keepMounted
                sx={{ p: 4 }}
                onClose={handleClose}
            >
                {/* Title */}
                <DialogTitle sx={{ mb: 2 }}> Create New Group</DialogTitle>

                {/* Content */}
                <DialogContent>
                    {/* Form */}
                    <CreateGroupForm handleClose={handleClose} />
                </DialogContent>
            </Dialog>
        </>
    )
}

export default CreateGroup