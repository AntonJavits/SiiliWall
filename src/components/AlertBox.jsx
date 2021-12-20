import React, { useState } from 'react'
import withStyles from '@mui/styles/withStyles'
import {
    Grid, Button, Dialog, Checkbox,
} from '@mui/material'
import { Alert } from '@mui/material'
import { useMutation, useApolloClient } from '@apollo/client'
import { useTranslation } from 'react-i18next'
import { boardPageStyles } from '../styles/styles'
import { DELETE_COLUMN } from '../graphql/column/columnQueries'
import { COLUMNORDER_AND_COLUMNS } from '../graphql/fragments'
import { DELETE_TASK } from '../graphql/task/taskQueries'
import useArchiveTask from '../graphql/task/hooks/useArchiveTask'
import useArchivedTasksByColumnId from '../graphql/task/hooks/useArchivedTasksByColumnId'
import useArchivedSubTasksByColumnId from '../graphql/subtask/hooks/useArchivedSubTasksByColumnId'
import useArchiveSubtask from '../graphql/subtask/hooks/useArchiveSubtask'
import useDeleteSubtask from '../graphql/subtask/hooks/useDeleteSubtask'
import useAddColumn from '../graphql/column/hooks/useAddColumn'
import useBoardById from '../graphql/board/hooks/useBoardById'
import useEditTask from '../graphql/task/hooks/useEditTask'
import useEditSubtask from '../graphql/subtask/hooks/useEditSubtask'
import { removeTaskFromCache, deleteColumnFromCache, removeSubtaskFromCache } from '../cacheService/cacheUpdates'

const AlertBox = ({
    alertDialogStatus, toggleAlertDialog, action, columnId, boardId, taskId, subtaskId, count,
}) => {
    const [check, toggleCheck] = useState(false)
    const [archiveTask] = useArchiveTask(boardId, columnId)
    const [archiveSubtask] = useArchiveSubtask(boardId, columnId)
    const [callDeleteSubtask] = useDeleteSubtask(columnId)
    const [editTask] = useEditTask(boardId)
    const [editSubTask] = useEditSubtask(boardId)
    const classes = boardPageStyles()
    const client = useApolloClient()
    const [addColumn] = useAddColumn()
    const [callDeleteColumn] = useMutation(DELETE_COLUMN)
    const [callDeleteTask] = useMutation(DELETE_TASK)
    const { t, i18n } = useTranslation('common')
    const boards = useBoardById(boardId)
    const archivedTasksByColumnId = useArchivedTasksByColumnId(columnId)
    const archivedSubTasksByColumnId = useArchivedSubTasksByColumnId(columnId)
    const alertMsgDeleteColumn = t('alertBox.deleteColumn')
    const alertMsgDeleteTask = t('alertBox.deleteTask')
    const alertMsgArchiveTask = t('alertBox.archiveTask')
    const alertMsgArchiveSubtask = t('alertBox.archiveSubtask')
    const alertMsgDeleteSubtask = t('alertBox.deleteSubtask')
    const alertMsgDeleteTaskIfSubtasks = t('alertBox.deleteTaskIfSubtask', { count })
    const alertMsgArchiveTaskIfSubtasks = t('alertBox.archiveTaskIfSubtask', { count })
    const alertMsgColumnHasTickets = t('alertBox.columnHasTickets')

    const eventId = window.localStorage.getItem('eventId')

    let alertMsg
    switch (action) {
    case 'DELETE_COLUMN':
        alertMsg = alertMsgDeleteColumn
        break
    case 'DELETE_TASK':
        alertMsg = alertMsgDeleteTask
        break
    case 'COLUMN_HAS_TICKETS':
        alertMsg = alertMsgColumnHasTickets
        break
    case 'DELETE_TASK_IF_SUBTASKS':
        alertMsg = alertMsgDeleteTaskIfSubtasks
        break
    case 'ARCHIVE_TASK_IF_SUBTASKS':
        alertMsg = alertMsgArchiveTaskIfSubtasks
        break
    case 'ARCHIVE_TASK':
        alertMsg = alertMsgArchiveTask
        break
    case 'ARCHIVE_SUBTASK':
        alertMsg = alertMsgArchiveSubtask
        break
    case 'DELETE_SUBTASK':
        alertMsg = alertMsgDeleteSubtask
        break
    default:
        break
    }

    const WhiteCheckbox = withStyles({
        root: {
            color: 'white',
            '&$checked': {
                color: 'white',
            },
        },
        checked: {},
    })((props) => <Checkbox color="default" {...props} />)

    const handleChecked = () => {
        toggleCheck(!check)
    }

    const archiveTaskById = () => {
        // Find the related subtasks and archive them
        const boardIdForCache = `Board:${boardId}`
        const columnData = client.readFragment({
            id: boardIdForCache,
            fragment: COLUMNORDER_AND_COLUMNS,
        })
        //gets "hidden" columns ID for archiving the task and subtask's
        const hiddenColumn = boards.data.boardById.columns.filter((column) => column.hidden === "hidden")
        const hiddenId = hiddenColumn[0].id
        const columnsSubtasks = columnData.columns.map((column) => column.subtasks).flat()
        //gets task's subtask's and archives them
        const subtasksToBeDeleted = columnsSubtasks.filter((subtask) => subtask.task.id === taskId)
        subtasksToBeDeleted.map((subtask) => archiveSubtaskById(subtask.id, subtask.column.id))
        // Handle cache
        removeTaskFromCache(taskId, columnId, boardId)
        // Send mutaion to the server
        archiveTask({
            variables: {
                taskId,
                columnId: hiddenId,
                boardId,
                eventId,
            },
        })
    }

    const archiveSubtaskById = (subtaskId, columnId) => {
        removeSubtaskFromCache(subtaskId, columnId)
        const hiddenColumn = boards.data.boardById.columns.filter((column) => column.hidden === "hidden")
        const hiddenId = hiddenColumn[0].id
        archiveSubtask({
            variables: {
                subtaskId,
                columnId: hiddenId,
                boardId,
                eventId,
            },
        })
    }

    const moveTasksToHiddenColumn = () => {
        try {
            const hiddenColumn = boards.data.boardById.columns.filter((column) => column.hidden === "hidden")
            const hiddenId = hiddenColumn[0].id
            archivedTasksByColumnId.data.archivedTasksByColumnId.map((task) => {
                editTask({
                    variables: {
                        taskId: task.id,
                        title: task.title,
                        storyPoints: task.storyPoints,
                        spentStoryPoints: task.spentStoryPoints,
                        ownerId: task.ownerId,
                        oldMemberIds: task.members,
                        newMemberIds: task.members,
                        oldColorIds: task.colors,
                        newColorIds: task.colors,
                        description: task.description,
                        eventId,
                        columnId: hiddenId,
                    },
                })
            })
        } catch (error) {
            
        }
    }

    const moveSubTasksToHiddenColumn = () => {
            const hiddenColumn = boards.data.boardById.columns.filter((column) => column.hidden === "hidden")
            const hiddenId = hiddenColumn[0].id
            archivedSubTasksByColumnId.data.archivedSubTasksByColumnId.map((subTask) => {           
                editSubTask({
                    variables: {
                        id: subTask.id,
                        name: subTask.name,
                        content: subTask.content,
                        storyPoints: subTask.storyPoints,
                        spentStoryPoints: subTask.spentStoryPoints,
                        ownerId: subTask.ownerId,
                        oldMemberIds: subTask.members,
                        newMemberIds: subTask.members,
                        oldColorIds: subTask.colors,
                        newColorIds: subTask.colors,
                        eventId,
                        columnId: hiddenId,
                    },
                })
            })
    }

    const deleteColumn = () => {
        moveTasksToHiddenColumn()
        moveSubTasksToHiddenColumn()
    //   let test = archivedTasksByColumnId.data.archivedTasksByColumnId[0]
     //  editTaskColumn({variables: { taskId: test.id, eventId, columnId: hiddenId}})
    //    }
        deleteColumnFromCache(columnId, boardId)
        callDeleteColumn({
            variables: {
                columnId,
                boardId,
                eventId,
            },
        })
    }

 

    const deleteSubtask = (subtaskId, columnId) => {
        removeSubtaskFromCache(subtaskId, columnId)
        callDeleteSubtask({
            variables: {
                subtaskId,
                columnId,
                boardId,
                eventId,
            },
        })
    }

    const deleteTask = () => {
        const columns = boards.data.boardById.columns
        const column = columns.filter((column) => column.id === columnId)
        const tasks = column[0].tasks
        const subtasks = tasks[0].subtasks
        subtasks.map ((subtask) => deleteSubtask(subtask.id, subtask.column.id))

        // Remove task from cache
        removeTaskFromCache(taskId, columnId, boardId)
        // Send mutation
        callDeleteTask({
            variables: {
                taskId,
                columnId,
                boardId,
                eventId,
            },
        }) 
    }

    const handleDelete = () => {
        if (action === 'DELETE_TASK' || action === 'DELETE_TASK_IF_SUBTASKS') {
            deleteTask()
        }
        if (action === 'DELETE_COLUMN') {
            deleteColumn()
        }
        if (action === 'DELETE_SUBTASK') {
            deleteSubtask(subtaskId, columnId)
        }
    }

    const handleUndo = () => {
        toggleAlertDialog()
    }

    const handleArchive = () => {
        if (action === 'ARCHIVE_TASK' || action === 'ARCHIVE_TASK_IF_SUBTASKS') {
            archiveTaskById()
        }
        if (action === 'ARCHIVE_SUBTASK') {
            archiveSubtaskById(subtaskId, columnId)
        }
    }

    return (
        <Grid item>
            <Dialog
                classes={alertDialogStatus ? { root: classes.dialogFocus } : { root: classes.dialogUnfocus }}
                open={alertDialogStatus}
                onClose={toggleAlertDialog}
            >
                <Alert variant="filled" severity="error">
                    <Grid item container direction="column" spacing={2}>
                        <Grid item>
                            <span id="alertMessage">{alertMsg}</span>
                        </Grid>
                        {action === 'DELETE_TASK_IF_SUBTASKS' || action === 'ARCHIVE_TASK_IF_SUBTASKS'
                            ? (
                                <Grid item container direction="row" alignItems="center">
                                    <p>{t('alertBox.understand')}</p>
                                    <WhiteCheckbox
                                        checked={check}
                                        onChange={handleChecked}
                                        size="small"
                                    />
                                </Grid>
                            )
                            : null}
                        <Grid item container direction="row" justifyContent="flex-end">
                            <Button size="small" variant="contained" onClick={() => handleUndo()} classes={{ root: classes.undoAlertButton }}>
                                {action === 'COLUMN_HAS_TICKETS' ? t('alertBox.close') : t('alertBox.undo')}
                            </Button>
                            {action === 'DELETE_TASK' || action === 'DELETE_COLUMN' || action === 'DELETE_SUBTASK' || action === 'DELETE_TASK_IF_SUBTASKS'
                                ? (
                                    <Button
                                        size="small"
                                        color="secondary"
                                        variant="contained"
                                        onClick={() => handleDelete()}
                                        classes={{ root: classes.deleteAlertButton }}
                                        disabled={action === 'DELETE_TASK_IF_SUBTASKS' && !check}
                                    >
                                        {t('alertBox.delete')}
                                    </Button>
                                )
                                : null}
                            {action === 'ARCHIVE_TASK' || action === 'ARCHIVE_SUBTASK' || action === 'ARCHIVE_TASK_IF_SUBTASKS'
                                ? (
                                    <Button
                                        size="small"
                                        variant="contained"
                                        onClick={() => handleArchive()}
                                        classes={{ root: classes.archiveAlertButton }}
                                        disabled={action === 'ARCHIVE_TASK_IF_SUBTASKS' && !check}
                                    >
                                        {t('alertBox.archive')}
                                    </Button>
                                )
                                : null}
                        </Grid>
                    </Grid>
                </Alert>
            </Dialog>
        </Grid>
    )
}
export default AlertBox
