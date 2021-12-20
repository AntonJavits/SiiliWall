import React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import useArchiveProject from '../../graphql/project/hooks/useArchiveProject'
import useProjectById from '../../graphql/project/hooks/useProjectById'
import { removeProjectFromCache } from '../../cacheService/cacheUpdates'
import allBoardsByProject from '../../graphql/project/hooks/useBoardsByProjectId'
import {useTranslation} from "react-i18next"

export default function DeleteProjectPopup(props) {
    const { open, handleClose, project } = props
    const [deleteProject] = useArchiveProject()
    const queryResult = useProjectById(project.id)
    const eventId = window.localStorage.getItem('eventId')
    const allBoardById = allBoardsByProject(project.id)
    const {t, i18n} = useTranslation('common')
    const handleSave = () => {
        deleteProject({
            variables: {
                projectId: project.id,
                eventId,
            },
        })
        removeProjectFromCache(project.id)
        handleClose()
    }

    if (queryResult.loading || allBoardById.loading) return null

    let index = 0
    queryResult.data.projectById.boards.map(() => {
        index += 1
        return index
    })

    const boards = allBoardById.data.boardsByProjectId

    let count = 0
    const boardTickets = () => {
        boards.map((board) => {
            count += board.ticketCount
            return count
        })
    }
    boardTickets()

    let message
    console.log(queryResult.data.projectById.boards.length )
    if (queryResult.data.projectById === null) {
        message = t('deleteProjectConfirmation.if0Boards')
    } else if (queryResult.data.projectById.boards.length === 1) {
        message = t('deleteProjectConfirmation.if1Boards',{count:count})
    } else {
        message = t('deleteProjectConfirmation.ifMultipleBoards',{index:index, count:count})
    }

    const handleEventKey = (e) => {
        if (e.key === 'Enter') { handleSave() } else if (e.key === 'Enter') { handleClose() }
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            onKeyPress={handleEventKey}
        >
            <DialogTitle id="alert-dialog-title">
                {`${message} ${t('deleteProjectConfirmation.removeConfirmation',{projectname:project.name})}`}
                {' '}
            </DialogTitle>
            <DialogContent />
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    {t('deleteProjectConfirmation.disagree')}
                </Button>
                <Button onClick={handleSave} color="primary" autoFocus>
                    {t('deleteProjectConfirmation.agree')}
                </Button>
            </DialogActions>
        </Dialog>
    )
}
