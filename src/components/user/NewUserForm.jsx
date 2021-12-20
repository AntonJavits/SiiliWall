import React, { useState } from 'react'
import {
    Dialog, DialogActions, DialogContent, DialogContentText,
    DialogTitle, TextField, Button,
} from '@mui/material'
import useAddUser from '../../graphql/user/hooks/useAddUser'
import {useTranslation} from "react-i18next";

const NewUserForm = ({ setOpen, open }) => {
    const [addUser] = useAddUser()
    const [name, setName] = useState('')
    const {t, i18n} = useTranslation('common');
    const handleChange = (event) => {
        setName(event.target.value)
    }
    const projectId = window.localStorage.getItem('projectId')

    const handleClose = () => {
        setOpen(false)
    }

    const handleSave = () => {
        addUser({
            variables: {
                userName: name,
                projectId: projectId,
            },
        })
        setName('')
        setOpen(false)
    }

    const handleEventKey = (e) => {
        if(e.key === 'Enter' && name !== '') {handleSave()}
         
     }

    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title"> {t('newUserForm.newuser')}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    {t('newUserForm.usercredentials')}
                    </DialogContentText>
                    <TextField
                        variant="standard"
                        autoComplete="off"
                        autoFocus
                        margin="dense"
                        name="name"
                        label=  {t('newUserForm.name')}
                        type="text"
                        fullWidth
                        onChange={(event) => handleChange(event)}
                        onKeyPress = {handleEventKey}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                    {t('newUserForm.cancel')}
                    </Button>
                    <Button disabled={!name.length} onClick={handleSave} color="primary" id="addUser">
                    {t('newUserForm.add')}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
export default NewUserForm
