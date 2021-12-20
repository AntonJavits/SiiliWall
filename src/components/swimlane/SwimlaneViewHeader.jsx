import React from 'react'
import { Grid } from '@mui/material'
import { swimlaneStyles } from '../../styles/styles'
import SwimlaneColumnName from './SwimlaneColumnName'

const SwimlaneViewHeader = ({ columns }) => {
    const classes = swimlaneStyles()
console.log('swimlanecolumns', columns)

    return (
        <Grid container direction="row" classes={{ root: classes.swimlaneColumnNames }}>
            {columns.map((column, index) => (
                  <>
                  {column.name !== "hidden" ? 
                  <Grid item key={column.id}>
                <SwimlaneColumnName column={column} isLeftMost={index === columns.length - 1} />
                </Grid>
                :
                <></>
            }
            </>
              ))}
        </Grid>
        
    )

}
export default SwimlaneViewHeader


