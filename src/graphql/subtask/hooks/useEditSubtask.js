import { useMutation } from '@apollo/client'
import { EDIT_SUBTASK } from '../subtaskQueries'

const useEditSubtask = () => {
    const retVal = useMutation(EDIT_SUBTASK)
    return retVal
}

export default useEditSubtask