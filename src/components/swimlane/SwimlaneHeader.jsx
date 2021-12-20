import React from 'react'
import { Grid } from '@mui/material'
import { swimlaneStyles } from '../../styles/styles'

const SwimlaneHeader = ({ prettyId, title }) => {
    const classes = swimlaneStyles()

    return (
        <Grid container direction="row" classes={{ root: classes.swimlaneHeader }}>
            <Grid item container direction="row" classes={{ root: classes.swimlaneTitle }}>
                <Grid item><p>{prettyId}</p></Grid>
                <Grid item><b>{title}</b></Grid>
            </Grid>
        </Grid>
    )
}
export default SwimlaneHeader
