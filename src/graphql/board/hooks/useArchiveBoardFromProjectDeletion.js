import { useMutation } from '@apollo/client'
import { ARCHIVE_BOARD_FROM_PROJECT_DELETION } from '../boardQueries'

const useArchiveBoardFromProjectDeletion = () => {
    const retVal = useMutation(ARCHIVE_BOARD_FROM_PROJECT_DELETION)
    return retVal
}

export default useArchiveBoardFromProjectDeletion
