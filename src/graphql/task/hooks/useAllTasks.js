import { useQuery } from '@apollo/client'
import { ALL_TASKS } from '../taskQueries'

const useAllTasks = () => {
    const { loading, error, data } = useQuery(ALL_TASKS)
    return { loading, error, data }
}

export default useAllTasks