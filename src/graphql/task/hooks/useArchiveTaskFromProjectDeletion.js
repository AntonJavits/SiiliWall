import { useMutation } from '@apollo/client'
import { ARCHIVE_TASK_FROM_PROJECT_DELETION } from '../taskQueries'

const useArchiveTaskFromProjectDeletion = () => {
    const retVal = useMutation(ARCHIVE_TASK_FROM_PROJECT_DELETION)
    return retVal
}

export default useArchiveTaskFromProjectDeletion
