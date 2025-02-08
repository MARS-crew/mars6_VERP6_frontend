import { useMutation } from '@tanstack/react-query';
import axiosInstance from '../api/axios';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { documentListState } from '../recoil/document';
import { authState } from '../recoil/auth/auth';
import { useQueryClient } from '@tanstack/react-query';

function useDocumentList(docTypeId) {
  const setDocumentList = useSetRecoilState(documentListState(docTypeId));
  const documentList = useRecoilValue(documentListState(docTypeId));
  const auth = useRecoilValue(authState);
  const queryClient = useQueryClient();

  const createDocumentMutation = useMutation({
    mutationFn: async (title) => {
      try {
        if (!auth.token) {
          throw new Error('인증 토큰이 없습니다.');
        }

        console.log('[문서 생성 요청]', { 
          title, 
          docTypeId,
          requestUrl: '/docs'
        });

        const requestData = {
          title: title,
          docTypeId: Number(docTypeId)
        };

        console.log('[요청 데이터]', requestData);

        const response = await axiosInstance.post('/docs', requestData, {
          headers: {
            'Authorization': `Bearer ${auth.token}`,
            'Content-Type': 'application/json'
          }
        });
        
        console.log('[문서 생성 응답]', response.data);
        
        if (!response.data.isSuccess) {
          throw new Error(response.data.message || '문서 생성에 실패했습니다.');
        }

        return response.data;
      } catch (error) {
        console.error('[문서 생성 에러]', error);
        throw error;
      }
    },
    onSuccess: (data) => {
      console.log('[문서 생성 성공]', data);
      if (data.result) {
        setDocumentList(prev => ({
          ...prev,
          documents: [...prev.documents, data.result]
        }));
        queryClient.invalidateQueries(['docTypeDocuments', docTypeId]);
      }
      return data;
    },
    onError: (error) => {
      console.error('[문서 생성 실패]', error);
      throw error;
    }
  });

  return {
    createDocument: (title) => createDocumentMutation.mutateAsync(title),
    isLoading: createDocumentMutation.isPending,
    error: createDocumentMutation.error,
    documents: documentList.documents
  };
}

export default useDocumentList; 