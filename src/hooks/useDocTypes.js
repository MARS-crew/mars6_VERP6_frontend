import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../api/axios';

function useDocTypes() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['docTypes'],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get('/doc-types', {
          params: {
            page: 0,
            size: 3,
          }
        });
        console.log('[문서 타입 조회 응답]', response.data);
        return response.data;
      } catch (error) {
        console.error('[문서 타입 조회 에러]', error);
        throw error;
      }
    },
    refetchOnWindowFocus: false
  });

  return {
    docTypes: data?.result || [],
    isLoading,
    error
  };
}

export default useDocTypes; 