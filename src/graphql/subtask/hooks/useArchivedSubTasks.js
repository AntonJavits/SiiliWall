import { useQuery } from '@apollo/client'
import { ARCHIVED_SUBTASKS } from '../subtaskQueries'

const useArchivedSubTasks = (id) => {
    const { loading, error, data } = useQuery(ARCHIVED_SUBTASKS, {
        variables: { boardId: id },
    })
    return { loading, error, data }
}
export default useArchivedSubTasks