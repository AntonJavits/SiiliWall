import { useMutation } from '@apollo/client'
import { BOARD_BY_ID } from '../../board/boardQueries'
import { EDIT_TASK } from '../taskQueries'

const useEditTask = (id) => {
    const retVal = useMutation(EDIT_TASK, {
        refetchQueries: [
            {
                query: BOARD_BY_ID,
                variables: {
                    boardId: id,
                },
            }
        ],
    })
    return retVal
}

export default useEditTask
