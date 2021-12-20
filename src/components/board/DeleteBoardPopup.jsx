import React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { useTranslation } from 'react-i18next'
import useArchiveBoard from '../../graphql/board/hooks/useArchiveBoard'

import { removeBoardFromCache } from '../../cacheService/cacheUpdates'

export default function DeleteBoardPopup(props) {
    const { open, handleClose, board } = props
    const [deleteBoard] = useArchiveBoard(window.localStorage.getItem('projectId'))
    const eventId = window.localStorage.getItem('eventId')
    const { t, i18n } = useTranslation('common')
    const handleSave = async () => {
        await deleteBoard({
            variables: {
                boardId: board.id,
                eventId,
                projectId: window.localStorage.getItem('projectId'),
            },
        })
        removeBoardFromCache(board.id, window.localStorage.getItem('projectId'))
        handleClose()
    }

    let message
    if (board.ticketCount == null) {
        message = t('deleteBoardPopup.noTasks')
    } else if (board.ticketCount === 1) {
        message = t('deleteBoardPopup.oneTask')
    } else {
        message = t('deleteBoardPopup.multipleTasks', { taskCount: board.ticketCount })
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {`${message} ${t('deleteBoardPopup.doYouWant', { board: board.name })}`}
                {' '}
            </DialogTitle>
            <DialogContent />
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    {t('deleteBoardPopup.disagree')}
                </Button>
                <Button onClick={handleSave} color="primary" autoFocus>
                    {t('deleteBoardPopup.agree')}
                </Button>
            </DialogActions>
        </Dialog>
    )
}
