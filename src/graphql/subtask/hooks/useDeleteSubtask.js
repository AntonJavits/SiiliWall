import { useMutation } from '@apollo/client'
import { DELETE_SUBTASK } from '../subtaskQueries'

const useDeleteSubtask = () => {
    const retVal = useMutation(DELETE_SUBTASK)
    return retVal
}

export default useDeleteSubtask
