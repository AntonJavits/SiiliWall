import {
    useQuery,
} from '@apollo/client'
import { ALL_PROJECTS } from '../projectQueries'

const useAllBoards = () => {
    const { loading, error, data } = useQuery(ALL_PROJECTS)
    return { loading, error, data }
}
export default useAllBoards
