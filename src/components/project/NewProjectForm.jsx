import React, { useState } from 'react'
import {
    Dialog, DialogActions, DialogContent, DialogContentText,
    DialogTitle, TextField, Button,
} from '@mui/material'
import useAddProject from '../../graphql/project/hooks/useAddProject'
import {useTranslation} from "react-i18next"

const NewProjectForm = ({ open, setOpen }) => {
    const [addProject] = useAddProject()
    const [name, setName] = useState('')
    const {t, i18n} = useTranslation('common')
    
    const handleChangeName = (event) => {
        setName(event.target.value)
    }
    const handleClose = () => {
        setOpen(false)
    }
    const closeDialog = () => {
        setName('')
        setOpen(false)
    }
    const handleSave = () => {
        addProject({
            variables: {
                name,
            },
        })
        closeDialog()
    }

    const handleEventKey = (e) => {
        if (e.key === 'Enter' && name !== '') { handleSave() }
    }

    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{t('addproject.newproject')}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                         {t('addproject.namingInstructions')}
                    </DialogContentText>
                    <TextField
                        variant="standard"
                        required
                        autoFocus
                        margin="dense"
                        name="name"
                        label={t('addproject.placeholderName')}
                        type="text"
                        fullWidth
                        onChange={(event) => handleChangeName(event)}
                        id="inputName"
                        onKeyDown={handleEventKey}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        {t('addproject.cancel')}
                    </Button>
                    <Button disabled={!name.length} onClick={handleSave} color="primary" id="addProject">
                        {t('addproject.add')}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
export default NewProjectForm
