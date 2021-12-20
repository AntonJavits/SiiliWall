/* eslint-disable no-shadow */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { Grid, Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { boardPageStyles } from '../../styles/styles'
import TicketList from '../TicketList'
import DropdownColumn from './DropdownColumn'
import AddTaskDialog from '../task/AddTaskDialog'
import RenameColumn from './RenameColumn'

const Column = ({
    column, index, color, user, searchTerm,
}) => {
    const classes = boardPageStyles()
    const {
        tasks, ticketOrder, subtasks, board,
    } = column
    const [dialogStatus, setDialogStatus] = useState(false)
    const toggleDialog = () => setDialogStatus(!dialogStatus)

    return (
        <Draggable draggableId={column.id} index={index}>
            {(provided, snapshot) => (
                <Grid
                    item
                    container
                    direction="row"
                    classes={snapshot.isDragging
                        ? { root: classes.columnIsDragging }
                        : { root: classes.column }}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    spacing={2}
                >
                    <Grid classes={{ root: classes.columnHeader }} item container direction="row" justifyContent="space-between" {...provided.dragHandleProps}>
                        <Grid item>
                            <RenameColumn editId={column.id} column={column} />
                        </Grid>
                        <Grid item container direction="row" alignItems="center" justifyContent="flex-end" classes={{ root: classes.columnButtonGrid }}>
                            <Grid item>

                                <Button classes={{ root: classes.columnButton }} onClick={toggleDialog}>
                                    <AddIcon classes={{ root: classes.columnButtonIcons }} />
                                </Button>
                            </Grid>
                            <Grid item>
                                <DropdownColumn columnId={column.id} boardId={column.board.id} />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Droppable droppableId={column.id} type="task">
                        {(provided, snapshot) => (
                            <Grid
                                item
                                container
                                classes={snapshot.isdraggingover
                                    ? { root: classes.ticketListDraggingOver }
                                    : { root: classes.ticketList }}
                                isDraggingOver={snapshot.isDraggingOver}
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                <Grid
                                    item
                                    container
                                    alignItems="flex-start"
                                >
                                    <TicketList
                                        tasks={tasks}
                                        subtasks={subtasks}
                                        ticketOrder={ticketOrder}
                                        columnId={column.id}
                                        boardId={board.id}
                                        color={color}
                                        user={user}
                                        column={column}
                                        searchTerm={searchTerm}
                                    />
                                </Grid>
                                {provided.placeholder}
                            </Grid>
                        )}
                    </Droppable>
                    <Grid item>
                        <AddTaskDialog
                            dialogStatus={dialogStatus}
                            toggleDialog={toggleDialog}
                            column={column}
                            boardId={board.id}
                        />
                    </Grid>
                </Grid>
            )}
        </Draggable>
    )
}
export default Column
