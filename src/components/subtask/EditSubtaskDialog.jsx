import React, { useState, useEffect } from "react";
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
import useEditSubtask from "../../graphql/subtask/hooks/useEditSubtask";
import { boardPageStyles } from "../../styles/styles";
import useAllColors from "../../graphql/task/hooks/useAllColors";
import useAllUsers from "../../graphql/user/hooks/useAllUsers";
import bubbleSort from "../bubblesort";
import colourStyles from "../SelectDialogColors";
import colorboardqueries from "../../graphql/colorboards/hooks/useAddEpicColor";
import allEpicColors from "../../graphql/colorboards/hooks/useAllEpicColors";
import { useTranslation } from "react-i18next";
import useRestoreSubTaskById from "../../graphql/subtask/hooks/useRestoreSubtaskById";
import useBoardById from "../../graphql/board/hooks/useBoardById";

const EditSubtaskDialog = ({
  dialogStatus,
  editId,
  toggleDialog,
  subtask,
  modifySubTask,
  setModifySubTask,
}) => {
  const EpicColorQuery = allEpicColors();
  const [addEpicColor] = colorboardqueries();
  const [editSubtask] = useEditSubtask();
  const userQuery = useAllUsers();
  const colorQuery = useAllColors();
  const { t, i18n } = useTranslation("common");
  const [name, setName] = useState();
  const [storyPoints, setStoryPoints] = useState();
  const boardQuery = useBoardById(subtask.board.id);
  const [spentStoryPoints, setSpentStoryPoints] = useState();
  const [spentStoryPointsError, setSpentStoryPointsError] = useState("");
  const [selectedColumn, setSelectedColumn] = useState(
    subtask?.column ? subtask?.column : null
  );
  const [content, setContent] = useState(subtask.content);
  const [owner, setOwner] = useState();
  const arrayOfOldMemberIds = subtask.members.map((user) => user.id);
  const arrayOfOldColorIds = subtask?.colors?.map((color) => color.id);
  const [members, setMembers] = useState();
  const [colors, setColors] = useState();
  const animatedComponents = makeAnimated();
  const classes = boardPageStyles();
  const [options, setOptions] = useState("1");
  const [EpicColors, setEpicColors] = useState();
  const [columnError, setColumnError] = useState("");
  const [columnErrorMsg, setColumnErrorMsg] = useState("");

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
  let changedColors = [];
  let changedStoryPoints = [];
  const boardId = subtask.board.id;
  const [restoreSubTask] = useRestoreSubTaskById(boardId);
  useEffect(() => {
    setName(subtask.name);
    setStoryPoints(subtask.storyPoints);
    setSpentStoryPoints(subtask.spentStoryPoints);
    setContent(subtask.content);
    setOwner(subtask.owner ? subtask.owner.id : null);
    setMembers(subtask.members.length > 0 ? arrayOfOldMemberIds : []);
    setColors(subtask.colors.length > 0 ? arrayOfOldColorIds : []);
  }, [subtask]);

  if (userQuery.loading || colorQuery.loading || EpicColorQuery.loading)
    return null;
  const handleOwnerChange = (action) => {
    setOwner(action != null ? action.value : null);
  };

  const handleStoryPointsChange = (action) => {
    setStoryPoints(action.value);
  };

  const handleSpentStoryPointsChange = (event) => {
    const input = event.target.value;
    let intSpentStoryPoints = Number(input);
    let intStoryPoints = Number(storyPoints);
    if (intSpentStoryPoints > intStoryPoints || intSpentStoryPoints < 0) {
      setSpentStoryPointsError(
        t("editSubtaskDialog.spentSPerror") + storyPoints
      );
      setSpentStoryPoints(input);
      setValid(false);
    } else {
      setSpentStoryPoints(input);
      setSpentStoryPointsError("");
      setValid(true);
    }
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
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

  const renameColors = () => {
    if (options === "1") {
      setOptions("2");
    } else {
      setEpicColors(changedColors);
      for (let i = 0; i < changedColors.length; i++) {
        addEpicColor({
          variables: {
            colorId: changedColors[i].id,
            boardId: boardId,
            name: changedColors[i].name,
          },
        });
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
                ></td>
                <td>
                  <input
                    name={color.color}
                    id={index}
                    onChange={inputChanged}
                    defaultValue={color.name}
                  ></input>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const handleSave = (event) => {
    event.preventDefault();
    const eventId = window.localStorage.getItem("eventId");
    let intSpentStoryPoints = Number(spentStoryPoints);
    let intStoryPoints = Number(storyPoints);
    if (
      storyPoints === t("editSubtaskDialogue.notEstimated") ||
      (storyPoints === "Ei arvioitu" &&
        spentStoryPoints.length > 0 &&
        spentStoryPoints !== "0")
    ) {
      setSpentStoryPointsError(t("editSubtaskDialog.spentSPerrorNotEstimated"));
    } else if (!columnIds.includes(selectedColumn.id)) {
      setColumnError(t("editSubTaskDialog.columnNotSelected"));
      //If subtasks spent storypoints > maximum story points available throw an error
    } else if (
      intSpentStoryPoints > intStoryPoints ||
      intSpentStoryPoints < 0
    ) {
      setSpentStoryPointsError(
        t("editSubtaskDialog.spentSPerror") + storyPoints
      );
      //if the selected column is the "hidden" column it will throw an error
    } else if (selectedColumn.hidden === "hidden") {
      setColumnErrorMsg(t("editSubtaskDialog.columnNotSelected"));
    } else {
      setSpentStoryPointsError("");
      setColumnError("");
      setColumnErrorMsg("");
      editSubtask({
        variables: {
          id: editId,
          name,
          content,
          storyPoints,
          spentStoryPoints,
          ownerId: owner,
          oldMemberIds: arrayOfOldMemberIds,
          newMemberIds: members,
          oldColorIds: arrayOfOldColorIds,
          newColorIds: colors,
          eventId,
          columnId: selectedColumn.id,
        },
      });
      //Tells the component if it came from DropDownSubtask.jsx or from RestoreTasks.jsx
      if (modifySubTask === false) {
        toggleDialog();
      } else {
        restoreSubTask({
          variables: {
            subtaskId: editId,
            boardId,
            eventId,
          },
        });
        setModifySubTask(true);
        toggleDialog();
      }
    }
  };

  const recoverState = () => {
    setName(subtask?.name);
    setStoryPoints(subtask?.storyPoints);
    setSpentStoryPoints(
      subtask?.spentStoryPoints ? subtask.spentStoryPoints : ""
    );
    setOwner(subtask?.owner ? subtask.owner.id : null);
    setMembers(subtask.members.length > 0 ? arrayOfOldMemberIds : []);
    setColors(subtask.colors.length > 0 ? arrayOfOldColorIds : []);
    setContent(subtask?.content);
  };

  const handleCancel = () => {
    if (modifySubTask === false) {
      recoverState();
      toggleDialog();
    } else {
      recoverState();
      setModifySubTask(true);
      toggleDialog();
    }
  };

  // Prevents closing dialog when clicking on it to edit subtask's fields
  const handleDialogClick = (e) => e.stopPropagation();

  // Modifiying userData to be of form expected by the react select component
  const projectId = window.localStorage.getItem("projectId");
  let userList = [];

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

  let alphabeticalOrder = bubbleSort(userList);
  const modifiedUserData = alphabeticalOrder.map((user) => {
    const newObject = { value: user.id, label: user.userName };
    return newObject;
  });

  const chosenMembersData = subtask.members.map((user) => {
    const newObject = { value: user.id, label: user.userName };
    return newObject;
  });

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

  const chosenColorsData = subtask.colors.map((color) => {
    const newObject = {
      value: color.id,
      color: color.color,
      label: colorNamesToList(color),
    };
    return newObject;
  });

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

  const chosenStoryPoints = {
    value: subtask.storyPoints,
    label: subtask.storyPoints,
  };
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
  //hides the "hidden" column
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
          {t("editSubtaskDialog.editTask")}
        </DialogTitle>
        <DialogContent>
          <TextField
            variant="standard"
            required
            autoComplete="off"
            margin="dense"
            name="name"
            label={t("editSubtaskDialog.name")}
            type="text"
            value={name || ""}
            fullWidth
            onChange={handleNameChange}
          />
          <TextField
            variant="standard"
            autoComplete="off"
            margin="dense"
            name="content"
            label={t("editSubtaskDialog.content")}
            type="text"
            multiline
            rows={1}
            value={content}
            fullWidth
            onChange={handleContentChange}
          />
          <Select
            className="selectField"
            placeholder={t("editSubtaskDialog.selectSP")}
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
              label={t("editSubtaskDialog.spentSP")}
              type="number"
              placeholder={t("editSubtaskDialog.spentSPPlaceholder")}
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
              label={t("editSubtaskDialog.spentSP")}
              type="number"
              placeholder={t("editSubtaskDialog.spentSPPlaceholder")}
              value={spentStoryPoints}
              fullWidth
              helperText={spentStoryPointsError}
              onChange={handleSpentStoryPointsChange}
            />
          )}

          <Select
            className="selectField"
            placeholder={t("editSubtaskDialog.selectColumn")}
            isSearchable={false}
            components={animatedComponents}
            onChange={handleColumnChange}
            id="subtaskSelectColumn"
            aria-errormessage={columnError}
            options={filteredColumns}
          />
          <p>{columnErrorMsg}</p>

          <Select
            className="selectField"
            closeMenuOnSelect={false}
            placeholder={t("editSubtaskDialog.selectColors")}
            options={modifiedColorOptions}
            defaultValue={chosenColorsData}
            components={animatedComponents}
            isMulti
            onChange={handleColorsChange}
            styles={colourStyles}
          />
          <Select
            className="selectField"
            isClearable
            placeholder={t("editSubtaskDialog.selectOwner")}
            options={modifiedUserData}
            defaultValue={chosenOwnerData}
            onChange={handleOwnerChange}
          />
          <Select
            className="selectField"
            closeMenuOnSelect={false}
            placeholder={t("editSubtaskDialog.selectMembers")}
            options={modifiedMemberOptions}
            defaultValue={chosenMembersData}
            components={animatedComponents}
            isMulti
            onChange={handleMembersChange}
          />
        </DialogContent>
        {options === "2" ? <div> {colorList()}</div> : <div></div>}
        <DialogActions>
          <Button onClick={handleCancel} color="secondary">
            {t("editSubtaskDialog.cancel")}
          </Button>
          {options === "2" ? (
            <Button onClick={() => renameColors()} id="changeColors">
              {t("editSubtaskDialog.saveChanges")}
            </Button>
          ) : (
            <Button onClick={() => renameColors()} id="changeColors">
              {t("editSubtaskDialog.renameColors")}
            </Button>
          )}
          {modifySubTask === false ? (
            <Button
              onClick={handleSave}
              color="primary"
              id="submitEditTaskButton"
            >
              {t("editSubtaskDialog.submitEdit")}
            </Button>
          ) : (
            <Button
              onClick={handleSave}
              color="primary"
              id="submitEditTaskButton"
            >
              {t("editSubtaskDialog.submitRestore")}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Grid>
  );
};
export default EditSubtaskDialog;
