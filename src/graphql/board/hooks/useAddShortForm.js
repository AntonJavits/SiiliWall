import {
    useMutation,
} from '@apollo/client'
import { ADD_SHORTFORM } from '../shortFormQueries'
import { addShortForm } from '../../../cacheService/cacheUpdates'

const useAddShortForm = (projectId) => {
    const retVal = useMutation(ADD_SHORTFORM, {
        update: async (cache, response) => {
            addShortForm(response.data.addShortForm, projectId)
        }
    })
    return retVal
}
export default useAddShortForm