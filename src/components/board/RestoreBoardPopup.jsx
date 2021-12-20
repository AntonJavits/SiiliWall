import React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import RestoreIcon from '@mui/icons-material/Restore'
import { useTranslation } from 'react-i18next'

import UseArchiveBoardlistByProjectId from '../../graphql/board/hooks/useArchiveBoardlistByProjectId'
import useRestoreBoardById from '../../graphql/board/hooks/UseRestoreBoard'

export default function RestoreBoardPopup({ open, setOpen, projectId }) {
    const archivedBoard = UseArchiveBoardlistByProjectId(projectId)
    const [restoreBoard] = useRestoreBoardById(window.localStorage.getItem('projectId'))
    const eventId = window.localStorage.getItem('eventId')
    const { t, i18n } = useTranslation('common')

    const handleClose = () => {
        setOpen(false)
    }

    console.log(` eventId: ${eventId}, projectId: ${projectId}`)
    const handleBoard = (id) => {
        restoreBoard({
            variables: {
                boardId: id,
                projectId,
                eventId,
            },
        })
    }
    console.log(`eventId: ${eventId}`)

    if (archivedBoard.loading) return null
    const boards = archivedBoard.data.archivedBoards

    let boardsToRestore = boards
    const projectsList = () => {
        boardsToRestore = boards.slice().sort((a, b) => a.orderNumber - b.orderNumber)
        return (
            <div>
                <table>
                    <tbody>
                        {boardsToRestore.map((boards, index) => (
                            <tr key={index}>
                                <td>
                                    {console.log(JSON.stringify(boards.id))}
                                    {boards.name}

                                </td>
                                <td>
                                    <RestoreIcon fontSize="default" style={{ cursor: 'pointer' }} onClick={() => handleBoard(boards.id)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {t('restoreBoardPopup.restoreBoard')}
            </DialogTitle>
            <DialogContent>{projectsList()}</DialogContent>
            <DialogActions>
                <Button color="primary" onClick={handleClose}>
                    {t('restoreBoardPopup.close')}
                </Button>
            </DialogActions>
        </Dialog>
    )
}
