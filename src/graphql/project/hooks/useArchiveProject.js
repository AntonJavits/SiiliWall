import { useMutation } from '@apollo/client'
import { ARCHIVE_PROJECT, ARCHIVED_PROJECTS, ALL_PROJECTS } from '../projectQueries'

const useArchiveProject = () => {
    const retVal = useMutation(ARCHIVE_PROJECT, {
        refetchQueries: [{ query: ARCHIVED_PROJECTS }, { query: ALL_PROJECTS }],

    })
    return retVal
}
export default useArchiveProject
