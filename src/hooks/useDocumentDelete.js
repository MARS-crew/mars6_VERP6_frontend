import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import axiosInstance from '../api/axios';
import { authState } from '../recoil/auth/auth';

function useDocumentDelete() {
  const auth = useRecoilValue(authState);
  const queryClient = useQueryClient();

  const deleteDocumentMutation = useMutation({
    mutationFn: async (id) => {
      try {
        if (!auth.token) {
          throw new Error('인증 토큰이 없습니다.');
        }

        console.log('[문서 삭제 요청]', { 
          documentId: id,
          requestUrl: `/docs/${id}`
        });

        const response = await axiosInstance.delete(`/docs/${id}`, {
          headers: {
            'Authorization': `Bearer ${auth.token}`
          }
        });

        console.log('[문서 삭제 응답]', response.status);

        if (response.status === 200) {
          alert('문서가 삭제되었습니다.');
          return { isSuccess: true, message: '문서가 성공적으로 삭제되었습니다.' };
        }

        throw new Error('문서 삭제에 실패했습니다.');
      } catch (error) {
        console.error('[문서 삭제 에러]', error.response || error);
        
        if (error.response?.status === 404) {
            alert('해당 문서를 찾을 수 없거나 삭제된 문서입니다.');
            return { isSuccess: true, message: '이미 삭제된 문서입니다.' };
        }
        
        throw error;
      }
    },
    onSuccess: (data) => {
      console.log('[문서 삭제 성공]', data);
      queryClient.invalidateQueries(['documents']);
    },
    onError: (error) => {
      console.error('[문서 삭제 실패]', error);
      throw error;
    }
  });

  return {
    deleteDocument: (id) => deleteDocumentMutation.mutateAsync(id),
    isLoading: deleteDocumentMutation.isPending,
    error: deleteDocumentMutation.error
  };
}

export default useDocumentDelete; 