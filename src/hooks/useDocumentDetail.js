import { useRecoilValue } from "recoil";
import { authState } from "../recoil/auth/auth";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

function useDocumentDetail(docId) {
  const auth = useRecoilValue(authState);
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["getDocumentDetail", docId],
    queryFn: async () => {
      const response = await axios.get(`/api/docs-detail/${docId}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
          "Content-Type": "application/json",
        },
      });

      return response;
    },
  });

  const createDocumentDetail = useMutation({
    mutationFn: async ({ docId, externalUrl, originalFileName, data }) => {
      const response = await axios.post(`/api/docs-detail/create`, data, {
        params: {
          docId: docId,
          externalUrl: externalUrl,
          originalFileName: originalFileName,
        },
        headers: {
          Authorization: `Bearer ${auth.token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
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
