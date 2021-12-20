import { useSubscription } from '@apollo/client'
import { PROJECT_REMOVED } from '../project/projectQueries'
import { removeProjectFromCache } from '../../cacheService/cacheUpdates'

const useProjectDeleteSub = (id, eventId) => {
    useSubscription(PROJECT_REMOVED, {
        variables: { projectId: id },
        onSubscriptionData: ({ subscriptionData: { data } }) => {
            const { projectId } = data.projectRemoved.removeInfo
            removeProjectFromCache(projectId)
        },
    })
    useSubscription(PROJECT_ADDED, {
        variables: { id },
        onSubscriptionData: ({ subscriptionData: { data } }) => {
            if (data.projectAdded.mutationType === 'CREATED') {
                addNewProject(data.projectAdded.project, id)
            }
        },
    })
}
export default useProjectDeleteSub
