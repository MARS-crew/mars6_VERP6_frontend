import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import axiosInstance from '../api/axios';
import { authState } from '../recoil/auth/auth';

function useDocTypeDelete() {
  const auth = useRecoilValue(authState);
  const queryClient = useQueryClient();

  const deleteDocTypeMutation = useMutation({
    mutationFn: async (id) => {
      try {
        if (!auth.token) {
          throw new Error('인증 토큰이 없습니다.');
        }

        console.log('[문서 타입 삭제 요청]', { 
          docTypeId: id,
          requestUrl: `/doc-types/${id}`
        });

        const response = await axiosInstance.delete(`/doc-types/${id}`, {
          headers: {
            'Authorization': `Bearer ${auth.token}`
          }
        });

        console.log('[문서 타입 삭제 응답]', response.data);

        if (response.status === 200) {
          return { isSuccess: true, message: '문서 타입이 성공적으로 삭제되었습니다.' };
        }

        throw new Error('문서 타입 삭제에 실패했습니다.');
      } catch (error) {
        console.error('[문서 타입 삭제 에러]', error.response || error);
        
        if (error.response?.status === 404) {
          alert('해당 문서 타입을 찾을 수 없거나 이미 삭제되었습니다.');
          return { isSuccess: true, message: '이미 삭제된 문서 타입입니다.' };
        }
        
        throw error;
      }
    },
    onSuccess: (data) => {
      console.log('[문서 타입 삭제 성공]', data);
      queryClient.invalidateQueries(['docTypes']);
    },
    onError: (error) => {
      console.error('[문서 타입 삭제 실패]', error);
      throw error;
    }
  });

  return {
    deleteDocType: (id) => deleteDocTypeMutation.mutateAsync(id),
    isLoading: deleteDocTypeMutation.isPending,
    error: deleteDocTypeMutation.error
  };
}

export default useDocTypeDelete; 