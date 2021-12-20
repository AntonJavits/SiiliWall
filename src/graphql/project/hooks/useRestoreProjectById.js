import { useMutation } from '@apollo/client'
import { RESTORE_PROJECT_BY_ID, ALL_PROJECTS, ARCHIVED_PROJECTS } from '../projectQueries'

const useRestoreProjectById = () => {
    const retVal = useMutation(RESTORE_PROJECT_BY_ID, {
        refetchQueries: [{ query: ARCHIVED_PROJECTS }, { query: ALL_PROJECTS }],

    })
    return retVal
}
export default useRestoreProjectById
