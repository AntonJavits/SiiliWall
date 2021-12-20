import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";
import useArchivedTasks from "../../graphql/task/hooks/useArchivedTasks";
import useArchivedSubTasks from "../../graphql/subtask/hooks/useArchivedSubTasks";
import { projectPageStyles } from "../../styles/styles";
import "../../styles.css";
import useRestoreTaskById from "../../graphql/task/hooks/useRestoreTaskById";
import { useTranslation } from "react-i18next";
import EditTaskDialog from "./EditTaskDialog";
import EditSubtaskDialog from "../subtask/EditSubtaskDialog";

const RestoreTasks = ({ open, setOpen, boardId }) => {
  // const classes = projectPageStyles()
  const archivedTasksQueryResult = useArchivedTasks(boardId);
  const archivedSubTasksQueryResult = useArchivedSubTasks(boardId);
  const eventId = window.localStorage.getItem("eventId");
  const [restoreTask] = useRestoreTaskById(boardId);
  const { t, i18n } = useTranslation("common");
  const [dialogStatus, setDialogStatus] = useState(false);
  const [task, setTask] = useState({});
  const [subTask, setSubTask] = useState({});
  const [modifyTask, setModifyTask] = useState(true);
  const [modifySubTask, setModifySubTask] = useState(true);
  const [editId, setEditId] = useState("");
  const titleLimit = 15;
  const dots = "...";
  const toggleDialog = () => setDialogStatus(!dialogStatus);
  const handleClose = () => {
    setOpen(false);
  };

  //Check if queries are done
  if (archivedTasksQueryResult.loading || archivedSubTasksQueryResult.loading)
    return null;

  //name length check adds "..." if the name's too long
  const add3Dots = (title) => {
    if (title.length !== undefined) {
      let checkedTitle = title;
      if (title.length > titleLimit) {
        checkedTitle = title.substring(0, titleLimit) + dots;
      }
      return checkedTitle;
    }
  };
  //query to get tasks from backend
  const tasks = archivedTasksQueryResult.data.archivedTasks;
  let tasksToRestore = tasks;
  const subTasks = archivedSubTasksQueryResult.data;
  let subTasksToRestore = subTasks;

  //"details" button handler for tasks
  const handleClick = (task) => {
    setTask(task);
    setEditId(task.id);
    setModifyTask(!modifyTask);
    setDialogStatus(!dialogStatus);
  };
  //"details" button handler for subtasks
  const handleSubClick = (subTask) => {
    setSubTask(subTask);
    setEditId(subTask.id);
    setModifySubTask(!modifySubTask);
    setDialogStatus(!dialogStatus);
  };

  const tasksList = (tasks, subTasks) => {
    tasksToRestore = tasks
      .slice()
      .sort((a, b) => a.orderNumber - b.orderNumber);
    return (
      <div className="tablerow">
        <div>
          <table style={{ marginRight: 30 }}>
            <tbody>
              <tr>
                <th align="left">{t("restoreTasks.tasks")}</th>
              </tr>
              {tasksToRestore.map((task) => (
                <tr height="7">
                  <td style={{ minWidth: 100 }}>{add3Dots(task.title)}</td>
                  <td>
                    <Button
                      style={{
                        borderRadius: 35,
                        color: "gray",
                      }}
                      variant="outlined"
                      onClick={() => handleClick(task)}
                    >
                      {t("restoreTasks.details")}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <table>
            <tbody>
              <tr>
                <th align="left">{t("restoreTasks.subtasks")}</th>
              </tr>
              {subTasksToRestore.archivedSubTasks.map((subTask) => (
                <tr height="7">
                  <td style={{ minWidth: 100 }}>{add3Dots(subTask.name)}</td>
                  <td>
                    <Button
                      style={{
                        borderRadius: 35,
                        color: "gray",
                      }}
                      variant="outlined"
                      onClick={() => handleSubClick(subTask)}
                    >
                      {t("restoreTasks.details")}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  //Elvis operator changes the popup depending on task and subtask click handlers
  return (
    <div>
      {modifyTask && modifySubTask ? (
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            {t("restoreTasks.restoreTask")}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {t("restoreTasks.selectTask")}
            </DialogContentText>
            {tasksList(tasksToRestore)}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              {t("restoreproject.close")}
            </Button>
          </DialogActions>
        </Dialog>
      ) : modifyTask === false ? (
        <EditTaskDialog
          dialogStatus={dialogStatus}
          editId={editId}
          toggleDialog={toggleDialog}
          task={task}
          boardId={boardId}
          column={task.column}
          modifyTask={true}
          setModifyTask={setModifyTask}
        />
      ) : modifySubTask === false ? (
        <EditSubtaskDialog
          dialogStatus={dialogStatus}
          editId={editId}
          toggleDialog={toggleDialog}
          subtask={subTask}
          boardId={boardId}
          modifySubTask={true}
          setModifySubTask={setModifySubTask}
        />
      ) : (
        <></>
      )}
    </div>
  );
};
export default RestoreTasks;
