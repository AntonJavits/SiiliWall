import React, { useState } from 'react'
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
} from '@mui/material'
import Delete from '@mui/icons-material/DeleteOutlined'
import useAllProjects from '../../graphql/project/hooks/useAllProjects'
import DeleteProjectConfirmation from './DeleteProjectConfirmation'
import useProjectSubscriptions from '../../graphql/subscriptions/useLandingSubscriptions'
import {useTranslation} from "react-i18next"

const ArchiveProjectForm = ({ setOpen, open }) => {
    const [project, setProject] = useState()
    const allProjects = useAllProjects()
    const [popupIsOpen, setPopupIsOpen] = useState(false)
    const [popp, setPopp] = useState(false)
    const {t, i18n} = useTranslation('common')
    const closePopup = () => setPopupIsOpen(false)

    useProjectSubscriptions(window.localStorage.getItem('projectId'), window.localStorage.getItem('eventId'))

    if (allProjects.loading) return null

    const popup = async (project) => {
        setPopp(true)
        setPopupIsOpen(true)
        setProject(project)
    }

    const handleClose = () => {
        setOpen(false)
    }
    const projects = allProjects.data.allProjects
    let projectsToDelete = projects
    const projectsList = (projects) => {
        projectsToDelete = projects.slice().sort((a, b) => a.orderNumber - b.orderNumber)
        return (
            <div>
                <table>
                    <tbody>
                        {projectsToDelete.map((project, index) => (
                            <tr key={index}>
                                <td>
                                    {project.name}
                                    {' '}
                                </td>
                                <td>
                                    <Delete fontSize="default" style={{ cursor: 'pointer' }} onClick={() => popup(project)} />
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
                <DialogTitle id="form-dialog-title">{t('archiveproject.archiveProject')}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {t('archiveproject.selectActive')}
                    </DialogContentText>
                    {projectsList(projectsToDelete)}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">{t('archiveproject.close')}</Button>
                </DialogActions>
            </Dialog>
            {popp === true ? <DeleteProjectConfirmation open={popupIsOpen} handleClose={closePopup} project={project} /> : <div />}
        </div>

    )
}
export default ArchiveProjectForm
