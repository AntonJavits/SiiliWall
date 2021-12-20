import { useSubscription } from "@apollo/client";
import { PROJECT_REMOVED } from "../project/projectQueries";
import {
  removeProjectFromCache,
} from "../../cacheService/cacheUpdates";

const useProjectSubscriptions = (id, eventId) => {

  useSubscription(PROJECT_REMOVED, {
    variables: { projectId: id, eventId },
    onSubscriptionData: ({ subscriptionData: { data } }) => {
      const { projectId } = data.projectRemoved.removeInfo;
      removeProjectFromCache(projectId);
    },
  });
};
export default useProjectSubscriptions;
