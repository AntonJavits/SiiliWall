import React from 'react'
import {
    Container, Grid, Button, Typography,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import NewProjectForm from '../project/NewProjectForm'
import ArchiveProjectForm from '../project/ArchiveProjectForm'
import RestoreProjectForm from '../project/RestoreProjectForm'

const LandingPageHeader = ({
    newProjectOpen,
    setNewProjectOpen,
    archiveProjecOpen,
    setArchiveProjecOpen,
    restoreProjectOpen,
    setRestoreProjectOpen,
    handleClickNewProject,
    handleClickArchiveProject,
    handleClickRestoreProject,
}) => {
    const { t } = useTranslation('common')
    return (
        <Container
            maxWidth="xxl"
            direction="row"
            alignItems="top"
            sx={{ pt: [2, 2], pb: [2, 3], borderBottom: '1px solid #d5d5d5' }}
        >
            {newProjectOpen && (
                <NewProjectForm setOpen={setNewProjectOpen} open={newProjectOpen} />
            )}
            {archiveProjecOpen && (
                <ArchiveProjectForm
                    setOpen={setArchiveProjecOpen}
                    open={archiveProjecOpen}
                />
            )}
            {restoreProjectOpen && (
                <RestoreProjectForm
                    setOpen={setRestoreProjectOpen}
                    open={restoreProjectOpen}
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
                    lg={6}
                    order={{ xs: 1, lg: 2 }}
                    alignItems="center"
                    justifyContent="flex-end"
                >
                    <Button
                        onClick={handleClickNewProject}
                        variant="actionButton"
                    >
                        {t('landingPage.addproject')}
                    </Button>
                    <Button
                        onClick={handleClickArchiveProject}
                        variant="actionButton"
                    >
                        {t('landingPage.archiveproject')}
                    </Button>
                    <Button
                        onClick={handleClickRestoreProject}
                        variant="actionButton"
                    >
                        {t('landingPage.restoreproject')}
                    </Button>
                </Grid>

                <Grid
                    xs={12}
                    lg={6}
                    order={{ xs: 2, lg: 1 }}
                    container
                    item
                    justifyContent="flex-start"
                    alignItems="center"
                >
                    <Typography
                        variant="h1"
                        sx={{ mt: { lg: 4 } }}
                    >
                        {t('landingPage.headerTitle')}
                    </Typography>
                </Grid>
            </Grid>

        </Container>
    )
}
export default LandingPageHeader
