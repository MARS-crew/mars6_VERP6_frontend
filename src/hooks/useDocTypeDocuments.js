import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../api/axios';

function useDocTypeDocuments(docTypeId) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['docTypeDocuments', docTypeId],
    queryFn: async () => {
      if (!docTypeId) return { result: [] };
      
      try {
        console.log('[문서 목록 조회 요청]', { docTypeId });
        const response = await axiosInstance.get(`/docs/${docTypeId}`, {
          params: {
            page: 0,
            size: 3
          }
        });
        console.log('[문서 목록 조회 응답]', response.data);
        return response.data;
      } catch (error) {
        console.error('[문서 목록 조회 에러]', error);
        throw error;
      }
    },
    enabled: !!docTypeId,
    refetchOnWindowFocus: false
  });

  return {
    documents: data?.result || [],
    isLoading,
    error
  };
}

export default useDocTypeDocuments; 