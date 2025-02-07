import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../api/axios';

function useDocTypeDocuments(docTypeId) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['docTypeDocuments', docTypeId],
    queryFn: async () => {
      if (!docTypeId) return { result: [] };
      
      try {
        // console.log('[문서 목록 조회 요청]', { 
        //   docTypeId,
        //   requestUrl: `/docs/${docTypeId}`
        // });

        const response = await axiosInstance.get(`/docs/${docTypeId}`, {
          params: {
            page: 0,
            size: 10
          }
        });

        // console.log('[문서 목록 조회 응답]', {
        //   data: response.data,
        //   status: response.status,
        //   docTypeId
        // });

        if (!response.data.isSuccess) {
          throw new Error(response.data.message || '문서 목록 조회에 실패했습니다.');
        }

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
    refetchOnWindowFocus: false,
    staleTime: 0,
    cacheTime: 5 * 60 * 1000
  });

  return {
    documents: data?.result || [],
    isLoading,
    error,
    refetch
  };
}

export default useDocTypeDocuments; 