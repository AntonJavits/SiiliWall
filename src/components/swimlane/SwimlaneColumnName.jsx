import React from 'react'
import { Grid, Divider } from '@mui/material'
import { swimlaneStyles } from '../../styles/styles'

const SwimlaneColumnName = ({ column, isLeftMost }) => {
    const classes = swimlaneStyles()

    return (
        <Grid item container direction="row" classes={{ root: classes.swimlaneColumnGrid }} key={column.id}>
            <Grid item container classes={{ root: classes.swimlaneColumnNameGrid }} alignItems='center' justifyContent='space-between'>
                <Grid item classes={{ root: classes.swimlaneColumnName }}><p>{column.name}</p></Grid>
                <Grid item classes={{ root: classes.swimlaneNumberOfTasks }}><p>{column.tasks.length}</p></Grid>
            </Grid>
            {!isLeftMost && (
                <Grid item classes={{ root: classes.swimlaneColumnDivider }}><Divider orientation="vertical" /></Grid>
            )}
        </Grid>
    );
}
export default SwimlaneColumnName