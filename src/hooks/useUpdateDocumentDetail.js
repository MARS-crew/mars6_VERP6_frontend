import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { authState } from "../recoil/auth/auth";

function useUpdateDocumentDetail() {
  const auth = useRecoilValue(authState);

  const updateDetailMutation = useMutation({
    mutationFn: async ({ docDetailId, status }) => {
      try {
        const response = await axios.put(
          `/api/docs-detail/${docDetailId}`,
          {
            docDetailId: docDetailId,
            status: status,
          },
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );

        return response;
      } catch (error) {
        console.log("상태 수정 에러");
        throw error;
      }
    },
    onSuccess: (res) => {
      console.log("상태 변경 성공");
    },
  });
  return {
    updateDetailMutation,
  };
}

export default useUpdateDocumentDetail;
