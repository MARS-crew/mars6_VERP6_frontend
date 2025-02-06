import { useMutation } from '@tanstack/react-query';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import axiosInstance from '../api/axios';
import { documentState } from '../recoil/document';
import { authState } from '../recoil/auth/auth';

function useDocument(documentId) {
  const setDocument = useSetRecoilState(documentState(documentId));
  const document = useRecoilValue(documentState(documentId));
  const auth = useRecoilValue(authState);

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
        console.log('[문서 타입 생성 요청]', { title });
        const response = await axiosInstance.post('/doc-types', {
          title
        }, {
          headers: {
            'Authorization': `Bearer ${auth.token}`
          }
        });
        console.log('[문서 타입 생성 응답]', response.data);
        return { data: response.data, title };
      } catch (error) {
        console.error('[문서 타입 생성 에러]', error.response || error);
        if (error.response?.status === 400) {
          return { title };
        }
        throw error;
      }
    },
    onSuccess: (response) => {
      console.log('[문서 타입 생성 성공]', response);
      setDocument(prev => ({
        ...prev,
        id: response.data.result?.id || documentId,
        title: response.title,
        isEditing: false,
        showValidator: false
      }));
    },
    onError: (error, title) => {
      console.error('[문서 타입 생성 실패]', error);
      setDocument(prev => ({
        ...prev,
        title: title,
        isEditing: false,
        showValidator: false
      }));
    }
  });

  const updateDocumentMutation = useMutation({
    mutationFn: async ({ id, title }) => {
      try {
        console.log('[문서 타입 수정 요청]', { id, title });
        const response = await axiosInstance.put(`/doc-types/${id}`, {
          title
        }, {
          headers: {
            'Authorization': `Bearer ${auth.token}`
          }
        });
        console.log('[문서 타입 수정 응답]', response.data);
        return { data: response.data, title };
      } catch (error) {
        console.error('[문서 타입 수정 에러]', error.response || error);
        if (error.response?.status === 400) {
          return { title };
        }
        throw error;
      }
    },
    onSuccess: (response) => {
      console.log('[문서 타입 수정 성공]', response);
      setDocument(prev => ({
        ...prev,
        title: response.title,
        isEditing: false,
        showValidator: false
      }));
    },
    onError: (error) => {
      console.error('[문서 타입 수정 실패]', error);
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

  const handleUpdate = (title) => {
    if (title.trim()) {
      if (title.length > 8) {
        setDocument(prev => ({
          ...prev,
          showValidator: true
        }));
      } else {
        updateDocumentMutation.mutate({ id: document.id, title });
      }
    }
  };

  const startEditing = () => {
    setDocument(prev => ({
      ...prev,
      isEditing: true,
      showValidator: false
    }));
  };

  return {
    createDocument: handleSave,
    updateDocument: handleUpdate,
    startEditing,
    resetDocument,
    isLoading: createDocumentMutation.isPending || updateDocumentMutation.isPending,
    error: createDocumentMutation.error || updateDocumentMutation.error,
    document
  };
}

export default useDocument; 
