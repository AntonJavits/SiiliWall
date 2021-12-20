import React, { useEffect, useState } from "react";
import {
  Dialog,
  Grid,
  Button,
  TextField,
  DialogContent,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useTranslation } from "react-i18next";
import useEditTask from "../../graphql/task/hooks/useEditTask";
import { titleSchema, descriptionSchema, taskSchema } from "./validationSchema";
import { boardPageStyles } from "../../styles/styles";
import colourStyles from "../SelectDialogColors";
import useAllUsers from "../../graphql/user/hooks/useAllUsers";
import useAllColors from "../../graphql/task/hooks/useAllColors";
import bubbleSort from "../bubblesort";
import colorboardqueries from "../../graphql/colorboards/hooks/useAddEpicColor";
import allEpicColors from "../../graphql/colorboards/hooks/useAllEpicColors";
import useRestoreTaskById from "../../graphql/task/hooks/useRestoreTaskById";
import useBoardById from "../../graphql/board/hooks/useBoardById";

const EditTaskDialog = ({
  dialogStatus,
  editId,
  toggleDialog,
  task,
  boardId,
  column,
  modifyTask,
  setModifyTask,
}) => {
  const EpicColorQuery = allEpicColors();
  const [addEpicColor] = colorboardqueries();
  const [editTask] = useEditTask(boardId);
  const userQuery = useAllUsers();
  const colorQuery = useAllColors();
  const { t, i18n } = useTranslation("common");
  const boardQuery = useBoardById(boardId);
  const [title, setTitle] = useState(task?.title);
  const [storyPoints, setStoryPoints] = useState(
    task?.storyPoints ? task.storyPoints : null
  );
  const [spentStoryPoints, setSpentStoryPoints] = useState(
    task?.spentStoryPoints ? task.spentStoryPoints : ""
  );
  const [description, setDescription] = useState(task?.description);
  const [owner, setOwner] = useState(task?.owner ? task.owner.id : null);
  const [members, setMembers] = useState();
  const [colors, setColors] = useState();
  const [selectedColumn, setSelectedColumn] = useState(
    task?.column ? task?.column : null
  );
  const [titleError, setTitleError] = useState("");
  const [spentStoryPointsError, setSpentStoryPointsError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const arrayOfOldMemberIds = task?.members?.map((user) => user.id);
  const arrayOfOldColorIds = task?.colors?.map((color) => color.id);
  const animatedComponents = makeAnimated();
  const classes = boardPageStyles();
  const [options, setOptions] = useState("1");
  const [EpicColors, setEpicColors] = useState();
  const [valid, setValid] = useState(true);
  const [StoryPointList, setStoryPointList] = useState([
    "Not estimated",
    "1",
    "2",
    "3",
    "5",
    "8",
    "13",
    "20",
    "40",
    "60",
    "100",
  ]);
  const [restoreTask] = useRestoreTaskById(boardId);
  const [columnError, setColumnError] = useState("");
  const [columnErrorMsg, setColumnErrorMsg] = useState("");
  let changedColors = [];
  const changedStoryPoints = [];

  useEffect(() => {
    setTitle(task.title);
    setStoryPoints(task.storyPoints);
    if (task.spentStoryPoints === null) {
      setSpentStoryPoints("");
    } else {
      setSpentStoryPoints(task.spentStoryPoints);
    }
    setOwner(task.owner ? task.owner.id : null);

    setMembers(task.members.length > 0 ? arrayOfOldMemberIds : []);
    setColors(task.colors.length > 0 ? arrayOfOldColorIds : []);

    setDescription(task.description);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [task]);

  useEffect(() => {
    setStoryPointList([
      t("editTaskDialog.notEstimated"),
      "1",
      "2",
      "3",
      "5",
      "8",
      "13",
      "20",
      "40",
      "60",
      "100",
    ]);
  }, [toggleDialog, t]);
  // How to get column name to render it:
  // Use props from Column -> TicketList -> Task -> EditTaskDialog
  // <DialogTitle aria-labelledby="max-width-dialog-title">Edit task in column <strong>{columnName}</strong></DialogTitle>

  if (
    userQuery.loading ||
    colorQuery.loading ||
    EpicColorQuery.loading ||
    boardQuery.loading
  )
    return null;

  const handleTitleChange = (event) => {
    const input = event.target.value;
    titleSchema.validate(input).catch((err) => {
      setTitleError(err.message);
    });
    setTitleError("");
    setTitle(input);
  };
  const handleOwnerChange = (action) => {
    setOwner(action != null ? action.value : null);
  };

  const handleSpentStoryPointsChange = (event) => {
    const input = event.target.value;
    const intSpentStoryPoints = Number(input);
    const intStoryPoints = Number(storyPoints);

    if (intSpentStoryPoints > intStoryPoints || intSpentStoryPoints < 0) {
      setSpentStoryPointsError(t("editTaskDialog.spentSPerror") + storyPoints);
      setSpentStoryPoints(input);
      setValid(false);
    } else {
      setSpentStoryPoints(input);
      setSpentStoryPointsError("");
      setValid(true);
    }
  };

  const handleStoryPointsChange = (action) => {
    setStoryPoints(action.value);
  };

  const handleDescriptionChange = (event) => {
    const input = event.target.value;
    if (input === "") {
      setDescription(null);
      return;
    }
    setDescriptionError("");
    setDescription(input);
  };

  const handleMembersChange = (event) => {
    setMembers(Array.isArray(event) ? event.map((user) => user.value) : []);
  };

  const handleColorsChange = (event) => {
    setColors(Array.isArray(event) ? event.map((color) => color.value) : []);
  };

  const handleColumnChange = (action) => {
    setSelectedColumn(action.value);
  };

  const renameColors = async () => {
    if (options === "1") {
      setOptions("2");
    } else {
      setEpicColors(changedColors);
      for (let i = 0; i < changedColors.length; i++) {
        setModifyTask(true);

        try {
          await addEpicColor({
            variables: {
              colorId: changedColors[i].id,
              boardId,
              name: changedColors[i].name,
            },
          });
        } catch (e) {
          console.log(e);
        }
      }

      setOptions("1");
    }
  };

  const inputChanged = (event) => {
    changedColors[event.target.id].name = event.target.value;
  };

  const colorList = () => {
    if (EpicColors) {
      changedColors = EpicColors;
    }

    return (
      <div>
        <table>
          <tbody>
            {changedColors.map((color, index) => (
              <tr key={index}>
                <td
                  style={{
                    height: "20px",
                    width: "20px",
                    backgroundColor: color.color,
                  }}
                />
                <td>
                  <input
                    name={color.color}
                    id={index}
                    onChange={inputChanged}
                    defaultValue={color.name}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const handleSave = async (event) => {
    event.preventDefault();
    const eventId = window.localStorage.getItem("eventId");
    const isValid = await taskSchema.isValid({
      title,
      storyPoints,
      description,
    });
    const intSpentStoryPoints = Number(spentStoryPoints);
    const intStoryPoints = Number(storyPoints);
    if (
      (storyPoints === "Not estimated" || storyPoints === "Ei arvioitu") &&
      spentStoryPoints.length > 0 &&
      spentStoryPoints !== "0"
    ) {
      setSpentStoryPointsError(t("editTaskDialog.spentSPerrorNotEstimated"));
    } else if (!columnIds.includes(selectedColumn.id)) {
      setColumnError(t("editTaskDialog.columnNotSelected"));
      //If subtasks spent storypoints > maximum story points available throw an error
    } else if (
      intSpentStoryPoints > intStoryPoints ||
      intSpentStoryPoints < 0
    ) {
      setSpentStoryPointsError(t("editTaskDialog.spentSPerror") + storyPoints);
      //if the selected column is the "hidden" column it will throw an error
    } else if (selectedColumn.hidden === "hidden") {
      setColumnErrorMsg(t("editTaskDialog.columnNotSelected"));
    } else {
      setSpentStoryPointsError("");
      setColumnError("");
      setColumnErrorMsg("");

      if (isValid) {
        editTask({
          variables: {
            taskId: editId,
            title,
            storyPoints,
            spentStoryPoints,
            ownerId: owner,
            oldMemberIds: arrayOfOldMemberIds,
            newMemberIds: members,
            oldColorIds: arrayOfOldColorIds,
            newColorIds: colors,
            description,
            eventId,
            columnId: selectedColumn.id,
          },
        });
        //Tells the component if it came from DropDownSubtask.jsx or from RestoreTasks.jsx
        if (modifyTask === false) {
          toggleDialog();
        } else {
          restoreTask({
            variables: {
              taskId: editId,
              boardId,
              eventId,
            },
          });
          setModifyTask(true);
          toggleDialog();
          // handleModifyTask()
          // modifyTask= false
        }
      }
    }
  };

  const recoverState = () => {
    setTitle(task?.title);
    setStoryPoints(task?.storyPoints ? task.storyPoints : null);
    setSpentStoryPoints(task?.spentStoryPoints ? task.spentStoryPoints : "");
    setOwner(task?.owner ? task.owner.id : null);
    setMembers(task.members.length > 0 ? arrayOfOldMemberIds : []);
    setColors(task.colors.length > 0 ? arrayOfOldColorIds : []);
    setDescription(task?.description);
  };

  const handleCancel = () => {
    if (modifyTask === false) {
      recoverState();
      toggleDialog();
    } else {
      recoverState();
      setModifyTask(true);
      toggleDialog();
      // handleModifyTask()
    }
  };

  // Prevents closing dialog when clicking on it to edit task's fields
  const handleDialogClick = (e) => e.stopPropagation();

  // Modifiying userData to be of form expected by the react select component
  const projectId = window.localStorage.getItem("projectId");

  const colorNamesToList = (color) => {
    if (
      EpicColorQuery.data.allEpicColors.filter(
        (epic) => epic.boardId === boardId
      ).length > 0
    ) {
      const epicBoard = EpicColorQuery.data.allEpicColors.filter(
        (epic) => epic.colorId === color.id
      );
      const epics = epicBoard.filter((epic) => epic.boardId === boardId);
      if (epics.length > 0) {
        return epics[0].name;
      } else {
        return color.color;
      }
    } else {
      return color.color;
    }
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

  const columns = boardQuery.data.boardById.columns;
  const columnIds = columns.map((column) => {
    return column.id;
  });

  const alphabeticalOrder = bubbleSort(userList);
  const modifiedUserData = alphabeticalOrder.map((user) => {
    const newObject = { value: user.id, label: user.userName };
    return newObject;
  });

  const chosenMembersData = task.members.map((user) => {
    const newObject = { value: user.id, label: user.userName };
    return newObject;
  });

  const chosenColorsData = task.colors.map((color) => {
    const newObject = {
      value: color.id,
      color: color.color,
      label: colorNamesToList(color),
    };
    return newObject;
  });

  const chosenStoryPoints = {
    value: task.storyPoints,
    label: task.storyPoints,
  };

  const addColorsToChangedColors = () => {
    colorQuery.data.allColors.map((color) => {
      changedColors.push({
        id: color.id,
        color: color.color,
        name: colorNamesToList(color),
      });
      return changedColors;
    });
  };

  addColorsToChangedColors();
  if (EpicColors) {
    changedColors = EpicColors;
  }
  const modifiedColorData = changedColors.map((color) => {
    const newObject = {
      value: color.id,
      color: color.color,
      label: color.name.charAt(0).toUpperCase() + color.name.slice(1),
    };
    return newObject;
  });

  const addStoryPointsToChangedStoryPoints = () => {
    StoryPointList.map((x) => {
      changedStoryPoints.push({ value: x, label: x });
      return changedStoryPoints;
    });
  };

  addStoryPointsToChangedStoryPoints();

  // data for showing only the members not yet chosen
  const modifiedMemberOptions = modifiedUserData.filter(
    (user) => !arrayOfOldMemberIds.includes(user.id)
  );

  const modifiedColorOptions = modifiedColorData.filter(
    (color) => !arrayOfOldColorIds.includes(color.id)
  );

  const chosenOwnerData = modifiedUserData.map((user) => {
    let newObject;
    if (user.value === owner) {
      newObject = { value: user.value, label: user.label };
    }
    return newObject;
  });

  const modifiedColumns = columns.map((column) => {
    let newObject = { value: column, label: column.name };
    return newObject;
  });
  const filteredColumns = modifiedColumns.filter(
    (value) => value.value.hidden === "visible"
  );
  return (
    <Grid>
      <Dialog
        fullWidth
        maxWidth="md"
        onClose={handleCancel}
        open={dialogStatus}
        aria-labelledby="max-width-dialog-title"
        classes={{ paper: classes.dialogPaper }}
        onClick={handleDialogClick}
      >
        <DialogTitle aria-labelledby="max-width-dialog-title">
          {t("editTaskDialog.editTask")}
        </DialogTitle>
        <DialogContent>
          <TextField
            variant="standard"
            error={titleError.length > 0}
            id="filled-error-helper-text"
            autoComplete="off"
            autoFocus={true}
            required={true}
            margin="dense"
            name="title"
            label={t("editTaskDialog.name")}
            type="text"
            value={title}
            fullWidth
            helperText={titleError}
            onChange={handleTitleChange}
          />
          <Select
            className="selectField"
            placeholder={t("editTaskDialog.selectSP")}
            isSearchable={false}
            defaultValue={chosenStoryPoints}
            options={changedStoryPoints}
            onChange={handleStoryPointsChange}
          />
          {valid ? (
            <TextField
              variant="standard"
              autoComplete="off"
              margin="dense"
              name="Spent story points"
              label={t("editTaskDialog.spentSP")}
              type="number"
              placeholder={t("editTaskDialog.spentSPPlaceholder")}
              value={spentStoryPoints}
              fullWidth
              helperText={spentStoryPointsError}
              onChange={handleSpentStoryPointsChange}
            />
          ) : (
            <TextField
              variant="standard"
              error
              autoComplete="off"
              margin="dense"
              name="Spent story points"
              label={t("editTaskDialog.spentSP")}
              type="number"
              placeholder={t("editTaskDialog.spentSPPlaceholder")}
              value={spentStoryPoints}
              fullWidth
              helperText={spentStoryPointsError}
              onChange={handleSpentStoryPointsChange}
            />
          )}

          <Select
            className="selectField"
            placeholder={`${t("editTaskDialog.selectColumn")} `}
            isSearchable={false}
            components={animatedComponents}
            onChange={handleColumnChange}
            id="taskSelectColumn"
            aria-errormessage={columnError}
            options={filteredColumns}
          />
          <p>{columnErrorMsg}</p>

          <Select
            className="selectField"
            closeMenuOnSelect={false}
            placeholder={t("editTaskDialog.selectColors")}
            defaultValue={chosenColorsData}
            components={animatedComponents}
            isMulti
            onChange={handleColorsChange}
            id="taskSelectColor"
            options={modifiedColorOptions}
            styles={colourStyles}
          />
          <Select
            className="selectField"
            isClearable
            placeholder={t("editTaskDialog.selectOwner")}
            options={modifiedUserData}
            defaultValue={chosenOwnerData}
            onChange={handleOwnerChange}
            id="taskSelectOwner"
          />
          <Select
            className="selectField"
            closeMenuOnSelect={false}
            placeholder={t("editTaskDialog.selectMembers")}
            options={modifiedMemberOptions}
            defaultValue={chosenMembersData}
            components={animatedComponents}
            isMulti
            onChange={handleMembersChange}
            id="taskSelectMember"
          />
          <TextField
            variant="standard"
            error={descriptionError.length > 0}
            id="standard-multiline-static, filled-error-helper-text"
            autoComplete="off"
            margin="dense"
            name="description"
            label={t("editTaskDialog.description")}
            type="text"
            multiline
            helperText={descriptionError}
            rows={3}
            value={description || ""}
            fullWidth
            onChange={handleDescriptionChange}
          />
        </DialogContent>
        <DialogContent>
          {options === "2" ? <div> {colorList()}</div> : <div />}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="secondary">
            {t("editTaskDialog.cancel")}
          </Button>
          {options === "2" ? (
            <Button
              onClick={() => renameColors()}
              color="primary"
              id="changeColors"
            >
              {t("editSubtaskDialog.saveChanges")}
            </Button>
          ) : (
            <Button
              onClick={() => renameColors()}
              color="primary"
              id="changeColors"
            >
              {t("editSubtaskDialog.renameColors")}
            </Button>
          )}
          {modifyTask === false ? (
            <Button
              onClick={handleSave}
              color="primary"
              id="submitEditTaskButton"
            >
              {t("editTaskDialog.submitEdit")}
            </Button>
          ) : (
            <Button
              onClick={handleSave}
              color="primary"
              id="submitEditTaskButton"
            >
              {t("editTaskDialog.submitRestore")}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Grid>
  );
};
export default EditTaskDialog;
