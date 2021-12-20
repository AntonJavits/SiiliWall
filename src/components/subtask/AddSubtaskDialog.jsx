/* eslint-disable object-curly-newline */
import React, { useState } from "react";
import {
  Dialog,
  Grid,
  Button,
  TextField,
  DialogContent,
  DialogActions,
  DialogTitle,
} from "@mui/material"
import Select from "react-select";
import { useApolloClient } from "@apollo/client";
import { boardPageStyles } from "../../styles/styles";
import "../../styles.css";
import useAddSubtask from "../../graphql/subtask/hooks/useAddSubtask";
import useAllUsers from "../../graphql/user/hooks/useAllUsers";
import {
  TICKETORDER,
  BOARDS_COLUMNS_AND_COLUMNORDER,
} from "../../graphql/fragments";
import useAllColors from "../../graphql/task/hooks/useAllColors";
import bubbleSort from "../bubblesort";
import colourStyles from '../SelectDialogColors'
import colorboardqueries from '../../graphql/colorboards/hooks/useAddEpicColor'
import allEpicColors from '../../graphql/colorboards/hooks/useAllEpicColors'
import {useTranslation} from "react-i18next"

const AddSubtaskDialog = ({
  addDialogStatus,
  toggleAddDialog,
  columnId,
  taskId,
  boardId,
}) => {
  const EpicColorQuery = allEpicColors()
  const [addEpicColor] = colorboardqueries();
  const userQuery = useAllUsers();
  const colorQuery = useAllColors();
  const classes = boardPageStyles();
  const [addSubtask] = useAddSubtask();
  const client = useApolloClient();
  const [name, setName] = useState("");
  const [storyPoints, setStoryPoints] = useState("Not estimated");
  const [content, setContent] = useState("");
  const [owner, setOwner] = useState(null);
  const [members, setMembers] = useState([]);
  const [colors, setColors] = useState([]);
  const [inputColumnId, setInputColumnId] = useState(null);
  const {t, i18n} = useTranslation('common')
  const [options, setOptions] = useState("1")
  const [EpicColors, setEpicColors] = useState()
  const [StoryPointList, setStoryPointList] = useState(["Not estimated", "1", "2", "3", "5", "8", "13", "20", "40", "60", "100"])
  let changedColors = [];
  let changedStoryPoints = [];

  const { columns, columnOrder } = client.cache.readFragment({
    id: `Board:${boardId}`,
    fragment: BOARDS_COLUMNS_AND_COLUMNORDER,
  });
  if (userQuery.loading || colorQuery.loading || EpicColorQuery.loading) return null

  const columnOfParentTask = columns.find((col) => col.id === columnId)?.name;

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleStoryPointsChange = (action) => {
      setStoryPoints(action.value);
  };

  const handleOwnerChange = (action) => {
    setOwner(action.value);
  };

  const handleMembersChange = (event) => {
    setMembers(Array.isArray(event) ? event.map((user) => user.value) : []);
  };

  const handleColorsChange = (event) => {
    setColors(Array.isArray(event) ? event.map((user) => user.value) : []);
  };

  const handleColumnChange = (action) => {
    setInputColumnId(action.value);
  };

  const emptyState = () => {
    setName("");
    setContent("");
    setStoryPoints("Not estimated");
    setOwner(null);
    setInputColumnId(null);
    setMembers([]);
    setColors([]);
  };

  const renameColors = () => {
    if (options === "1") {
        setOptions("2")
    } else {
        setEpicColors(changedColors)
        for (let i = 0; i < changedColors.length; i++) {
            addEpicColor({
                variables: {
                    colorId:changedColors[i].id,
                    boardId: boardId,
                    name: changedColors[i].name,
                }
            })
        }

        setOptions("1")
    }
}

const inputChanged = (event) => {
    changedColors[event.target.id].name = event.target.value
  }

const colorList = () => {
    if (EpicColors) {
        changedColors = EpicColors
    }

    return (
        <div>
            <table><tbody>
                {
                    changedColors.map((color, index) => <tr key={index}>
                        <td style={{ height:'20px', width:'20px', backgroundColor: color.color }}></td>
                        <td><input name={color.color} id={index} onChange={inputChanged} defaultValue={color.name}></input></td></tr>)
                }
            </tbody></table>
        </div>
    )
}

  const handleSave = (event) => {
    event.preventDefault();
    // Get the ticketOrder of the column to which user is creating the subtask
    const { ticketOrder } = client.cache.readFragment({
      id: `Column:${inputColumnId || columnId}`,
      fragment: TICKETORDER,
    });
    const ticketOrderWithoutTypename = ticketOrder.map((obj) => ({
      ticketId: obj.ticketId,
      type: obj.type,
    }));
    const eventId = window.localStorage.getItem("eventId");
    addSubtask({
      variables: {
        columnId: inputColumnId || columnId,
        taskId,
        boardId,
        ownerId: owner,
        memberIds: members,
        colorIds: colors,
        name,
        content,
        storyPoints,
        ticketOrder: ticketOrderWithoutTypename,
        eventId,
      },
    });
    emptyState();
    toggleAddDialog(event);
  };

  const handleCancel = (e) => {
    emptyState();
    toggleAddDialog(e);
  };

    const projectId = window.localStorage.getItem('projectId')
    let userList = [];
    userQuery.data.allUsers.filter((user) => !user.userName.includes(' (Removed user)')).map((user) => {
        if (user.projectId === projectId) {
        userList.push(user)
        }
        return userList
    });

    let alphabeticalOrder = bubbleSort(userList);
    const modifiedUserData = alphabeticalOrder.map((user) => {
      const newObject = { value: user.id, label: user.userName };
      return newObject;
    });
  
  
    const colorNamesToList = (color) => {
      if (EpicColorQuery.data.allEpicColors.filter((epic) => epic.boardId === boardId).length > 0) {
      const epicBoard = EpicColorQuery.data.allEpicColors.filter((epic) => epic.colorId === color.id);
      const epics = epicBoard.filter((epic) => epic.boardId === boardId);
      if (epics.length > 0) {
      return epics[0].name;
      } else {
          return color.color
      }
      } else {
          return color.color;
      }
  }
  
  const addColorsToChangedColors = () => {
      colorQuery.data.allColors.map((color) => {
          changedColors.push({id: color.id, color: color.color, name: colorNamesToList(color)});
          return changedColors
      })
  }
  
  addColorsToChangedColors();
  if (EpicColors) {
      changedColors=EpicColors; 
  }
  const modifiedColorData = changedColors.map((color) => {
    const newObject = { value: color.id, color: color.color, label: color.name.charAt(0).toUpperCase() + color.name.slice(1) }
    return newObject
})

const addStoryPointsToChangedStoryPoints = () => {
  StoryPointList.map((x) => {
      changedStoryPoints.push({value: x, label: x});
      return changedStoryPoints
  })
}

addStoryPointsToChangedStoryPoints();
  
    const columnsData = columnOrder
      .map((id) => columns.find((col) => col.id === id))
      .map((col) => {
        const newObject = { value: col.id, label: col.name };
        return newObject;
      });
  
    return (
      <Grid>
        <Dialog
          fullWidth
          maxWidth="md"
          onClose={handleCancel}
          open={addDialogStatus}
          aria-labelledby="max-width-dialog-title"
          classes={{ paper: classes.dialogPaper }}
        >
          <DialogTitle aria-labelledby="max-width-dialog-title">
         {t('addSubtaskDialog.createNew')}
          </DialogTitle>
          <DialogContent>
            <TextField
              variant="standard"
              required
              autoComplete="off"
              margin="dense"
              name="name"
              label={t('addSubtaskDialog.name')}
              type="text"
              value={name}
              fullWidth
              onChange={handleNameChange}
            />
            <TextField
              variant="standard"
              autoComplete="off"
              margin="dense"
              name="content"
              label={t('addSubtaskDialog.content')}
              type="text"
              value={content}
              fullWidth
              onChange={handleContentChange}
            />
            <Select
              className="selectField"
              placeholder={t('addSubtaskDialog.selectSP')}
              isSearchable={false}
              options={changedStoryPoints}
              onChange={handleStoryPointsChange}
            />
            <Select
              isMulti
              className="selectField"
              placeholder={t('addSubtaskDialog.selectColors')}
              options={modifiedColorData}
              onChange={handleColorsChange}
              closeMenuOnSelect={false}
              styles={colourStyles}
            />
            <Select
              className="selectField"
              placeholder={t('addSubtaskDialog.selectOwner')}
              options={modifiedUserData}
              onChange={handleOwnerChange}
            />
            <Select
              isMulti
              className="selectField"
              placeholder={t('addSubtaskDialog.selectMembers')}
              options={modifiedUserData}
              onChange={handleMembersChange}
              closeMenuOnSelect={false}
            />
            
          </DialogContent>
          {options === "2" ? (<div> {colorList()}</div>) : (<div></div>)}
          <DialogActions>
            <Button onClick={(e) => handleCancel(e)} color="secondary">
            {t('addSubtaskDialog.cancel')}
            </Button>
            {options === "2" ? 
                     <Button onClick={() => renameColors()} id="changeColors">
                     {t('addSubtaskDialog.saveChanges')}
                 </Button>
                    :
                    <Button onClick={() => renameColors()} id="changeColors">
                    {t('addSubtaskDialog.renameColors')}
                     </Button>
                    }
            <Button disabled={!name.length} onClick={handleSave} color="primary">
            {t('addSubtaskDialog.createTask')}
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    );
  };
  export default AddSubtaskDialog;
  