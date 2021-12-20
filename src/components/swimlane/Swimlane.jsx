/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react'
import { Grid, Divider } from '@mui/material'
import { Draggable } from 'react-beautiful-dnd'
import { swimlaneStyles } from '../../styles/styles'
import SwimlaneColumnList from './SwimlaneColumnList'
import SwimlaneHeaderRow from './SwimlaneHeaderRow'
import ProgressBarComponent from './ProgressBarComponent'
import TaskEditDialog from '../task/EditTaskDialog'

const Swimlane = ({
    task, index, showAll, boardId,
}) => {
    const classes = swimlaneStyles()
    const [show, setShow] = useState(false)
    const [editTaskDialogStatus, setEditTaskDialogStatus] = useState(false)
    const toggleEditTaskDialog = () => {
        setEditTaskDialogStatus(!editTaskDialogStatus)
    }
    // Calculate the percentage for progressBar
    const percentageForProgressBar = ((task.swimlaneColumns
        .findIndex((swimlaneColumn) => swimlaneColumn.id === task.column.id) + 1) / task.swimlaneColumns.length) * 100

    useEffect(() => {
        if (showAll === null) return
        setShow(showAll)
    }, [showAll])

    const handleShowClick = (e) => {
        e.stopPropagation()
        setShow(!show)
    }

    const numberOfSubtasks = task.swimlaneColumns
        .reduce((acc, cur) => parseInt(acc + cur.subtasks.length, 10), 0)

    return (
        <Draggable draggableId={task.id} index={index}>
            {(provided) => (
                <Grid
                    container
                    direction="column"
                    classes={{ root: classes.swimlane }}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <Grid item><ProgressBarComponent percentage={percentageForProgressBar} /></Grid>
                    <SwimlaneHeaderRow
                        task={task}
                        boardId={boardId}
                        columnId={task?.column?.id}
                        prettyId={task.prettyId}
                        title={task.title}
                        numberOfSubtasks={numberOfSubtasks}
                        handleShowClick={handleShowClick}
                        toggleEditTaskDialog={toggleEditTaskDialog}
                        show={show}
                    />
                    {show
                        && (
                            <Grid item classes={{ root: classes.test }}>
                                <Divider />
                                <SwimlaneColumnList swimlaneColumns={task.swimlaneColumns} taskId={task.id} />
                            </Grid>
                        )}
                    <TaskEditDialog
                        dialogStatus={editTaskDialogStatus}
                        toggleDialog={toggleEditTaskDialog}
                        editId={task.id}
                        task={task}
                        boardId={boardId}
                        modifyTask={false}
                    />
                </Grid>

            )}
        </Draggable>

    )
}
export default Swimlane
