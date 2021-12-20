import {
    useQuery,
} from '@apollo/client'
import { ARCHIVED_BOARDS } from '../boardQueries'

const UseArchiveBoardlistByProjectId = (id) => {
    const { loading, error, data } = useQuery(ARCHIVED_BOARDS, {
        variables: { projectId: id },
    })
    return { loading, error, data }
}
export default UseArchiveBoardlistByProjectId
