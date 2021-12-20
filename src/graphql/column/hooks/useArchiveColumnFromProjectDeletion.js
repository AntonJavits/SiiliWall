import { useMutation } from '@apollo/client'
import { ARCHIVE_COLUMN_FROM_PROJECT_DELETION } from '../columnQueries'

const useArchiveColumnFromProjectDeletion = () => {
    const retVal = useMutation(ARCHIVE_COLUMN_FROM_PROJECT_DELETION)
    return retVal
}

export default useArchiveColumnFromProjectDeletion
