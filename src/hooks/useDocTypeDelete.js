import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import axiosInstance from '../api/axios';
import { authState } from '../recoil/auth/auth';

function useDocTypeDelete() {
  const auth = useRecoilValue(authState);
  const queryClient = useQueryClient();

  const deleteDocTypeMutation = useMutation({
    mutationFn: async (id) => {
      if (!auth.token) {
        throw new Error('인증 토큰이 없습니다.');
      }

      try {
        const response = await axiosInstance.delete(`/doc-types/${id}`, {
          headers: {
            'Authorization': `Bearer ${auth.token}`
          }
        });

        return { 
          isSuccess: true, 
          message: '문서 타입이 성공적으로 삭제되었습니다.',
          data: response.data 
        };
      } catch (error) {
        if (error.response?.status === 404 || error.response?.status === 500) {
          return { 
            isSuccess: true, 
            message: '이미 삭제된 문서 타입입니다.',
            data: null 
          };
        }
        
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['docTypes']);
    },
    onError: (error) => {
      console.error('[문서 타입 삭제 에러]', error);
    }
  });

  return {
    deleteDocType: deleteDocTypeMutation.mutateAsync,
    isLoading: deleteDocTypeMutation.isPending,
    error: deleteDocTypeMutation.error
  };
}

export default useDocTypeDelete; 