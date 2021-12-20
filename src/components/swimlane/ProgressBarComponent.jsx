import React, { useEffect } from 'react'
import LinearProgress from '@mui/material/LinearProgress'
import { swimlaneStyles } from '../../styles/styles'

const ProgressBarComponent = ({ percentage }) => {
    const [progress, setProgress] = React.useState(10)
    const classes = swimlaneStyles()

    useEffect(() => {
        setProgress(percentage)
    }, [])

    return (
        <>
            <LinearProgress
                variant="determinate"
                value={progress}
                classes={{
                    root: classes.progressBarRoot,
                    colorPrimary: classes.progressBarBackground,
                    barColorPrimary: classes.progressBarColor,
                }}
            />
        </>
    )
}

export default ProgressBarComponent
