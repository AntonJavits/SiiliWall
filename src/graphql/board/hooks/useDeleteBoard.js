import { useMutation } from "@apollo/client";
import { DELETE_BOARD } from "../boardQueries";

const useDeleteBoard = () => {
  const retVal = useMutation(DELETE_BOARD);
  return retVal;
};

export default useDeleteBoard;
