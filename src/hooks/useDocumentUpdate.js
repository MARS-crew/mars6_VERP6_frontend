import { useMutation } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import axiosInstance from '../api/axios';
import { authState } from '../recoil/auth/auth';

function useDocumentUpdate() {
  const auth = useRecoilValue(authState);

  const updateDocumentMutation = useMutation({
    mutationFn: async ({ id, title, docTypeId }) => {
      try {
        if (!auth.token) {
          throw new Error('인증 토큰이 없습니다.');
        }

        console.log('[문서 수정 요청 상세]', {
          documentId: id,
          newTitle: title,
          docTypeId: docTypeId,
          requestUrl: `/docs/${id}`
        });

        const response = await axiosInstance.put(`/docs/${id}`, {
          title,
          docId: Number(docTypeId)
        }, {
          headers: {
            'Authorization': `Bearer ${auth.token}`,
            'Content-Type': 'application/json'
          }
        });

        console.log('[문서 수정 응답]', response.data);

        if (!response.data.isSuccess) {
          throw new Error(response.data.message || '문서 수정에 실패했습니다.');
        }

        return response.data;
      } catch (error) {
        console.error('[문서 수정 에러]', error);
        throw error;
      }
    },
    onSuccess: (data) => {
      console.log('[문서 수정 성공]', data);
    },
    onError: (error) => {
      console.error('[문서 수정 실패]', error);
      throw error;
    }
  });

  return {
    updateDocument: (id, title, docTypeId) => 
      updateDocumentMutation.mutateAsync({ id, title, docTypeId }),
    isLoading: updateDocumentMutation.isPending,
    error: updateDocumentMutation.error
  };
}

export default useDocumentUpdate; 