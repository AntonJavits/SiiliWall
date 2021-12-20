import React from 'react'
import { Grid } from '@mui/material'
import { swimlaneStyles } from '../../styles/styles'
import SwimlaneColumn from './SwimlaneColumn'

const SwimlaneColumnList = ({ swimlaneColumns, taskId }) => {
    const classes = swimlaneStyles()
    const mostSubtasks = Math.max(...swimlaneColumns.map((swimlaneColumn) => swimlaneColumn.subtasks.length))
    return (
        <Grid
            container
            direction="row"
            justifyContent="space-evenly"
            classes={{ root: classes.swimlaneColumnList }}
        >
            {swimlaneColumns.map((swimlaneColumn, index) => (
                <Grid item key={swimlaneColumn.id}>
                    <SwimlaneColumn
                        swimlaneColumn={swimlaneColumn}
                        taskId={taskId}
                        isTheLeftMost={index === swimlaneColumns.length - 1}
                        mostSubtasks={mostSubtasks}
                    />
                </Grid>
            ))}
        </Grid>
    )
}
export default SwimlaneColumnList
