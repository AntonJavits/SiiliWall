import { useQuery } from '@apollo/client'
import { ALL_COLORS } from '../taskQueries'

const useAllColors = () => {
    const { loading, error, data } = useQuery(ALL_COLORS)
    return { loading, error, data }
}

export default useAllColors