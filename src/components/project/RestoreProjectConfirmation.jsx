import React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import useProjectById from '../../graphql/project/hooks/useProjectById'
import useRestoreProjectById from '../../graphql/project/hooks/useRestoreProjectById'
import allBoardsByProject from '../../graphql/project/hooks/useBoardsByProjectId'

// Trying to check the pop up while restoring the project
export default function DeleteProjectPopup(props) {
    const { open, handleClose, project } = props
    const [restoreProject] = useRestoreProjectById()
    const queryResult = useProjectById(project.id)
    const eventId = window.localStorage.getItem('eventId')
    const allBoardById = allBoardsByProject(project.id)
    const handleRestore = (id) => {
        console.log(`projectId: ${id}, eventId: ${eventId}`)
        restoreProject({
            variables: {
                projectId: id,
                eventId,
            },
        })
    }

    if (queryResult.loading || allBoardById.loading) return null

    const handleEventKey = (e) => {
        if (e.key === 'Enter') { handleRestore() } else if (e.key === 'Enter') { handleClose() }
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
                {`$Do you want to restore ${project.name}?`}
                {' '}
            </DialogTitle>
            <DialogContent />
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Disagree
                </Button>
                <Button onClick={handleRestore} color="primary" autoFocus>
                    Agree
                </Button>
            </DialogActions>
        </Dialog>
    )
}
