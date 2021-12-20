import {
    useMutation,
} from '@apollo/client'
import { ALL_BOARDS } from '../../board/boardQueries'
import { RESTORE_USER, ARCHIVED_USERS, ALL_USERS } from '../userQueries'

const useRestoreUser = () => {
    const retVal = useMutation(RESTORE_USER, {
      refetchQueries: [
        { query: ARCHIVED_USERS },
        { query: ALL_USERS}
      ],
    })
    return retVal
}

export default useRestoreUser
