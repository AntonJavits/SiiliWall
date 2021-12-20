import React, { useState } from 'react'
import {
    Dialog, DialogActions, DialogContent, DialogContentText,
    DialogTitle, Button,
} from '@mui/material/'
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import useAllUser from '../../graphql/user/hooks/useAllUsers'
import bubbleSort from '../bubblesort'
import ArchiveUserConfirmation from './ArchiveUserConfirmation'

const ArchiveUserForm = ({ setOpen, open, currentProject }) => {
    const [user, setUser] = useState()
    const allUser = useAllUser()
    const [popupIsOpen, setPopupIsOpen] = React.useState(false)
    const [popp, setPopp] = useState(false)

    if (allUser.loading) return null

    const projectId = window.localStorage.getItem('projectId')
    const closePopup = () => setPopupIsOpen(false)

    const popup = async (userToArchive) => {
        setPopp(true)
        setPopupIsOpen(true)
        setUser(userToArchive)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const users = allUser.data.allUsers.filter((u) => u.projectId === currentProject && !u.userName.includes(' (Removed user)'))
    let archiveUsers = bubbleSort(users)
    const usersList = () => {
        return (
            <div>
                <table>
                    <tbody>
                        {archiveUsers.map((userToArchive) => (
                            <tr key={userToArchive.id}>
                                <td>
                                    {userToArchive.userName} 
                                    {' '}
                                </td>
                                <td>
                                    <ArchiveOutlinedIcon style={{ cursor: 'pointer' }} onClick={() => popup(userToArchive)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }

    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Archive User</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Select user to archive
                    </DialogContentText>
                    {usersList()}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">OK</Button>
                </DialogActions>
            </Dialog>
            {popp === true ? (
                <ArchiveUserConfirmation
                    open={popupIsOpen}
                    handleClose={closePopup}
                    user={user}
                />
            ) : <div />}
        </div>
    )
}
export default ArchiveUserForm
