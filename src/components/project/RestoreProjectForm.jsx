import React from 'react'
import {
    Dialog,
    DialogTitle,
    DialogContentText,
    DialogContent,
    DialogActions,
    Button,
} from '@mui/material'
import RestoreIcon from '@mui/icons-material/Restore'
import useArchivedProjects from '../../graphql/project/hooks/useArchivedProjects'
import { projectPageStyles } from '../../styles/styles'
import '../../styles.css'
import useRestoreProjectById from '../../graphql/project/hooks/useRestoreProjectById'
import {useTranslation} from "react-i18next"

const RestoreProjectForm = ({ open, setOpen }) => {
    const classes = projectPageStyles()
    const archivedProjectsQueryResult = useArchivedProjects()
    const eventId = window.localStorage.getItem('eventId')
    const [restoreProject] = useRestoreProjectById()
    const {t, i18n} = useTranslation('common')
    const handleClose = () => {
        setOpen(false)
    }

    if (archivedProjectsQueryResult.loading) return null

    const { archivedProjects } = archivedProjectsQueryResult.data

    const handleRestore = (id) => {
        console.log(`projectId: ${id}, eventId: ${eventId}`)
        restoreProject({
            variables: {
                projectId: id,
                eventId,
            },
        })
    }

    const projects = archivedProjectsQueryResult.data.archivedProjects
    let projectsToRestore = projects
    const projectsList = (projects) => {
        projectsToRestore = projects.slice().sort((a, b) => a.orderNumber - b.orderNumber)
        return (
            <div>
                <table>
                    <tbody>
                        {projectsToRestore.map((project, index) => (
                            <tr key={index}>
                                <td>
                                    {project.name}
                                    {' '}
                                </td>
                                <td>
                                    <RestoreIcon fontSize="default" style={{ cursor: 'pointer' }} onClick={() => handleRestore(project.id)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">{t('restoreproject.restoreProject')}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{t('restoreproject.selectActive')}</DialogContentText>
                    {projectsList(projectsToRestore)}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">{t('restoreproject.close')}</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
export default RestoreProjectForm
