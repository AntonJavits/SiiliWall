import React from 'react'
import {
    Grid,
    Button,
    IconButton,
    Menu,
    MenuItem,
    Container,
    Typography,
} from '@mui/material'
import { Link as RouterLink, useHistory } from 'react-router-dom'
import ArrowDropDownCircleOutlinedIcon from '@mui/icons-material/ArrowDropDownCircleOutlined'
import { useTranslation } from 'react-i18next'
import NewBoardForm from '../board/NewBoardForm'
import NewUserForm from '../user/NewUserForm'
import ArchiveUserForm from '../user/ArchiveUserForm'
import RestoreUserForm from '../user/RestoreUserForm'
import BoardForm from '../board/BoardForm'
import RestoreBoardPopup from '../board/RestoreBoardPopup'

const ProjectPageHeader = ({
    openNewBoardForm,
    openBoardDialog,
    openAddUserForm,
    openArchiveUserForm,
    openRestoreUserForm,
    openRestoreDialog,
    openProjectMenu,
    setOpenNewBoardForm,
    setBoardDialogOpen,
    setUserFormOpen,
    setRestoreUserFormOpen,
    setOpenRestoreDialog,
    handleClickOpenNewBoardForm,
    handleClickOpenBoardDialog,
    handleClickAddUser,
    handleClickArchiveUser,
    handleClickRestoreUser,
    handleClickOpenRestoreDialog,
    handleProjectMenuClick,
    handleProjectMenuItemClick,
    handleProjectMenuClose,
    setArchiveUserFormOpen,
    projectName,
    projectId,
    id,
    projects,
    anchorEl,
}) => {
    const { t } = useTranslation('common')
    const history = useHistory()
    return (
        <Container
            maxWidth="xxl"
            container
            justify="flex-start"
            sx={{ pt: [2, 2], pb: [2, 3], borderBottom: '1px solid #d5d5d5' }}
        >
            {openNewBoardForm && <NewBoardForm setOpen={setOpenNewBoardForm} open={openNewBoardForm} projectId={id} />}
            {openBoardDialog && (
                <BoardForm setOpen={setBoardDialogOpen} open={openBoardDialog} />
            )}
            {openRestoreDialog && (
                <RestoreBoardPopup
                    setOpen={setOpenRestoreDialog}
                    open={openRestoreDialog}
                    projectId={id}
                />
            )}

            {openAddUserForm && (
                <NewUserForm setOpen={setUserFormOpen} open={openAddUserForm} />
            )}
            {openArchiveUserForm && (
                <ArchiveUserForm
                    setOpen={setArchiveUserFormOpen}
                    open={openArchiveUserForm}
                    currentProject={projectId}
                />
            )}
            {openRestoreUserForm && (
                <RestoreUserForm
                    setOpen={setRestoreUserFormOpen}
                    open={openRestoreUserForm}
                    currentProject={projectId}
                />
            )}

            <Grid
                container
                item
                spacing={1}
            >
                <Grid
                    item
                    container
                    xs={12}
                    lg={7}
                    order={{ xs: 1, lg: 2 }}
                    alignItems="center"
                    justifyContent="flex-end"
                >
                    <Grid item container xs={12} sm="auto" direction="row" justifyContent="flex-end" alignItems="flex-start" sx={{ mr: [0, 4, 4] }}>
                        <Button
                            onClick={handleClickOpenNewBoardForm}
                            variant="actionButton"
                        >
                            {t('projectPage.addproject')}
                        </Button>
                        <Button
                            onClick={handleClickOpenBoardDialog}
                            variant="actionButton"
                        >
                            {t('projectPage.deleteboard')}
                        </Button>
                        <Button
                            onClick={handleClickOpenRestoreDialog}
                            variant="actionButton"
                        >
                            {t('projectPage.restoreboard')}
                        </Button>
                    </Grid>
                    <Grid item container xs={12} sm="auto" direction="row" justifyContent="flex-end" alignItems="flex-start">
                        <Grid item>
                            <Button
                                onClick={handleClickAddUser}
                                variant="actionButton"
                            >
                                {t('projectPage.adduser')}
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                onClick={handleClickArchiveUser}
                                variant="actionButton"
                            >
                                {t('projectPage.users')}
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                onClick={handleClickRestoreUser}
                                variant="actionButton"
                            >
                                {t('projectPage.restoreUsers')}
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid
                    xs={12}
                    lg={5}
                    order={{ xs: 2, lg: 1 }}
                    container
                    item
                    justifyContent="flex-start"
                    alignItems="center"
                >
                    <Button
                        variant="titleButton"
                        onClick={() => history.push('/')}
                    >
                        {t('projectPage.titleLinkProjects')}
                    </Button>
                    <Typography
                        variant="header-separator"
                    >
                        /
                    </Typography>
                    <Typography
                        variant="h3"
                    >
                        {projectName}
                    </Typography>

                    <IconButton
                        id="lock-button"
                        aria-controls="lock-menu"
                        aria-label="Select project"
                        aria-expanded={openProjectMenu ? 'true' : undefined}
                        onClick={handleProjectMenuClick}
                    >
                        <ArrowDropDownCircleOutlinedIcon />
                    </IconButton>
                    <Menu
                        id="lock-menu"
                        anchorEl={anchorEl}
                        open={openProjectMenu}
                        onClose={handleProjectMenuClose}
                        MenuListProps={{
                            'aria-labelledby': 'lock-button',
                            role: 'listbox',
                        }}
                    >
                        {projects.map((project, index) => (
                            <MenuItem
                                key={project.id}
                                disabled={project.id === projectId}
                                selected={project.id === projectId}
                                onClick={() => handleProjectMenuItemClick(index, project.id)}
                            >
                                {projects[index].name}
                            </MenuItem>
                        ))}
                    </Menu>
                </Grid>
            </Grid>
        </Container>
    )
}
export default ProjectPageHeader
