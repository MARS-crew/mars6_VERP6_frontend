import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { authState } from "../recoil/auth/auth";

function useCreateReason() {
  const auth = useRecoilValue(authState);
  const queryClient = useQueryClient();

  const createReason = useMutation({
    mutationFn: async ({ docDetailId, reason }) => {
      const response = await axios.post(
        `/api/docs-detail/${docDetailId}/reject-reason`,
        { reason: reason },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["getDocumentDetail"]);
    },
  });
  return createReason;
}

export default useCreateReason;
