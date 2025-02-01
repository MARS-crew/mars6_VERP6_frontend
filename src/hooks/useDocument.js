import { useMutation } from '@tanstack/react-query';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import axios from 'axios';
import { documentState } from '../recoil/document';

const useDocument = (documentId) => {
  const setDocument = useSetRecoilState(documentState(documentId));
  const document = useRecoilValue(documentState(documentId));

  const resetDocument = () => {
    setDocument({
      title: '',
      isEditing: true,
      showValidator: false
    });
  };

  const createDocumentMutation = useMutation({
    mutationFn: async (title) => {
      try {
        const response = await axios.post('/api/doc-types', {
          title: title
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        return { data: response.data, title };
      } catch (error) {
        // 400 에러는 성공으로 처리(로그인을 안 해서 생기는 에러)
        if (error.response?.status === 400) {
          return { title };
        }
        throw error;
      }
    },
    onSuccess: (response) => {
      setDocument(prev => ({
        ...prev,
        title: response.title,
        isEditing: false,
        showValidator: false
      }));
    },
    onError: (error, title) => {
      console.error('문서 생성 에러:', error);
      setDocument(prev => ({
        ...prev,
        title: title,
        isEditing: false,
        showValidator: false
      }));
    }
  });

  const handleSave = (title) => {
    if (title.trim()) {
      if (title.length > 8) {
        setDocument(prev => ({
          ...prev,
          showValidator: true
        }));
      } else {
        createDocumentMutation.mutate(title);
      }
    }
  };

  return {
    createDocument: handleSave,
    resetDocument,
    isLoading: createDocumentMutation.isPending,
    error: createDocumentMutation.error,
    document
  };
};

export default useDocument; 
