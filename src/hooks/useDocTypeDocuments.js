import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../api/axios';

function useDocTypeDocuments(docTypeId) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['docTypeDocuments', docTypeId],
    queryFn: async () => {
      if (!docTypeId) return { result: [] };
      
      try {
        const response = await axiosInstance.get(`/docs/${docTypeId}`);
        return response.data;
      } catch (error) {
        console.error('[문서 목록 조회 에러]', {
          error,
          docTypeId,
          response: error.response?.data
        });
        throw error;
      }
    },
    enabled: !!docTypeId,
    refetchOnWindowFocus: false
  });

  return {
    documents: data?.result || [],
    isLoading,
    error,
    refetch
  };
}

export default useDocTypeDocuments; 