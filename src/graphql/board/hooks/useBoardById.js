import {
    useQuery,
} from '@apollo/client'
import { BOARD_BY_ID } from '../boardQueries'

const useBoardById = (id) => {
    
    
    const {
            loading, error, data,
        } = useQuery(BOARD_BY_ID, {
            variables: {
                boardId: id,
            },
        })
        return { data, error, loading }
    }
    

export default useBoardById
