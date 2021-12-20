import { useMutation } from '@apollo/client'
import { DELETE_TASK } from '../taskQueries'

const useDeletetask = () => {
    const retVal = useMutation(DELETE_TASK)
    return retVal
}

export default useDeletetask
