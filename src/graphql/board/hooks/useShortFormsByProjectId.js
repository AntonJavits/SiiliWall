
import { useQuery } from "@apollo/client";
import { SHORTFORMS_BY_PROJECTID } from "../shortFormQueries";

const useShortFormsByProjectId = (id) => {
  const { loading, error, data } = useQuery(SHORTFORMS_BY_PROJECTID, {
    variables: { projectId: id }
    })
  return { loading, error, data };
};

export default useShortFormsByProjectId