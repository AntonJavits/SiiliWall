import React, { useState } from 'react'
import {
    Dialog, DialogActions, DialogContent, DialogContentText,
    DialogTitle, TextField, Button,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import useAddBoard from '../../graphql/board/hooks/useAddBoard'
import useAddShortForm from '../../graphql/board/hooks/useAddShortForm'
import useShortFormsByProjectId from '../../graphql/board/hooks/useShortFormsByProjectId'
import { addNewColumn } from '../../cacheService/cacheUpdates'

const NewBoardForm = ({ setOpen, open, projectId }) => {
    const [addBoard] = useAddBoard(projectId)
    const [addShortForm] = useAddShortForm(projectId)
    const shortFormsByProjectId = useShortFormsByProjectId(projectId)
    const [name, setName] = useState('')
    const [prettyId, setPrettyId] = useState('')
    const [valid, setValid] = useState(true)
    const eventId = window.localStorage.getItem('eventId')
    const { t, i18n } = useTranslation('common')
    const [helperText, setHelperText] = useState(t('newBoardForm.helpertexterror'))

    const handleChangeName = (event) => {
        setName(event.target.value)
    }

    const handleChangePrettyId = (event) => {
        setPrettyId((event.target.value).toUpperCase())
    }

    const handleClose = () => {
        setOpen(false)
    }

    const closeDialog = () => {
        setName('')
        setPrettyId('')
        window.location.reload(false)
        setOpen(false)
    }

    const hasUpperCase = (prettyId) => /[A-Z]/.test(prettyId)

    const validationOfPrettyId = () => {
        setHelperText(t('newBoardForm.helpertexterror'))
        const prettyIds = shortFormsByProjectId.data.ShortFormsByProjectId.map((x) => x.prettyId)
        const exists = prettyIds.some((x) => (x === prettyId))
        if (prettyId.length >= 2 && prettyId.length <= 5 && hasUpperCase(prettyId)) {
            if (!exists) {
                return true
            } else {
                setHelperText(t('newBoardForm.helpertextexists'))
                return false
            }
        } else {
            return false
        }
    }

    const handleSave = () => {
        if (!validationOfPrettyId()) {
            setValid(false)
        } else {
            console.log(eventId)
            addBoard({
                variables: {
                    name,
                    prettyId,
                    eventId,
                    projectId,
                },
            })
            addShortForm({
                variables: {
                    prettyId,
                    projectId,
                },
            })

            closeDialog()
        }
    }

    const handleEventKey = (e) => {
        if (e.key === 'Enter' && name !== '') { handleSave() }
    }

    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">
                    {' '}
                    {t('newBoardForm.newboard')}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {t('newBoardForm.boardcredentials')}
                    </DialogContentText>
                    <TextField
                        variant="standard"
                        required
                        autoFocus
                        margin="dense"
                        name="name"
                        label={t('newBoardForm.name')}
                        type="text"
                        fullWidth
                        onChange={(event) => handleChangeName(event)}
                        id="inputName"
                        onKeyPress={handleEventKey}
                    />
                    {valid
                        ? (
                            <TextField
                                variant="standard"
                                required
                                margin="dense"
                                name="shortForm"
                                label={t('newBoardForm.shortform')}
                                type="text"
                                inputProps={{ style: { textTransform: 'uppercase' } }}
                                fullWidth
                                onChange={(event) => handleChangePrettyId(event)}
                                id="inputShortForm"
                                helperText={helperText}
                                onKeyPress={handleEventKey}
                            />
                        )
                        : (
                            <TextField
                                variant="standard"
                                error
                                margin="dense"
                                name="shortFormError"
                                defaultValue={prettyId}
                                type="text"
                                inputProps={{ style: { textTransform: 'uppercase' } }}
                                fullWidth
                                onChange={(event) => handleChangePrettyId(event)}
                                id="inputShortFormError"
                                helperText={helperText}
                            />
                        )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        {t('newBoardForm.cancel')}
                    </Button>
                    <Button disabled={!name.length || !prettyId.length} onClick={handleSave} color="primary" id="addBoard">
                        {t('newBoardForm.add')}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
export default NewBoardForm
