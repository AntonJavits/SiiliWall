import { useMutation } from '@apollo/client'
import { MOVE_TICKET_FROM_COLUMN } from '../ticketQueries'

const useMoveTicketFromColumn = () => {
    const retVal = useMutation(MOVE_TICKET_FROM_COLUMN)
    return retVal
}

export default useMoveTicketFromColumn
