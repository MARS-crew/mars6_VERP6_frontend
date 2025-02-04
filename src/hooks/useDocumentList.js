import { useMutation } from '@tanstack/react-query';
import axiosInstance from '../api/axios';

function useDocumentList(docTypeId) {
  const createDocumentMutation = useMutation({
    mutationFn: async (title) => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('인증 토큰이 없습니다.');
        }

        console.log('[문서 생성 요청]', { title, docTypeId });
        const response = await axiosInstance.post('/docs', {
          title,
          docTypeId: Number(docTypeId)
        }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log('[문서 생성 응답]', response.data);
        return response.data;
      } catch (error) {
        console.error('[문서 생성 에러]', {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
          message: error.message
        });
        throw error;
      }
    },
    onSuccess: (data) => {
      console.log('[문서 생성 성공]', data);
    },
    onError: (error) => {
      console.error('[문서 생성 실패]', error);
    }
  });

  return {
    createDocument: createDocumentMutation.mutate,
    isLoading: createDocumentMutation.isPending,
    error: createDocumentMutation.error
  };
}

export default useDocumentList; 