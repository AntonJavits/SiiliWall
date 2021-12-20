import { useMutation } from '@apollo/client'
import { MOVE_SWIMLANE } from '../taskQueries'

const useMoveSwimlane = () => {
    const retVal = useMutation(MOVE_SWIMLANE)
    return retVal
}

export default useMoveSwimlane
