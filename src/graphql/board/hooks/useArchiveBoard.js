import { useMutation } from '@apollo/client'
import { ARCHIVE_BOARD, ARCHIVED_BOARDS } from '../boardQueries'
import { BOARDS_BY_PROJECT_ID } from '../../project/projectQueries'

const useArchiveBoard = (id) => {
    console.log('project id in useArchive board is', id)
    const retVal = useMutation(ARCHIVE_BOARD, {
        refetchQueries: [{
            query: BOARDS_BY_PROJECT_ID,
            variables: { projectId: id },
        }, {
            query: ARCHIVED_BOARDS,
            variables: { projectId: id },
        }],
    })

    return retVal
}
export default useArchiveBoard
