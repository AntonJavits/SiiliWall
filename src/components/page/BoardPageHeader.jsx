import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Button,
  Typography,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import { useHistory } from "react-router-dom";
import ArrowDropDownCircleOutlinedIcon from "@mui/icons-material/ArrowDropDownCircleOutlined";
import RestoreTasks from "../task/RestoreTasks";
import { useTranslation } from "react-i18next";

const BoardPageHeader = ({
  projectName,
  openBoardMenu,
  openProjectMenu,
  handleSwimlaneOpen,
  handleProjectMenuClick,
  handleBoardMenuClick,
  handleProjectClose,
  handleBoardMenuClose,
  handleProjectMenuItemClick,
  handleBoardMenuItemClick,
  swimlaneButtonText,
  projectAnchorEl,
  boardAnchorEl,
  board,
  projectId,
  id,
  projects,
  boardsByProjectId,
  boardsFromProject,
}) => {
  const { t } = useTranslation("common");

  const history = useHistory();
  const [restoreTasksOpen, setRestoreTasksOpen] = useState(false);
  const handleClickRestoreTasks = () => {
    setRestoreTasksOpen(true);
  };
  return (
    <Container
      maxWidth="xxl"
      sx={{ pt: [0.5, 1], pb: [0.6, 0.8], borderBottom: "1px solid #d5d5d5" }}
    >
      <Grid
        item
        container
        xs={12}
        lg={12}
        order={{ xs: 1, lg: 2 }}
        alignItems="center"
        justifyContent="flex-end"
      >
        <Grid
          item
          container
          xs={12}
          lg={2}
          order={{ xs: 1, lg: 2 }}
          alignItems="center"
          justifyContent="flex-end"
        >
          <Button onClick={handleSwimlaneOpen} variant="actionButtonSmall">
            {swimlaneButtonText === "Show Swimlane"
              ? t("boardPageJSX.showSwimlane")
              : t("boardPageJSX.showKanban")}
          </Button>
          <Button onClick={handleClickRestoreTasks} variant="actionButtonSmall">
            {t("boardPageJSX.archivedTasks")}
          </Button>
          {restoreTasksOpen && (
            <RestoreTasks
              setOpen={setRestoreTasksOpen}
              open={restoreTasksOpen}
              boardId={id}
            />
          )}
        </Grid>

        <Grid
          item
          container
          xs={12}
          lg={10}
          order={{ xs: 2, lg: 1 }}
          className="titleWrapper"
          alignItems="baseline"
          justifyContent="flex-start"
        >
          <Grid container item xs={12} md={6} wrap="nowrap" alignItems="center">
            <Button variant="titleButton" onClick={() => history.push("/")}>
              {t("boardPageJSX.titleLinkProjects")}
            </Button>
            <Typography variant="header-separator">/</Typography>
            <Typography variant="h3">{projectName}</Typography>
            <IconButton
              aria-controls="lock-project-menu"
              aria-label="Select project"
              aria-expanded={openProjectMenu ? "true" : undefined}
              onClick={handleProjectMenuClick}
            >
              <ArrowDropDownCircleOutlinedIcon />
            </IconButton>
            <Menu
              anchorEl={projectAnchorEl}
              open={openProjectMenu}
              onClose={handleProjectClose}
              MenuListProps={{
                "aria-labelledby": "lock-button",
                role: "listbox",
              }}
            >
              {projects.map((project) => (
                <MenuItem
                  key={project.id}
                  disabled={project.id === boardsByProjectId[0].projectId}
                  selected={project.id === boardsByProjectId[0].projectId}
                  onClick={() => handleProjectMenuItemClick(project.id)}
                >
                  {project.name}
                </MenuItem>
              ))}
            </Menu>
          </Grid>
          <Grid container item xs={12} md={6} wrap="nowrap" alignItems="center">
            <Button
              variant="titleButton"
              onClick={() => history.push(`/projects/${projectId}`)}
            >
              {t("boardPageJSX.titleLinkBoards")}
            </Button>
            <Typography variant="header-separator">/</Typography>
            <Typography variant="h3">{board.name}</Typography>
            <IconButton
              aria-controls="lock-board-menu"
              aria-label="Select board"
              aria-expanded={openBoardMenu ? "true" : undefined}
              onClick={handleBoardMenuClick}
            >
              <ArrowDropDownCircleOutlinedIcon />
            </IconButton>
            <Menu
              anchorEl={boardAnchorEl}
              open={openBoardMenu}
              onClose={handleBoardMenuClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              {boardsFromProject.data.boardsRelatedByProjectId.map(
                (boardItem) => (
                  <MenuItem
                    key={boardItem.id}
                    disabled={boardItem.id === board.id}
                    selected={boardItem.id === board.id}
                    onClick={() => handleBoardMenuItemClick(boardItem.id)}
                  >
                    {boardItem.name}
                  </MenuItem>
                )
              )}
            </Menu>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BoardPageHeader;
