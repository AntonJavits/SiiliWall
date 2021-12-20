import React, { useEffect, useState } from 'react'
import {
    Grid,
    Button,
    IconButton,
    Menu,
    MenuItem,
    Container,
    Typography,
} from '@mui/material'
import ArrowDropDownCircleOutlinedIcon from '@mui/icons-material/ArrowDropDownCircleOutlined'
import { Link as RouterLink, useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet'
import useProjectById from '../graphql/project/hooks/useProjectById'
import useAllProjects from '../graphql/project/hooks/useAllProjects'
import TopBar from '../components/TopBar'
import LoadingSpinner from '../components/LoadingSpinner'

import { projectPageStyles } from '../styles/styles'
import '../styles.css'
import useProjectSubscriptions from '../graphql/subscriptions/useProjectSubscriptions'

import ProjectPageHeader from '../components/page/ProjectPageHeader'
import ErrorPage from './ErrorPage'

const ProjectPage = ({ id, eventId }) => {
    const [projectToRender, setProjectToRender] = useState(id)
    const queryResult = useProjectById(projectToRender)
    const allProjects = useAllProjects()
    const [openNewBoardForm, setOpenNewBoardForm] = useState(false)
    const [openBoardDialog, setBoardDialogOpen] = useState(false)
    const [openAddUserForm, setUserFormOpen] = useState(false)
    const [openArchiveUserForm, setArchiveUserFormOpen] = useState(false)
    const [openRestoreUserForm, setRestoreUserFormOpen] = useState(false)
    const [openRestoreDialog, setOpenRestoreDialog] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)
    const openProjectMenu = Boolean(anchorEl)

    const classes = projectPageStyles()
    const history = useHistory()
    const { t, i18n } = useTranslation('common')
    console.log('Project History: ', history)

    useEffect(() => {
        const unlisten = history.listen((location) => {
            console.log('history.listen location: ', location.pathname)
            const pathslice = location.pathname.slice(10)
            console.log('projectId from pathname: ', pathslice)

            setProjectToRender(pathslice)

            return unlisten
        })
    }, [])

    const handleClickOpenNewBoardForm = () => {
        setOpenNewBoardForm(true)
    }
    const handleClickOpenBoardDialog = () => {
        setBoardDialogOpen(true)
    }
    const handleClickAddUser = () => {
        setUserFormOpen(true)
    }
    const handleClickArchiveUser = () => {
        setArchiveUserFormOpen(true)
    }

    const handleClickRestoreUser = () => {
        setRestoreUserFormOpen(true)
    }

    const handleClickOpenRestoreDialog = () => {
        setOpenRestoreDialog(true)
    }

    const projects = allProjects.loading ? [] : allProjects.data.allProjects

    const handleProjectMenuClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleProjectMenuItemClick = (index, selectedId) => {
        setProjectToRender(selectedId)
        // window.location.assign(`/projects/${selectedId}`) // Works with history and back-button, but is slow
        history.push(`/projects/${selectedId}`)
        setAnchorEl(null)
    }

    const handleProjectMenuClose = () => {
        setAnchorEl(null)
    }

    window.localStorage.setItem('epic', '')
    window.localStorage.setItem('user', '')

    useProjectSubscriptions(id, eventId)

    if (queryResult.loading) {
        return (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '20%',
                    color: '#FF8E53',
                }}
            >
                <LoadingSpinner />
            </div>
        )
    }

    if (queryResult.error) {
        console.log(queryResult.error)
        return <ErrorPage />
    }

    const boardsInOrder = queryResult.data.projectById.boards
        .slice()
        .sort((a, b) => a.orderNumber - b.orderNumber)
    const projectName = queryResult.data.projectById.name
    const projectId = queryResult.data.projectById.id

    window.localStorage.setItem('projectId', projectId)

    return (
        <>
            <Helmet htmlAttributes>
                <title>
                    Siiliwall -
                    {' '}
                    {projectName}
                </title>
            </Helmet>
            <TopBar />

            <ProjectPageHeader
                openNewBoardForm={openNewBoardForm}
                openBoardDialog={openBoardDialog}
                anchorEl={anchorEl}
                openAddUserForm={openAddUserForm}
                openArchiveUserForm={openArchiveUserForm}
                openRestoreUserForm={openRestoreUserForm}
                openRestoreDialog={openRestoreDialog}
                openProjectMenu={openProjectMenu}
                setOpenNewBoardForm={setOpenNewBoardForm}
                setBoardDialogOpen={setBoardDialogOpen}
                setUserFormOpen={setUserFormOpen}
                setRestoreUserFormOpen={setRestoreUserFormOpen}
                setOpenRestoreDialog={setOpenRestoreDialog}
                setArchiveUserFormOpen={setArchiveUserFormOpen}
                handleClickOpenNewBoardForm={handleClickOpenNewBoardForm}
                handleClickOpenBoardDialog={handleClickOpenBoardDialog}
                handleClickAddUser={handleClickAddUser}
                handleClickArchiveUser={handleClickArchiveUser}
                handleClickRestoreUser={handleClickRestoreUser}
                handleClickOpenRestoreDialog={handleClickOpenRestoreDialog}
                handleProjectMenuClick={handleProjectMenuClick}
                handleProjectMenuItemClick={handleProjectMenuItemClick}
                handleProjectMenuClose={handleProjectMenuClose}
                projectId={projectId}
                projectName={projectName}
                id={id}
                projects={projects}
            />

            <Container
                maxWidth="xxl"
            >
                <Grid
                    container
                    justifyContent="center"
                    alignItems="flex-start"
                    spacing={{ xs: 3, sm: 5 }}
                    sx={{ pt: [2, 5, 9] }}
                >
                    <Grid item xs={10} sm={10}>
                        <Typography variant="h2">
                            {t('projectPage.allBoardsTitle')}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={10}
                        sm={10}
                        container
                        direction="column"
                        alignItems="flex-start"
                        spacing={2}
                    >
                        {boardsInOrder.map(({ id, name }) => (
                            <Grid item classes={{ root: classes.boardButtonGrid }} key={id}>

                                <Button
                                    fullWidth
                                    variant="navigationButton"
                                    component={RouterLink}
                                    to={`/boards/${id}`}
                                >
                                    {name}
                                </Button>

                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}
export default ProjectPage
