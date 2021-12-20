/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react'
import { Grid, Divider } from '@mui/material'
import { Draggable } from 'react-beautiful-dnd'
import { useTranslation } from 'react-i18next'
import { boardPageStyles } from '../../styles/styles'
import DropdownTask from './DropdownTask'
import TaskEditDialog from './EditTaskDialog'
import ColorPill from '../ColorPill'
import MemberCircle from '../MemberCircle'

const Task = ({
    task, index, columnId, column, boardId,
}) => {
    const classes = boardPageStyles()
    const {
        title, members, owner, prettyId,
    } = task
    const titleLimit = 25
    const dots = '...'
    const { t, i18n } = useTranslation('common')

    let tasksOwnerAndMembers
    if (owner) {
        tasksOwnerAndMembers = members.concat(owner)
    } else {
        tasksOwnerAndMembers = members
    }
    const [dialogStatus, setDialogStatus] = useState(false)

    const toggleDialog = () => setDialogStatus(!dialogStatus)

    //name length check adds "..." if the name's too long
    const add3Dots = () => {
        if(title.length !== undefined) {
            let checkedTitle = title
            if (title.length > titleLimit) {
                checkedTitle = title.substring(0, titleLimit) + dots
            }
            return checkedTitle

        }
    }

    // Opens task editing dialog
    const handleClick = () => {
        toggleDialog()
    }

    // Prevents edit task dialog from opening, when user presses the three dots to open dropdown
    const handleDialogClick = (e) => e.stopPropagation()

    return (
        <Draggable draggableId={task.id} index={index}>
            {(provided, snapshot) => (
                <Grid
                    item
                    container
                    direction="column"
                    classes={snapshot.isDragging
                        ? { root: classes.taskIsDragging }
                        : { root: classes.task }}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    spacing={1}
                    onClick={handleClick}
                    id="clickableTask"
                >
                    <Grid
                        item
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        classes={snapshot.isDragging
                            ? { root: classes.taskHeaderIsDragging }
                            : { root: classes.taskHeader }}
                    >
                        <Grid item classes={{ root: classes.taskTitle }}>
                            <p>{prettyId}</p>
                        </Grid>
                        {task.storyPoints === 'Not estimated' || task.storyPoints === 'Ei arvioitu' || task.storyPoints === null
                            ? (
                                <Grid item classes={{ root: classes.taskStoryPoints }}>
                                    <p>{t('task.pointsLeftNotEstimated')}</p>
                                </Grid>
                            )
                            : (
                                <Grid item classes={{ root: classes.taskStoryPoints }}>
                                    <p>
                                        {t('task.pointsLeft')}
                                        {task.storyPoints - task.spentStoryPoints}
                                        {' '}
                                        /
                                        {' '}
                                        {task.storyPoints}
                                    </p>
                                </Grid>
                            )}

                        <Grid item onClick={handleDialogClick}>
                            <DropdownTask
                                task={task}
                                columnId={columnId}
                                boardId={boardId}
                            />
                        </Grid>
                    </Grid>
                    <Grid item direction="column" container spacing={1}>
                        <Grid item classes={{ root: classes.taskName }}>
                            <p>{add3Dots(task.title)}</p>
                        </Grid>
                        <Grid item container direction="row" spacing={1} classes={{ root: classes.ticketColorPillsGrid }}>
                            {task.colors ? (
                                task.colors.map((colorObj) => (
                                    <Grid item key={colorObj.id}><ColorPill color={colorObj.color} /></Grid>
                                ))
                            ) : null}
                        </Grid>
                    </Grid>
                    <Grid item>
                        {tasksOwnerAndMembers.length ? (
                            <Divider classes={{ root: classes.ticketDivider }} />
                        ) : null}
                    </Grid>
                    <Grid item container direction='row' justifyContent='flex-end'>
                        {tasksOwnerAndMembers.length ? (
                            tasksOwnerAndMembers.map((personObj) => (
                                <Grid item key={personObj.id}><MemberCircle name={personObj.userName} /></Grid>
                            ))
                        ) : null}
                    </Grid>
                    <TaskEditDialog
                        dialogStatus={dialogStatus}
                        toggleDialog={toggleDialog}
                        editId={task.id}
                        task={task}
                        boardId={boardId}
                        column={column}
                        modifyTask={false}
                    />
                </Grid>
            )}
        </Draggable>
    )
}
export default Task
