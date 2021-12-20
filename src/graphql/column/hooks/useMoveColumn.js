import { useMutation } from '@apollo/client'
import { MOVE_COLUMN } from '../columnQueries'

const useMoveColumn = () => {
    const retVal = useMutation(MOVE_COLUMN)
    return retVal
}

export default useMoveColumn
