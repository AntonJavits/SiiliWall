import React from 'react'
import { SnackbarProvider, useSnackbar } from 'notistack'

const SnackbarAlert = ({ message }) => {
    const { enqueueSnackbar } = useSnackbar()
    if (message != null) {
        enqueueSnackbar(message)
    }

    return (
        <SnackbarProvider
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        />
    )
}

export default SnackbarAlert
