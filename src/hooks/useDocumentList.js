import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

function useDocumentList(docTypeId) {
  const createDocumentMutation = useMutation({
    mutationFn: async (title) => {
      try {
        const response = await axios.post('/api/docs', {
          title,
          docTypeId: Number(docTypeId)
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        console.log('문서 생성 요청:', { title, docTypeId });
        console.log('서버 응답:', response.data);
        return response.data;
      } catch (error) {
        console.error('에러 상세:', error.response || error);
        // if (error.response?.status === 401 || error.response?.status === 403) {
        //   throw new Error('로그인이 필요한 서비스입니다.');
        // }
        // throw error;
      }
    }
  });

  return {
    createDocument: createDocumentMutation.mutate,
    isLoading: createDocumentMutation.isPending,
    error: createDocumentMutation.error
  };
}

export default useDocumentList; 