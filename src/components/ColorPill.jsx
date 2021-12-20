import React from 'react'
import { boardPageStyles } from '../styles/styles'
import { Grid } from '@mui/material'

const ColorPill = ({ color }) => {
    const classes = boardPageStyles()
    return (
        <Grid item container>
            <Grid item style={{ backgroundColor: `${color}` }} classes={{ root: classes.colorPill }} />
        </Grid>
    )
}
export default ColorPill