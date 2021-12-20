import React, { useState } from "react";
import { Container, Grid, Button, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { projectPageStyles } from "../styles/styles";
import "../styles.css";
import titleIcon from "../img/siiliLogo.jfif";
import useAllProjects from "../graphql/project/hooks/useAllProjects";
import TopBar from "../components/TopBar";
import LandingPageHeader from "../components/page/LandingPageHeader";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorPage from "./ErrorPage";

const LandingPage = () => {
  const queryResult = useAllProjects();
  const { t } = useTranslation("common");
  const classes = projectPageStyles();
  const [newProjectOpen, setNewProjectOpen] = useState(false);
  const [archiveProjecOpen, setArchiveProjecOpen] = useState(false);
  const [restoreProjectOpen, setRestoreProjectOpen] = useState(false);

  const handleClickNewProject = () => {
    setNewProjectOpen(true);
  };
  const handleClickArchiveProject = () => {
    setArchiveProjecOpen(true);
  };
  const handleClickRestoreProject = () => {
    setRestoreProjectOpen(true);
  };

  if (queryResult.loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20%",
          color: "#FF8E53",
        }}
      >
        <LoadingSpinner />
      </div>
    );
  }

  if (queryResult.error) {
    console.log(queryResult.error);
    return <ErrorPage />;
  }

  const projectsInOrder = queryResult.data.allProjects
    .slice()
    .sort((a, b) => a.orderNumber - b.orderNumber);

  return (
    <>
      <Helmet htmlAttributes>
        <title>Siiliwall</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href={titleIcon} type="image/x-icon" />
      </Helmet>
      <TopBar />
      <LandingPageHeader
        newProjectOpen={newProjectOpen}
        setNewProjectOpen={setNewProjectOpen}
        archiveProjecOpen={archiveProjecOpen}
        setArchiveProjecOpen={setArchiveProjecOpen}
        restoreProjectOpen={restoreProjectOpen}
        setRestoreProjectOpen={setRestoreProjectOpen}
        handleClickNewProject={handleClickNewProject}
        handleClickArchiveProject={handleClickArchiveProject}
        handleClickRestoreProject={handleClickRestoreProject}
      />
      <Container maxWidth="xxl">
        <Grid
          container
          justifyContent="center"
          alignItems="flex-start"
          spacing={{ xs: 3, sm: 5 }}
          sx={{ pt: [2, 5, 9] }}
        >
          <Grid item xs={10} sm={10}>
            <Typography variant="h2">
              {t("landingPage.contentTitle")}
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
            {projectsInOrder.map(({ id, name }) => (
              <Grid item classes={{ root: classes.boardButtonGrid }} key={id}>
                <Button
                  fullWidth
                  variant="navigationButton"
                  component={RouterLink}
                  to={`/projects/${id}`}
                >
                  {name}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
export default LandingPage;
