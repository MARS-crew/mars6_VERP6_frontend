import { useRecoilValue } from "recoil";

function useDocumentDetailDelete() {
  const auth = useRecoilValue(authState);

  const deletedetailMutation = useMutation({
    mutationFn: async ({ docId }) => {
      const response = await axiosInstance.delete(`/docs-detail/${docId}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      return response;
    },
  });

  return {
    deletedetailMutation,
  };
}

export default useDocumentDetailDelete;
