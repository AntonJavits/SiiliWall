import {
    useMutation,
} from '@apollo/client'
import { ADD_USER, ALL_USERS } from '../userQueries'

const useAddUser = () => {
    const returnValue = useMutation(ADD_USER, {
        refetchQueries: [{ query: ALL_USERS }],
    })
    return returnValue
}

export default useAddUser
