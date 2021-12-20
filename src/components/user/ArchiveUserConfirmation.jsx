import React from 'react'
import { useTranslation } from 'react-i18next'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import useArchiveUser from '../../graphql/user/hooks/useArchiveUser'

export default function ArchiveUserConfirmation(props) {
    const { open, handleClose, user } = props
    const [archiveUser] = useArchiveUser()
    const { t, i18n } = useTranslation('common')

    const handleSave = () => {
        archiveUser({
            variables: {
                id: user.id,
                userName: user.userName,
            },
        })
        handleClose()
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {t('deleteUserPopup.doYouWant', { user: props.user.userName })}
                {' '}
            </DialogTitle>
            <DialogContent />
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    {t('deleteUserPopup.disagree')}
                </Button>
                <Button onClick={handleSave} color="primary" autoFocus>
                    {t('deleteUserPopup.agree')}
                </Button>
            </DialogActions>
        </Dialog>
    )
}
