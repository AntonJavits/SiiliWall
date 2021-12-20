import { useSubscription } from '@apollo/client'
import { BOARD_ADDED, BOARD_REMOVED } from '../board/boardQueries'
import {
    addNewBoard,
    removeBoardFromCache,
} from '../../cacheService/cacheUpdates'

const useProjectSubscriptions = (id, eventId) => {
    useSubscription(BOARD_ADDED, {
        variables: { projectId: id, eventId },
        onSubscriptionData: ({ subscriptionData: { data } }) => {
            if (data.boardAdded.mutationType === 'CREATED') {
                addNewBoard(data.boardAdded.board, id)
            }
        },
    })

    useSubscription(BOARD_REMOVED, {
        variables: { projectId: id, eventId },
        onSubscriptionData: ({ subscriptionData: { data } }) => {
            const { boardId, projectId } = data.boardRemoved.removeInfo
            if (data.boardRemoved.removeType === 'DELETED') {
                removeBoardFromCache(boardId, projectId)
            } else if (data.boardRemoved.removeType === 'ARCHIVED') {
                removeBoardFromCache(boardId, projectId)
            }
        },
    })
}
export default useProjectSubscriptions
