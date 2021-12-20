import { useMutation } from '@apollo/client'
import { DELETE_COLUMN } from '../columnQueries'
import { ARCHIVED_SUBTASKS } from '../../subtask/subtaskQueries'
import { ARCHIVED_TASKS } from '../../task/taskQueries'


const useDeleteColumn = (id) => {
    const retVal = useMutation(DELETE_COLUMN, {
        refetchQueries: [
            {
                query: ARCHIVED_SUBTASKS,
                variables: { boardId: id },
            },
            {
                query: ARCHIVED_TASKS,
                variables: { boardId: id },
            },
        ],
    })
    return retVal
}
export default useDeleteColumn
