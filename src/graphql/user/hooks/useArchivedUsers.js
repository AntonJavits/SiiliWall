import {
    useQuery,
} from '@apollo/client'
import { ARCHIVED_USERS } from '../userQueries'

const useArchivedUsers = () => {
    const { loading, error, data } = useQuery(ARCHIVED_USERS)
    return { loading, error, data }
}

export default useArchivedUsers