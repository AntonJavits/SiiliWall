import { useMutation } from '@apollo/client'
import { ADD_SUBTASK } from '../subtaskQueries'
import { SUBTASKS } from '../../fragments'

const useAddSubtask = () => {
    const retVal = useMutation(ADD_SUBTASK, {
        update: async (cache, response) => {
            const columnIdForCache = `Column:${response.data.addSubtaskForTask.column.id}`
            const cached = cache.readFragment({
                id: columnIdForCache,
                fragment: SUBTASKS,
            })
            const { subtasks } = cached
            const newSubtasks = subtasks.concat(response.data.addSubtaskForTask)
            cache.writeFragment({
                id: columnIdForCache,
                fragment: SUBTASKS,
                data: {
                    subtasks: newSubtasks,
                },
            })
        },
    })
    return retVal
}
export default useAddSubtask
