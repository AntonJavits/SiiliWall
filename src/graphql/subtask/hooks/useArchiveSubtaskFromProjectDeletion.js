import { useMutation } from '@apollo/client'
import { ARCHIVE_SUBTASK_FROM_PROJECT_DELETION } from '../subtaskQueries'

const useArchiveSubtaskFromProjectDeletion = () => {
    const retVal = useMutation(ARCHIVE_SUBTASK_FROM_PROJECT_DELETION)
    return retVal
}

export default useArchiveSubtaskFromProjectDeletion
