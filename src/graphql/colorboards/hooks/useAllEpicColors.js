import {
    useQuery,
} from '@apollo/client'
import { ALL_EPICCOLORS } from '../colorboardQueries'

const useAllEpicColors = () => {
    const { loading, error, data } = useQuery(ALL_EPICCOLORS)
    return { loading, error, data }
}

export default useAllEpicColors