import { useQuery } from "@apollo/client";
import { ALL_BOARDS } from "../boardQueries";

const useAllBoards = () => {
  const { loading, error, data } = useQuery(ALL_BOARDS);
  return { loading, error, data };
};

export default useAllBoards;
