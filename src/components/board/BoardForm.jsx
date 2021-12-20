import React, { useState } from 'react'
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
} from '@mui/material'
import Delete from '@mui/icons-material/DeleteOutlined'
import { useTranslation } from 'react-i18next'
import allBoardsByProject from '../../graphql/project/hooks/useBoardsByProjectId'
import DeleteBoardPopup from './DeleteBoardPopup'

const NewBoardForm = ({ setOpen, open }) => {
    const [board, setBoard] = useState()
    const { t, i18n } = useTranslation('common')
    const allBoardById = allBoardsByProject(
        window.localStorage.getItem('projectId'),
    )
    const [popupIsOpen, setPopupIsOpen] = useState(false)
    const [popp, setPopp] = useState(false)
    const closePopup = () => setPopupIsOpen(false)

    if (allBoardById.loading) return null

    const popup = async (board) => {
        setPopp(true)
        setPopupIsOpen(true)
        setBoard(board)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const boards = allBoardById.data.boardsByProjectId
    let deleteBoards = boards

    const boardsList = (boards) => {
        deleteBoards = boards.slice().sort((a, b) => a.orderNumber - b.orderNumber)
        return (
            <div>
                <table>
                    <tbody>
                        {deleteBoards.map((board, index) => (
                            <tr key={index}>
                                <td>
                                    {board.name}
                                    {' '}
                                </td>
                                <td>
                                    <Delete
                                        fontSize="default"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => popup(board)}
                                    />
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
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">{t('boardForm.board')}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{t('boardForm.boardtoremove')}</DialogContentText>
                    {boardsList(deleteBoards)}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
            {popp === true ? (
                <DeleteBoardPopup
                    open={popupIsOpen}
                    handleClose={closePopup}
                    board={board}
                />
            ) : (
                <div />
            )}
        </div>
    )
}
export default NewBoardForm
