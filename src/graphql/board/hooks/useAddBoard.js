import {
    useMutation,
} from '@apollo/client'
import { ADD_BOARD } from '../boardQueries'
import { addNewBoard } from '../../../cacheService/cacheUpdates'

const useAddBoard = (projectId) => {
    const retVal = useMutation(ADD_BOARD, {
        update: async (cache, response) => {
            addNewBoard(response.data.addBoard, projectId)
        }
    })
    return retVal
}
export default useAddBoard
