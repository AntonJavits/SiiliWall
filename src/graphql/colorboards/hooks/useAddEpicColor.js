import {
    useMutation,
} from '@apollo/client'
import { ADD_EPICCOLORS, ALL_EPICCOLORS } from '../colorboardQueries'

const useAddEpicColors = () => {
    const returnValue = useMutation(ADD_EPICCOLORS, {
        refetchQueries: [{ query: ALL_EPICCOLORS }],
    })
    return returnValue
}

export default useAddEpicColors
