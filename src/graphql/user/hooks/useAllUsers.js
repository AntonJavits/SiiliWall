import {
    useQuery,
} from '@apollo/client'
import { ALL_USERS } from '../userQueries'

const useAllUsers = () => {
    const { loading, error, data } = useQuery(ALL_USERS)
    return { loading, error, data }
}

export default useAllUsers