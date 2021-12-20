import { useQuery } from '@apollo/client'
import { ARCHIVED_SUBTASKS_BY_COLUMN_ID } from '../subtaskQueries'

const useArchivedSubTasksByColumnId = (id) => {
    const { loading, error, data } = useQuery(ARCHIVED_SUBTASKS_BY_COLUMN_ID, {
        variables: { columnId: id },
    })
    return { loading, error, data }
}
export default useArchivedSubTasksByColumnId
