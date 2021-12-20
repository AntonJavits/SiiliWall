/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react'
import { Grid } from '@mui/material'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { useApolloClient } from '@apollo/client'
import { useSnackbar } from 'notistack'
import ColumnList from '../column/ColumnList'
import useMoveTicketInColumn from '../../graphql/ticket/hooks/useMoveTicketInColumn'
import useMoveTicketFromColumn from '../../graphql/ticket/hooks/useMoveTicketFromColumn'
import useMoveColumn from '../../graphql/column/hooks/useMoveColumn'
import { onDragEnd } from '../../utils/onDragEnd'
import SnackbarAlert from '../SnackbarAlert'
import '../../styles.css'

const Board = ({ board, eventId, color, user, searchTerm }) => {
    const [moveTicketInColumn] = useMoveTicketInColumn()
    const [moveTicketFromColumn] = useMoveTicketFromColumn()
    const [moveColumn] = useMoveColumn()
    const client = useApolloClient()
    const [snackbarMessage, setSnackbarMessage] = useState(null)
    const { enqueueSnackbar } = useSnackbar()
    useEffect((message) => {
        setSnackbarMessage(message)
    }, [])
    const { columnOrder, columns } = board
    return (
        <Grid item container sx={{ height: 1 }}>
            <DragDropContext onDragEnd={(result) => onDragEnd(
                result, moveTicketInColumn, moveTicketFromColumn, moveColumn, client, columns, board, enqueueSnackbar,
            )}
            >

                <Droppable droppableId={board.id} direction="horizontal" type="column">
                    {(provided) => (
                        <Grid
                            item
                            container
                            sx={{ height: 1 }}
                            direction="row"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            spacing={0}
                        >
                            <Grid item container sx={{ height: 1 }}>
                                <ColumnList columns={columns} columnOrder={columnOrder} boardId={board.id} searchTerm = {searchTerm} color={color} user={user} />
                            </Grid>
                            {provided.placeholder}

                        </Grid>
                    )}
                </Droppable>

            </DragDropContext>
            <SnackbarAlert message={snackbarMessage} />
        </Grid>
    )
}
export default Board
