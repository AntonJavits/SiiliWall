import { useQuery } from '@apollo/client'
import { ARCHIVED_TASKS } from '../taskQueries'

const useArchivedTasks = (id) => {
    const { loading, error, data } = useQuery(ARCHIVED_TASKS, {
        variables: { boardId: id },
    })
    return { loading, error, data }
}
export default useArchivedTasks
