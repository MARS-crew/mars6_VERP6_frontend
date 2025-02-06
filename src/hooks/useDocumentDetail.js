import { useRecoilValue } from "recoil";
import { authState } from "../recoil/auth/auth";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

function useDocumentDetail(docTitle) {
  const auth = useRecoilValue(authState);
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["getDocumentDetail", docTitle],
    queryFn: async () => {
      const response = await axios.get(`/api/docs-detail/${docTitle}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      return response;
    },
  });

  const createDocumentDetail = useMutation({
    mutationFn: async (newDoc) => {
      const response = await axios.post(`/api/docs-detail/create`, newDoc, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["getDocumentDetail"]);
    },
  });

  const updateDocument = useMutation({
    mutationFn: async (updatedDoc) => {
      const response = await axios.patch(
        `/docs-detail/${docTitle}`,
        updatedDoc,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["getDocumentDetail", docTitle]);
    },
  });

  return {
    data,
    isLoading,
    error,
    createDocumentDetail,
    updateDocument,
  };
}

export default useDocumentDetail;
