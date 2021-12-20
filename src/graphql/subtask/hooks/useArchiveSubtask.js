import { useMutation } from '@apollo/client'
import { BOARD_BY_ID } from '../../board/boardQueries'
import { ARCHIVE_SUBTASK, ARCHIVED_SUBTASKS, ARCHIVED_SUBTASKS_BY_COLUMN_ID } from '../subtaskQueries'

const useArchiveSubtask = (id, columnId) => {
    const retVal = useMutation(ARCHIVE_SUBTASK, {
        refetchQueries: [
            {
                query: ARCHIVED_SUBTASKS,
                variables: { boardId: id },
            },
            {
                query: ARCHIVED_SUBTASKS_BY_COLUMN_ID,
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
export default useArchiveSubtask
