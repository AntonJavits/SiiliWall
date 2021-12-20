/* eslint-disable import/named */
import { useMutation } from '@apollo/client'
import { ARCHIVE_PROJECT_FROM_PROJECT_DELETION } from '../projectQueries'

const useArchiveProjectFromProjectDeletion = () => {
    const retVal = useMutation(ARCHIVE_PROJECT_FROM_PROJECT_DELETION)
    return retVal
}

export default useArchiveProjectFromProjectDeletion
