import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Menu,
  MenuItem,
  Button,
  IconButton,
  Container,
} from "@mui/material";

import { FormControlLabel, Switch } from "@material-ui/core";
import Select from "react-select";
import TextField from "@material-ui/core/TextField";
import ArrowDropDownCircleOutlinedIcon from "@mui/icons-material/ArrowDropDownCircleOutlined";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import TopBar from "../components/TopBar";
import LoadingSpinner from "../components/LoadingSpinner";
import Board from "../components/board/Board";
import SwimlaneView from "../components/swimlane/SwimlaneView";
import { boardPageStyles, projectPageStyles } from "../styles/styles";
import "../styles.css";
import useBoardById from "../graphql/board/hooks/useBoardById";
import useBoardSubscriptions from "../graphql/subscriptions/useBoardSubscriptions";
import { client } from "../apollo";
import useAddColumn from "../graphql/column/hooks/useAddColumn";
import useAllUsers from "../graphql/user/hooks/useAllUsers";
import useAllEpicColors from "../graphql/colorboards/hooks/useAllEpicColors";
import bubbleSort from "../components/bubblesort";
import useAllColors from "../graphql/task/hooks/useAllColors";
import useArchivedTasks from "../graphql/task/hooks/useArchivedTasks";
import useArchivedSubTasks from "../graphql/subtask/hooks/useArchivedSubTasks";
import ErrorPage from "./ErrorPage";
import useAllProjects from "../graphql/project/hooks/useAllProjects";
import useBoardsRelatedByProjectId from "../graphql/board/hooks/useBoardsRelatedByProjectId";
import { Helmet } from "react-helmet";
import BoardPageHeader from "../components/page/BoardPageHeader";

const BoardPage = ({ id, eventId }) => {
  const queryResult = useBoardById(id);
  const classes = boardPageStyles();
  const projectClasses = projectPageStyles();
  const [boardToRender, setBoardtoRender] = useState(id);
  const history = useHistory();
  const [view, toggleView] = useState("kanban");
  useBoardSubscriptions(id, eventId);
  const userQuery = useAllUsers();
  const [addColumn] = useAddColumn();
  const epicColorQuery = useAllEpicColors();
  const projectId = window.localStorage.getItem("projectId");
  const colorQuery = useAllColors();
  const [user, setUser] = useState("");
  const [color, setColor] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [boardAnchorEl, setBoardAnchorEl] = useState(null);
  const [projectAnchorEl, setProjectAnchorEl] = useState(null);
  const [restoreTasksOpen, setRestoreTasksOpen] = useState(false);
  const openBoardMenu = Boolean(boardAnchorEl);
  const openProjectMenu = Boolean(projectAnchorEl);
  const boardsFromProject = useBoardsRelatedByProjectId(boardToRender);
  const allProjects = useAllProjects();
  const boardById = useBoardById(boardToRender);
  const archivedTasks = useArchivedTasks(id);
  const archivedSubTasks = useArchivedSubTasks(id);
  const [notDone, setNotDone] = useState(true);
  const [swimlaneButtonText, setSwimlaneButtonText] = useState("Show Swimlane");
  const { t, i18n } = useTranslation("common");

  useEffect(() => {
    client.resetStore();
  }, []);

  const handleClickRestoreTasks = () => {
    setRestoreTasksOpen(true);
  };

  useEffect(() => {
    const unlisten = history.listen((location) => {
      const pathslice = location.pathname.slice(8);
      setBoardtoRender(pathslice);
      return unlisten;
    });
  }, []);

  if (
    colorQuery.loading ||
    userQuery.loading ||
    epicColorQuery.loading ||
    allProjects.loading ||
    boardsFromProject.loading ||
    boardById.loading
  ) {
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

  if (boardsFromProject.error) {
    return <ErrorPage />;
  }

  const board = queryResult.data.boardById;
  //checks if there ins't a "hidden" column and
  //creates a "hidden" column where the app will store archived tasks and subtasks
  const createHiddenColumn = () => {
    const boardId = queryResult.data.boardById.id;
    const hiddens = board.columns.map((column) => column.hidden);
    if (!hiddens.includes("hidden") && notDone) {
      setNotDone(false);
      addColumn({
        variables: {
          boardId,
          columnName: "hidden",
          eventId,
          columnOrder: 0,
          hidden: "hidden",
        },
      });
    }
  };
  createHiddenColumn();

  const projects = allProjects.data.allProjects;
  const boardsByProjectId = boardsFromProject.data.boardsRelatedByProjectId;

  const currentProject = projects.find((e) => {
    return e.id == boardsByProjectId[0].projectId;
  });
  const projectName = currentProject.name ? currentProject.name : "loading";

  const switchView = () => {
    toggleView(view === "kanban" ? "swimlane" : "kanban");
  };
  const handleUserChange = (event) => {
    setUser(event);
  };

  const handleBoardMenuClick = (event) => {
    setBoardAnchorEl(event.currentTarget);
  };

  const handleBoardMenuClose = () => {
    setBoardAnchorEl(null);
  };

  const handleBoardMenuItemClick = (selectedId) => {
    setBoardtoRender(selectedId);
    history.push(`/boards/${selectedId}`);
    setBoardAnchorEl(null);
  };
  const handleColorChange = (event) => {
    setColor(event);
  };

  const userList = [];
  userQuery.data.allUsers
    .filter((user) => !user.userName.includes(" (Removed user)"))
    .map((user) => {
      if (user.projectId === projectId) {
        userList.push(user);
      }
      return userList;
    });

  const handleProjectMenuClick = (event) => {
    setProjectAnchorEl(event.currentTarget);
  };

  const handleProjectMenuItemClick = (selectedId) => {
    history.push(`/projects/${selectedId}`);
    setProjectAnchorEl(null);
  };

  const handleProjectClose = () => {
    setProjectAnchorEl(null);
  };

  const handleSwimlaneOpen = () => {
    if (swimlaneButtonText === "Show Swimlane") {
      setSwimlaneButtonText("Show Kanban View");
      switchView();
    } else {
      setSwimlaneButtonText("Show Swimlane");
      switchView();
    }
  };

  let length;
  let colors = epicColorQuery.data.allEpicColors.filter(
    (color) => color.boardId === id
  );
  if (colors.length === 0) {
    length = 0;
    colors = colorQuery.data.allColors;
  }

  const allEpicColors = colors.map((color) => {
    let labelOption;
    let valueOption;
    if (length === 0) {
      valueOption = color.id;
      labelOption = color.color;
    } else {
      valueOption = color.colorId;
      labelOption = color.name;
    }
    const newColor = { value: valueOption, label: labelOption };
    return newColor;
  });

  const alphabeticalOrder = bubbleSort(userList);
  const modifiedUserData = alphabeticalOrder.map((user) => {
    const newObject = { value: user.id, label: user.userName };
    return newObject;
  });

  const editSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Helmet htmlAttributes>
        <title>
          Siiliwall - {projectName} - {board.name}{" "}
        </title>
      </Helmet>
      <TopBar />
      <BoardPageHeader
        projectName={projectName}
        openBoardMenu={openBoardMenu}
        restoreTasksOpen={restoreTasksOpen}
        handleClickRestoreTasks={handleClickRestoreTasks}
        id={id} // Board id
        setRestoreTasksOpen={setRestoreTasksOpen}
        openProjectMenu={openProjectMenu}
        handleSwimlaneOpen={handleSwimlaneOpen}
        handleClickRestoreTasks={handleClickRestoreTasks}
        handleProjectMenuClick={handleProjectMenuClick}
        handleBoardMenuClick={handleBoardMenuClick}
        handleProjectClose={handleProjectClose}
        handleBoardMenuClose={handleBoardMenuClose}
        handleProjectMenuItemClick={handleProjectMenuItemClick}
        handleBoardMenuItemClick={handleBoardMenuItemClick}
        swimlaneButtonText={swimlaneButtonText}
        boardAnchorEl={boardAnchorEl}
        projectAnchorEl={projectAnchorEl}
        board={board}
        projectId={projectId}
        projects={projects}
        boardsByProjectId={boardsByProjectId}
        boardsFromProject={boardsFromProject}
      />

      <Container maxWidth="xxl" direction="row" alignItems="top" sx={{ p: 0 }}>
        <Grid
          item
          container
          spacing={{ xs: 1, sm: 1 }}
          columns={{ xs: 12, md: 12 }}
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Grid item xs={6} sm={4} md={3} style={{ paddingTop: "0.2rem" }}>
            <Select
              className="selectField"
              closeMenuOnSelect={false}
              placeholder={t("boardPageJSX.selectColor")}
              isMulti
              onChange={handleColorChange}
              options={allEpicColors}
              isClearable={true}
            />
          </Grid>
          <Grid item xs={6} sm={4} md={3} style={{ paddingTop: "0.2rem" }}>
            <Select
              className="selectField"
              closeMenuOnSelect={false}
              placeholder={t("boardPageJSX.selectUser")}
              isMulti
              onChange={handleUserChange}
              id="taskSelectColor"
              options={modifiedUserData}
              isClearable={true}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={3} style={{ paddingTop: "0.3rem" }}>
            <TextField
              type="text"
              variant="standard"
              value={searchTerm}
              onChange={editSearchTerm}
              placeholder={t("boardPageJSX.searchByName")}
            />
          </Grid>
        </Grid>
      </Container>

      <Container
        maxWidth="xxl"
        direction="row"
        sx={{
          mt: 2,
          height: 1,
          overflowX: "auto",
        }}
      >
        <Grid item container sx={{ minHeight: 0.9 }}>
          {view === "kanban" ? (
            <Board
              board={board}
              color={color}
              user={user}
              searchTerm={searchTerm}
            />
          ) : (
            <SwimlaneView board={board} />
          )}
        </Grid>
      </Container>
    </Box>
  );
};
export default BoardPage;
