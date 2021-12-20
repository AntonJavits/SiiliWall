import React from 'react'
import { Grid } from '@mui/material'
import Task from './task/Task'
import Subtask from './subtask/Subtask'

const TicketList = ({
    ticketOrder, tasks, subtasks, columnId, boardId, user, color, searchTerm, column
}) => {
    const ticketsInOrder = ticketOrder.map((obj) => {
        let foundTicket
        if (obj.type === 'task') {
            foundTicket = tasks.find((task) => task.id === obj.ticketId)
            foundTicket = { ...foundTicket, type: 'task' }
        } else if (obj.type === 'subtask') {
            foundTicket = subtasks.find((subtask) => subtask.id === obj.ticketId)
            foundTicket = { ...foundTicket, type: 'subtask' }
        }
        return foundTicket
    })

    let filteredTasks = ticketsInOrder;
    let all = {} 

    const userList = () => {
        if (user !== null && user.length > 0) {
            let filterdUsers = []
            all = { ...all, users: user }
            filteredTasks.map((ticket) => {
                all.users.map((user) => {
                    if (ticket.owner !== null) {
                        if (user.value === ticket.owner.id && ticket.column.id === columnId) {
                            let same = false;
                            filterdUsers.map((task) => {
                                if (task.id === ticket.id) {
                                    same = true
                                }
                                return null
                            })
                            if (!same) {
                                filterdUsers.push(ticket)
                            }
                        }
                    }
                    if (ticket.members !== null) {
                        ticket.members.map((member) => {
                            if (user.value === member.id) {
                                let same = false;
                                filterdUsers.map((task) => {
                                    if (task.id === ticket.id) {
                                        same = true
                                    }
                                    return null
                                })
                                if (!same) {
                                    filterdUsers.push(ticket)
                                }
                            }
                            return null
                        })
                    }
                    return null
                })
                return null
            })
            filteredTasks = filterdUsers
        }
    }

    userList()
    const colors = () => {
        if (color !== null && color.length > 0) {
            let epix = [];
            all = { ...all, colors: color }
            filteredTasks.map((ticket) => {
                all.colors.map((epica) => {
                    if (ticket.colors.length === 1 && epica.value === ticket.colors[0].id) {
                        let same = false;
                        epix.map((task) => {
                            if (task.id === ticket.id) {
                                same = true
                            }
                            return null
                        })
                        if (!same) {
                            epix.push(ticket)
                        }
                    } else {
                        ticket.colors.map((colors) => {
                            if (colors.id === epica.value) {
                                let same = false;
                                epix.map((task) => {
                                    if (task.id === ticket.id) {
                                        same = true
                                    }
                                    return null
                                })
                                if (!same) {
                                    epix.push(ticket)
                                }
                            }
                            return null
                        })
                    }
                    return null
                })
                return null
            })
            filteredTasks = epix;
        }
    }
    colors()

    let tasksAndSubTasks = [];
    if (searchTerm && searchTerm.length > 2) {
    for (let i = 0; i < filteredTasks.length; i++) {
        if ((filteredTasks[i].title && filteredTasks[i].title.toLowerCase().includes(searchTerm.toLowerCase())) || (filteredTasks[i].name && filteredTasks[i].name.toLowerCase().includes(searchTerm.toLowerCase()))) {
            tasksAndSubTasks.push(filteredTasks[i])
        }
    }
    filteredTasks=tasksAndSubTasks
    }

    return (
        <Grid container spacing={2}>
            {filteredTasks.map((ticket, index) => {
                try {
                    let component
                    if (ticket.type === 'task') {
                        // prevents empty components error
                        if(ticket.title.length > 1) {}
                        component = (
                            <Grid item key={ticket.id}>
                                <Task index={index} task={ticket} columnId={columnId} column={column} boardId={boardId} />
                            </Grid>
                        )
                    } else if (ticket.type === 'subtask') {
                        // prevents empty components error
                        if(ticket.name.length > 1) {}
                        component = (
                            <Grid item key={ticket.id}>
                                <Subtask key={ticket.id} index={index} subtask={ticket} columnId={columnId} />
                            </Grid>
                        )
                    }
                    return component
                } catch(error) {
                }
            })}
        </Grid>
    )
}

export default React.memo(TicketList)
