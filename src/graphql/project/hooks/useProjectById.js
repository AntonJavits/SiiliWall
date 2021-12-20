import { useQuery } from '@apollo/client'
import { PROJECT_BY_ID } from '../projectQueries'

const useProjectById = (projectId) => {
    const {
        loading, error, data,
    } = useQuery(PROJECT_BY_ID, {
        variables: {
            projectId,
        },
        fetchPolicy: 'cache-and-network',
    })
    return { data, error, loading }
}

export default useProjectById
