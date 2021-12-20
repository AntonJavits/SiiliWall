import React, { useState } from 'react'
import {
    Menu, MenuItem, Button, ListItemIcon, ListItemText, Grid,
} from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Delete, Archive } from '@mui/icons-material'
import { boardPageStyles } from '../../styles/styles'
import AlertBox from '../AlertBox'
import { BOARD_ID_BY_COLUMN_ID } from '../../graphql/fragments'
import { useApolloClient } from '@apollo/client'
import {useTranslation} from "react-i18next"

const DropdownSubtask = ({ columnId, subtaskId }) => {
    const [anchorEl, setAnchorEl] = useState(null)
    const classes = boardPageStyles()
    const [alertDialogStatus, setAlertDialogStatus] = useState(false)
    const [action, setAction] = useState(null)
    const client = useApolloClient()
    const {t, i18n} = useTranslation('common')
    const columnIdForCache = `Column:${columnId}`

    const columnData = client.readFragment({
        id: columnIdForCache,
        fragment: BOARD_ID_BY_COLUMN_ID
    })
    const boardId = columnData.board.id
    const toggleAlertDialog = () => setAlertDialogStatus(!alertDialogStatus)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const openAlertDialog = (order) => {
        setAction(order)
        setAlertDialogStatus(true)
        setAnchorEl(null)
    }

    return (
        <Grid item container direction='row' justifyContent='flex-end' alignItems='center' >
            <Button
                aria-owns={anchorEl ? 'simple-menu' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
                classes={{ root: classes.subtaskDropdownButton }}
            >
                <MoreVertIcon classes={{ root: classes.subtaskButtonIcons }} />
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                getContentAnchorEl={null}
                elevation={0}
            >
                <MenuItem onClick={() => openAlertDialog('ARCHIVE_SUBTASK')}>
                    <ListItemIcon>
                        <Archive />
                    </ListItemIcon>
                    <ListItemText primary={t('dropdownSubtask.archive')} />
                </MenuItem>
                <MenuItem onClick={() => openAlertDialog('DELETE_SUBTASK')}>
                    <ListItemIcon>
                        <Delete />
                    </ListItemIcon>
                    <ListItemText primary={t('dropdownSubtask.remove')} />
                </MenuItem>
            </Menu>
            <AlertBox
                alertDialogStatus={alertDialogStatus}
                toggleAlertDialog={toggleAlertDialog}
                action={action}
                subtaskId={subtaskId}
                columnId={columnId}
                boardId={boardId}
            />
        </Grid>
    )
}
export default DropdownSubtask
