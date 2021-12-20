import { useMutation } from '@apollo/client'
import { EDIT_COLUMN } from '../columnQueries'

const useEditColumn = () => {
    const retVal = useMutation(EDIT_COLUMN)
    return retVal
}

export default useEditColumn
