import {
    useQuery,
} from '@apollo/client'
import { BOARDS_RELATED_BY_PROJECT_ID } from '../boardQueries'

const useBoardsRelatedByProjectId = (id) => {
    
    
    const {
            loading, error, data,
        } = useQuery(BOARDS_RELATED_BY_PROJECT_ID, {
            variables: {
                boardId: id,
            },
        })
        return { data, error, loading }
    }
    

export default useBoardsRelatedByProjectId

