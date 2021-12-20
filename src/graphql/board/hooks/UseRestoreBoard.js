import { useMutation } from '@apollo/client'
import { RESTORE_BOARD_BY_ID, ALL_BOARDS, ARCHIVED_BOARDS } from '../boardQueries'
import { BOARDS_BY_PROJECT_ID, PROJECT_BY_ID } from '../../project/projectQueries'

const useRestoreBoardById = (id) => {
    const retVal = useMutation(RESTORE_BOARD_BY_ID, {
        refetchQueries: [{ query: ALL_BOARDS }, {
            query: ARCHIVED_BOARDS,
            variables: { projectId: id },
        }, {
            query: BOARDS_BY_PROJECT_ID,
            variables: { projectId: id },
        },
        {
            query: PROJECT_BY_ID,
            variables: {
                projectId: id,
            },

        },

        ],

    })
    return retVal
}
export default useRestoreBoardById
