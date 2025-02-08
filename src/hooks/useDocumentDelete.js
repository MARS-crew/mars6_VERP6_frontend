import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import axiosInstance from '../api/axios';
import { authState } from '../recoil/auth/auth';

function useDocumentDelete() {
  const auth = useRecoilValue(authState);
  const queryClient = useQueryClient();

  const deleteDocumentMutation = useMutation({
    mutationFn: async (id) => {
      if (!auth.token) {
        throw new Error('인증 토큰이 없습니다.');
      }

      try {
        console.log('[문서 삭제 요청]', { documentId: id });
        
        const response = await axiosInstance.delete(`/docs/${id}`, {
          headers: {
            'Authorization': `Bearer ${auth.token}`
          }
        });

        console.log('[문서 삭제 응답]', response.data);

        return { 
          isSuccess: true, 
          message: '문서가 성공적으로 삭제되었습니다.',
          data: response.data 
        };
      } catch (error) {
        console.error('[문서 삭제 에러]', error);
        
        if (error.response?.status === 404) {
          return { 
            isSuccess: true, 
            message: '이미 삭제된 문서입니다.',
            data: null 
          };
        }
        
        return {
          isSuccess: false,
          message: error.response?.data?.message || '문서 삭제에 실패했습니다.',
          error: error
        };
      }
    },
    onSuccess: (response) => {
      if (response.isSuccess) {
        console.log('[문서 삭제 성공]', response);
        queryClient.invalidateQueries(['docTypeDocuments']);
      }
    }
  });

  return {
    deleteDocument: deleteDocumentMutation.mutateAsync,
    isLoading: deleteDocumentMutation.isPending,
    error: deleteDocumentMutation.error
  };
}

export default useDocumentDelete; 