import React, { useState } from 'react'
import {
    Menu, MenuItem, Button, ListItemIcon, ListItemText, Grid,
} from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Delete from '@mui/icons-material/Delete'
import { useApolloClient } from '@apollo/client'
import { TICKETORDER } from '../../graphql/fragments'
import AlertBox from '../AlertBox'
import { boardPageStyles } from '../../styles/styles'
import {useTranslation} from "react-i18next"

const DropdownColumn = ({ columnId, boardId }) => {
    const [anchorEl, setAnchorEl] = useState(null)
    const [action, setAction] = useState(null)
    const [alertDialogStatus, setAlertDialogStatus] = useState(false)
    const classes = boardPageStyles()
    const client = useApolloClient()
    const {t, i18n} = useTranslation('common')

    const { ticketOrder } = client.readFragment({
        id: `Column:${columnId}`,
        fragment: TICKETORDER,
    })
    const hasTickets = ticketOrder.length

    const toggleAlertDialog = () => setAlertDialogStatus(!alertDialogStatus)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const openAlertDialog = (order) => {
        setAction(order)
        toggleAlertDialog()
        setAnchorEl(null)
    }

    

//<MenuItem onClick={() => <FilterDialog openDialog={setPopupIsOpen} closeDialog={closePopup}/>}>
    return (
        <Grid item>
            <Button
                aria-owns={anchorEl ? 'simple-menu' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
                classes={{ root: classes.columnButton }}
            >
                <MoreVertIcon className="dropDownColumn" classes={{ root: classes.columnButtonIcons }} />
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
                selected
            >
                <MenuItem onClick={() => openAlertDialog(hasTickets ? 'COLUMN_HAS_TICKETS' : 'DELETE_COLUMN')}>
                    <ListItemIcon>
                        <Delete fontSize="default" />
                    </ListItemIcon>
                    <ListItemText primary={t('dropdownColumn.remove')} />
                </MenuItem>
            </Menu>
            <AlertBox
                alertDialogStatus={alertDialogStatus}
                toggleAlertDialog={toggleAlertDialog}
                columnId={columnId}
                boardId={boardId}
                action={action}
            />
        </Grid>
    )
}
export default DropdownColumn
