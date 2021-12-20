import React from 'react'
import { Grid } from '@mui/material'
import Swimlane from './Swimlane'

const SwimlaneList = ({ tasksInOrder, showAll, boardId }) => {

    return (
        <Grid container direction="column">
            {tasksInOrder.map((task, index) => <Grid item key={task.id} index={index}><Swimlane tasksInOrder={tasksInOrder} task={task} index={index} showAll={showAll} boardId={boardId} /></Grid>)}
        </Grid>
    )
}
export default SwimlaneList
