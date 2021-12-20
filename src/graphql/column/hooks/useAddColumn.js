import { useMutation } from '@apollo/client'
import { ADD_COLUMN } from '../columnQueries'
import { addNewColumn } from '../../../cacheService/cacheUpdates'

const useAddColumn = () => {
    const retVal = useMutation(ADD_COLUMN, {
        update: async (cache, response) => {
            addNewColumn(response.data.addColumnForBoard)
        },
    })
    return retVal
}

export default useAddColumn
