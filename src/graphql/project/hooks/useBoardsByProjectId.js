import {
    useQuery,
} from '@apollo/client'
import { BOARDS_BY_PROJECT_ID } from '../projectQueries'
import { ARCHIVED_BOARDS } from '../../board/boardQueries'

const useBoardsByProjectId = (id) => {
    const { loading, error, data } = useQuery(BOARDS_BY_PROJECT_ID, {
        variables: { projectId: id },
    }, {
        refetch: {
            query: ARCHIVED_BOARDS,
            variables: { projectId: id },
        },
    })
    return { loading, error, data }
}
export default useBoardsByProjectId
