import { useMutation } from '@apollo/client'
import { ARCHIVE_TASK, ARCHIVED_TASKS, ARCHIVED_TASKS_BY_COLUMN_ID } from '../taskQueries'
import { BOARD_BY_ID } from '../../board/boardQueries'

const useArchiveTask = (id, columnId) => {
    const retVal = useMutation(ARCHIVE_TASK, {
        refetchQueries: [
            {
                query: ARCHIVED_TASKS,
                variables: { boardId: id },
            },
            {
                query: ARCHIVED_TASKS_BY_COLUMN_ID,
                variables: { columnId: columnId}
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
export default useArchiveTask
