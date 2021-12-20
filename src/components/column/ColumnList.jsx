import React, { useState } from 'react'
import { Grid, TextField, Button } from '@mui/material'
import Column from './Column'
import { boardPageStyles } from '../../styles/styles'
import useAddColumn from '../../graphql/column/hooks/useAddColumn'
import {useTranslation} from "react-i18next"

const ColumnList = ({ columns, columnOrder, boardId, color, user, searchTerm }) => {
    const classes = boardPageStyles()
    const [columnName, setColumnName] = useState('')
    const [addButtonDisabled, setAddButtonDisabled] = useState(true)
    const [addColumn] = useAddColumn()
    const {t, i18n} = useTranslation('common')
    
    const handleChange = (event) => {
        setColumnName(event.target.value)
        setAddButtonDisabled(!event.target.value.length > 0)
    }

    const handleSave = () => {
        const eventId = window.localStorage.getItem('eventId')
        addColumn({
            variables: {
                boardId,
                columnName,
                eventId,
                hidden: "visible",
            },
        })
        setColumnName('')
        setAddButtonDisabled(true)
    }

    const handleEventKeyPress = (event) => {
        if (event.key === 'Enter' && !addButtonDisabled) {
            handleSave()
        }
    }
    const handleEventKey = (e) => {
        if(e.key === 'Enter' && columnName !== '') {handleSave()}
         
     }

    const newColumnOrder = columnOrder.map((id) => columns.find((column) => column.id === id))
    return (
        <Grid container direction="row" spacing={4} classes={{ root: classes.columnRow }} sx={{ height: 1 }}>
            {newColumnOrder.map((column, index) => (
                <>
                {column.hidden === "visible" ? 
                    <Grid item key={column.id}>
                        <Column column={column} searchTerm = {searchTerm} index={index} color={color} user={user}/>
                    </Grid>
                    :
                    <></>
                }
                </>
            ))}
            <Grid item classes={{ root: classes.addColumn }}>
                <TextField
                    variant="standard"
                    margin="dense"
                    name="title"
                    label={t('columnList.name')}
                    type="text"
                    value={columnName}
                    fullWidth
                    onChange={handleChange}
                    onKeyPress={handleEventKeyPress}
                    id="inputColumnName"
                    onKeyPress = {handleEventKey}
                />
                <Button
                    disabled={addButtonDisabled}
                    color="primary"
                    onClick={handleSave}
                    id="addColumnButton"
                >
                    {t('columnList.add')}
                </Button>
            </Grid>
        </Grid>
    )
}
export default ColumnList
