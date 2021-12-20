import {
    useQuery,
} from '@apollo/client'
import { ARCHIVED_PROJECTS } from '../projectQueries'

const useArchivedProjects = () => {
    const { loading, error, data } = useQuery(ARCHIVED_PROJECTS)
    return { loading, error, data }
}
export default useArchivedProjects
