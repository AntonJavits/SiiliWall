/* eslint-disable array-callback-return */
/* eslint-disable max-len */
import React, { useState } from 'react'
import { Grid, Button, Container } from '@mui/material'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { useApolloClient } from '@apollo/client'
import SwimlaneViewHeader from './SwimlaneViewHeader'
import SwimlaneList from './SwimlaneList'
import { onDragEndSwimlane } from '../../utils/onDragEndSwimlane'
import useMoveTicketInColumn from '../../graphql/ticket/hooks/useMoveTicketInColumn'
import useMoveTicketFromColumn from '../../graphql/ticket/hooks/useMoveTicketFromColumn'
import useMoveSwimlane from '../../graphql/task/hooks/useMoveSwimlane'
import AddTaskDialog from '../task/AddTaskDialog'
import { swimlaneStyles } from '../../styles/styles'

const SwimlaneView = ({ board }) => {
    // Modifying data's form to match the needs of swimlane components
    // Basically we want to each task to contain its subtasks
    // and have them divided by columns they exist at
    // These units are called swimlaneColumns
    const [moveTicketInColumn] = useMoveTicketInColumn()
    const [moveTicketFromColumn] = useMoveTicketFromColumn()
    const [moveSwimlane] = useMoveSwimlane()
    const [showAll, setShowAll] = useState(null)
    const [dialogStatus, setDialogStatus] = useState(false)
    const client = useApolloClient()
    const classes = swimlaneStyles()

    const toggleDialog = () => setDialogStatus(!dialogStatus)

    const { columns, swimlaneOrder } = board
    let tasks = []
    let subtasks = []

    columns.forEach((column) => {
        tasks = tasks.concat(column.tasks)
    })
    columns.forEach((column) => {
        subtasks = subtasks.concat(column.subtasks)
    })
    const tasksInCorrectOrder = swimlaneOrder.map((id) => tasks.find((task) => task.id === id)).filter((task) => task)
    const columnsInOrder = board.columnOrder.map((id) => columns.find((column) => column.id === id))

    const columnsForSwimlaneViewHeader = columnsInOrder.map((column) => ({ id: column.id, name: column.name, tasks: column.tasks }))
    // This object is passed to swimlaneList
    const tasksInOrder = tasksInCorrectOrder.map((task) => {
        const swimlaneColumns = columnsInOrder.map((column) => {
            // figure out task's subtasks in certain column
            const subtasksOfTaskInColumn = subtasks.filter((subtask) => {
                if (subtask.task.id === task.id && subtask.column.id === column.id) {
                    return subtask
                }
            })
            // Figure out the subtask order of task's subtasks in certain column
            // Loop through the ticketOrder of the column and pick up the ticketOrder objects
            // belonging to the subtasks of the task
            const subtaskOrder = column.ticketOrder.filter((obj) => subtasksOfTaskInColumn.map((subtask) => subtask.id).includes(obj.ticketId))
            const subtasksInOrder = subtaskOrder.map((obj) => subtasksOfTaskInColumn.find((subtask) => subtask.id === obj.ticketId))
            // Add the real order index for subtask
            const subtasksInColumnFinal = subtasksInOrder.map((subtask) => {
                const realOrderIndex = column.ticketOrder.findIndex((obj) => obj.ticketId === subtask.id)
                return { ...subtask, index: realOrderIndex }
            })

            return {
                name: column.name, id: column.id, subtasks: subtasksInColumnFinal,
            }
        })
        return { ...task, swimlaneColumns }
    })

    const handleShowClick = () => {
        setShowAll(true)
    }

    const handleHideClick = () => {
        setShowAll(false)
    }

    return (
        <DragDropContext onDragEnd={(result) => onDragEndSwimlane(result, moveTicketInColumn, moveTicketFromColumn, moveSwimlane, columns, client, tasksInOrder, board.id)}>
            <Grid container direction="column">
                <Container 
                    maxWidth="false"
                    direction="row"
                    alignItems="top"
                    sx={{ pt: [2, 2], pb: [2, 3], ml: [1,1], mr:[1, 1] }}>
                        <Grid 
                            item 
                            container 
                            alignItems='baseline' 
                            justifyContent='flex-start' 
                            direction='row'
                            spacing={{xs:1, md:2}}
                            columns={{xs: 3, sm: 6, md: 12}}>
                            <Grid item xs={3} sm={3} md={4}>
                                <Button onClick={() => toggleDialog()} disabled={columns.length === 0} classes={{ root: classes.swimlaneAddTaskButton }}>Add task</Button>
                            </Grid>
                            <Grid item xs={3} sm={3} md={4}>
                                <Button onClick={() => handleHideClick()} disabled={tasks.length === 0} classes={{ root: classes.swimlaneHideButton }}>Hide all swimlanes</Button>
                            </Grid>
                            <Grid item xs={3} sm={3} md={4}>
                                <Button onClick={() => handleShowClick()} disabled={tasks.length === 0} classes={{ root: classes.swimlaneShowButton }}>Expand all swimlanes</Button>
                            </Grid>
                        </Grid>
                    </Container>
                <Grid item>
                    <SwimlaneViewHeader columns={columnsForSwimlaneViewHeader} />
                </Grid>
                <Droppable droppableId={board.id} direction="vertical" type="swimlane">
                    {(provided) => (
                        <Grid item {...provided.droppableProps} ref={provided.innerRef}>
                            <SwimlaneList tasksInOrder={tasksInOrder} showAll={showAll} boardId={board.id} />
                            {provided.placeholder}
                        </Grid>
                    )}
                </Droppable>
            </Grid>
            <AddTaskDialog
                dialogStatus={dialogStatus}
                toggleDialog={toggleDialog}
                column={columnsInOrder[1]}
                boardId={board.id}
            />
        </DragDropContext>
    )
}
export default SwimlaneView
