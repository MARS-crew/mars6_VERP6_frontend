import { useMutation } from '@tanstack/react-query';
import axiosInstance from '../api/axios';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { documentListState } from '../recoil/document';

function useDocumentList(docTypeId) {
  const setDocumentList = useSetRecoilState(documentListState(docTypeId));
  const documentList = useRecoilValue(documentListState(docTypeId));

  const createDocumentMutation = useMutation({
    mutationFn: async (title) => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('인증 토큰이 없습니다.');
        }

        console.log('[문서 생성 요청]', { 
          title, 
          docTypeId,
          requestUrl: '/docs'
        });

        const response = await axiosInstance.post('/docs', {
          title,
          docTypeId: Number(docTypeId)
        }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        console.log('[문서 생성 응답]', response.data);
        
        return {
          isSuccess: true,
          data: response.data,
          title: title
        };
      } catch (error) {
        console.error('[문서 생성 에러]', {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
          message: error.message,
          config: {
            url: error.config?.url,
            method: error.config?.method,
            headers: error.config?.headers,
            data: error.config?.data
          }
        });
        throw error;
      }
    },
    onSuccess: (response) => {
      console.log('[문서 생성 성공]', response);
      setDocumentList(prev => ({
        ...prev,
        documents: [...prev.documents, response.data]
      }));
      return response;
    },
    onError: (error) => {
      console.error('[문서 생성 실패]', error);
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