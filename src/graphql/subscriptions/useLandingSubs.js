import { useSubscription } from '@apollo/client'
import { getAllProjects } from '../../cacheService/cacheUpdates'
import { ALL_PROJECTS } from '../project/projectQueries'

const useLandingSubs = (projects) => {
    useSubscription(ALL_PROJECTS,
        {
            variables: { projects },
            onSubscriptionData: ({ subscriptionData: { data } }) => {
                getAllProjects({ subscriptionData: { data } })
            },
        })
}
export default useLandingSubs
