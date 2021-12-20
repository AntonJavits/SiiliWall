import { useQuery } from '@apollo/client'
import { ALL_SUBTASKS } from '../subtaskQueries'

const useAllSubTasks = () => {
    const { loading, error, data } = useQuery(ALL_SUBTASKS)
    return { loading, error, data }
}

export default useAllSubTasks