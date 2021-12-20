import { useQuery } from "@apollo/client";
import { ALL_COLUMNS } from "../columnQueries";

const useAllColumns = () => {
  const { loading, error, data } = useQuery(ALL_COLUMNS);
  return { loading, error, data };
};

export default useAllColumns;
