import { useMutation } from '@apollo/client'
import { BOARD_BY_ID } from '../../board/boardQueries'
import { RESTORE_SUBTASK_BY_ID, ARCHIVED_SUBTASKS } from '../subtaskQueries'

const useRestoreSubTaskById = (id) => {
    const retVal = useMutation(RESTORE_SUBTASK_BY_ID, {

        refetchQueries: [
            {
                query: ARCHIVED_SUBTASKS,
                variables: { boardId: id },
            },
            {
                query: BOARD_BY_ID,
                variables: {
                    boardId: id,
                },

            },

        ],

    })
    return retVal
}

export default useRestoreSubTaskById
