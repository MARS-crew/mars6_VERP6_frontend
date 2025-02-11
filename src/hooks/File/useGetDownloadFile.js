import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { authState } from "../../recoil/auth/auth";

function useGetDownloadFile(docId) {
  const auth = useRecoilValue(authState);

  const { data, isLoading, error } = useQuery({
    queryKey: ["getDownloadFile", docId],
    queryFn: async () => {
      const response = await axios.get(`/api/docs-detail/${docId}/download`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      return response;
    },
  });

  return {
    data,
    isLoading,
    error,
  };
}

export default useGetDownloadFile;