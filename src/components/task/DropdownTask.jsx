import React, { useState } from 'react'
import {
    Menu, MenuItem, Button, ListItemIcon, ListItemText, Grid, IconButton,
} from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import {
    Delete, Archive, Add,
} from '@mui/icons-material'
import { useApolloClient } from '@apollo/client'
import AlertBox from '../AlertBox'
import AddSubtaskDialog from '../subtask/AddSubtaskDialog'
import { boardPageStyles } from '../../styles/styles'
import { COLUMNORDER_AND_COLUMNS } from '../../graphql/fragments'
import {useTranslation} from "react-i18next"
import useBoardById from '../../graphql/board/hooks/useBoardById'

const DropdownTask = ({
    columnId, task, boardId, calledFromSwimlane,
}) => {
    const [anchorEl, setAnchorEl] = useState(null)
    const [action, setAction] = useState(null)
    const [count, setCount] = useState(null)
    const [alertDialogStatus, setAlertDialogStatus] = useState(false)
    const [addDialogStatus, setAddDialogStatus] = useState(false)
    const {t, i18n} = useTranslation('common')
    const classes = boardPageStyles()
    const client = useApolloClient()
    const boards = useBoardById(boardId)

    const toggleAddDialog = (e) => {
        e.stopPropagation()
        setAnchorEl(null)
        setAddDialogStatus(!addDialogStatus)
    }
    const toggleAlertDialog = () => setAlertDialogStatus(!alertDialogStatus)

    const handleClick = (e) => {
        e.stopPropagation()
        setAnchorEl(e.currentTarget)
    }

    const openAlertDialog = (order) => {
        const columns = boards.data.boardById.columns
        const column = columns.filter((column) => column.id === columnId)
        const tasks = column[0].tasks
        const chosenTask = tasks.filter((task1) => task1.id === task.id)
        const subtasks = chosenTask[0].subtasks
        const archivedSubtasks = subtasks.filter((subtask) => subtask.deletedAt === null)

        if (order === 'DELETE_TASK' && subtasks.length) {
            setCount(subtasks.length)
            setAction('DELETE_TASK_IF_SUBTASKS')
            setAlertDialogStatus(true)
            setAnchorEl(null)
            return
        }
        if (order === 'ARCHIVE_TASK' && archivedSubtasks.length) {
            setCount(archivedSubtasks.length)
            setAction('ARCHIVE_TASK_IF_SUBTASKS')
            setAlertDialogStatus(true)
            setAnchorEl(null)
            return
        }
        setAction(order)
        setAlertDialogStatus(true)
        setAnchorEl(null)
    }
    return (
        <Grid item container direction="row" justifyContent="flex-end" alignItems="center">
            <Grid>
                {calledFromSwimlane
                    ? (
                        <IconButton
                            aria-owns={anchorEl ? 'simple-menu' : undefined}
                            aria-haspopup="true"
                            onClick={(e) => handleClick(e)}
                            size="large">
                            <MoreVertIcon />
                        </IconButton>
                    )
                    : (
                        <Button
                            aria-owns={anchorEl ? 'simple-menu' : undefined}
                            aria-haspopup="true"
                            onClick={handleClick}
                            classes={{ root: classes.taskDropdownButton }}
                        >
                            <MoreVertIcon classes={{ root: classes.taskButtonIcons }} />
                        </Button>
                    )}
            </Grid>

            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                getContentAnchorEl={null}
                elevation={0}
            >
                <MenuItem onClick={(e) => toggleAddDialog(e)}>
                    <ListItemIcon>
                        <Add />
                    </ListItemIcon>
                    <ListItemText primary={t('dropdownTask.createSubtask')} />
                </MenuItem>
                <MenuItem onClick={() => openAlertDialog('ARCHIVE_TASK')}>
                    <ListItemIcon>
                        <Archive />
                    </ListItemIcon>
                    <ListItemText primary={t('dropdownTask.archive')} />
                </MenuItem>
                <MenuItem onClick={() => openAlertDialog('DELETE_TASK')}>
                    <ListItemIcon>
                        <Delete />
                    </ListItemIcon>
                    <ListItemText primary={t('dropdownTask.remove')}/>
                </MenuItem>
            </Menu>
            <AlertBox
                alertDialogStatus={alertDialogStatus}
                toggleAlertDialog={toggleAlertDialog}
                taskId={task.id}
                columnId={columnId}
                boardId={boardId}
                action={action}
                count={count}
            />
            <AddSubtaskDialog
                addDialogStatus={addDialogStatus}
                toggleAddDialog={toggleAddDialog}
                columnId={columnId}
                taskId={task.id}
                boardId={boardId}
            />
        </Grid>
    )
}
export default DropdownTask
