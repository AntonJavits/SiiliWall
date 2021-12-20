import {
    useQuery,
} from '@apollo/client'
import { TASK_BY_ID } from '../taskQueries'

const useTaskById = (id) => {
    const {
        loading, error, data,
    } = useQuery(TASK_BY_ID, {
        variables: {
            taskId: id,
        },
    })
    return { data, error, loading }
}

export default useTaskById
