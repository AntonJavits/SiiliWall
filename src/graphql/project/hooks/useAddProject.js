import { useMutation } from '@apollo/client'
import { ADD_PROJECT, ALL_PROJECTS } from '../projectQueries'

const useAddProject = () => {
    const retVal = useMutation(ADD_PROJECT, {
        refetchQueries: [{ query: ALL_PROJECTS }],
    })
    return retVal
}
export default useAddProject
