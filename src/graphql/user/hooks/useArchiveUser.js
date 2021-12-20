import {
    useMutation,
} from '@apollo/client'
import { ARCHIVE_USER, ARCHIVED_USERS } from '../userQueries'

const useArchiveUser = () => {
    const retVal = useMutation(ARCHIVE_USER, {
      refetchQueries: [{ query: ARCHIVED_USERS }],
    })
    return retVal
}

export default useArchiveUser
