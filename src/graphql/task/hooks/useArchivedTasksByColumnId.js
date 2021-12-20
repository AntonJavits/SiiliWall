import { useQuery } from '@apollo/client'
import { ARCHIVED_TASKS_BY_COLUMN_ID } from '../taskQueries'

const useArchivedTasksByColumnId = (id) => {
    const { loading, error, data } = useQuery(ARCHIVED_TASKS_BY_COLUMN_ID, {
        variables: { columnId: id },
    })
    return { loading, error, data }
}
export default useArchivedTasksByColumnId
