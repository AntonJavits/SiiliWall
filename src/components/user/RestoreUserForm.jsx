import React, { useState } from 'react'
import {
    Dialog, DialogActions, DialogContent, DialogContentText,
    DialogTitle, Button,
} from '@mui/material'
import UnarchiveOutlinedIcon from '@mui/icons-material/UnarchiveOutlined';
import useArchivedUsers from '../../graphql/user/hooks/useArchivedUsers'
import useRestoreUser from '../../graphql/user/hooks/useRestoreUser'
import bubbleSort from '../bubblesort'
const eventId = window.localStorage.getItem('eventId')
const projectId = window.localStorage.getItem('projectId')

const RestoreUserForm = ({ setOpen, open, currentProject }) => {
    const archivedUsers = useArchivedUsers()
    const [restoreUser] = useRestoreUser()

    console.log('eventId: ', eventId);

    if (archivedUsers.loading) return null

    const handleClose = () => {
        setOpen(false)
    }

    const handleRestoreClick = (user) => {
      console.log('user to restore: ', user.id)
        restoreUser({
          variables: {
               id: user.id,
               userName: user.userName,
            },
       })   
    }
    
    const usersInCurrentProject = archivedUsers.data.archivedUsers.filter((u) => u.projectId === currentProject)
    const sortedUsers = bubbleSort(usersInCurrentProject)

    const usersList = () => {
      return (
          <div>
              <table>
                  <tbody>
                      {sortedUsers.map((userToRestore) => (
                          <tr key={userToRestore.id}>
                              <td>
                                      {userToRestore.userName.substring(0, userToRestore.userName.length - 14)}
                                      {" "}
                              </td>
                              <td>
                                  <UnarchiveOutlinedIcon style={{ cursor: 'pointer' }} onClick={() => handleRestoreClick(userToRestore)} />
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
                <DialogTitle id="form-dialog-title">Restore User</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Select user to restore
                    </DialogContentText>
                    {usersList()} 
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">OK</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
export default RestoreUserForm
