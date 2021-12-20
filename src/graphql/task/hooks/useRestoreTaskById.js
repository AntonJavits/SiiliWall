import { useMutation } from '@apollo/client'
import { BOARD_BY_ID } from '../../board/boardQueries'
import { RESTORE_TASK_BY_ID, ARCHIVED_TASKS } from '../taskQueries'

const useRestoreTaskById = (id) => {
    const retVal = useMutation(RESTORE_TASK_BY_ID, {

        refetchQueries: [
            {
                query: ARCHIVED_TASKS,
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

export default useRestoreTaskById
