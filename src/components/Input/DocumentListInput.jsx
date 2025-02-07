import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import axiosInstance from '../../api/axios';
import { authState } from '../../recoil/auth/auth';

function DocumentListInput({ value, onChange, onKeyDown, docTypeId, onDocumentCreated }) {
  const auth = useRecoilValue(authState);
  const queryClient = useQueryClient();

  const createDocumentMutation = useMutation({
    mutationFn: async (title) => {
      if (!auth.token) {
        throw new Error('인증 토큰이 없습니다.');
      }

      const response = await axiosInstance.post(`/docs`, {
        title: title,
        docTypeId: docTypeId
      }, {
        headers: {
          'Authorization': `Bearer ${auth.token}`
        }
      });

      return response.data;
    },
    onSuccess: (data) => {
      onDocumentCreated(data);
      queryClient.invalidateQueries(['docTypeDocuments', docTypeId]);
    },
    onError: (error) => {
      console.error('[문서 생성 실패]', error);
      alert(error.response?.data?.message || '문서 생성에 실패했습니다.');
    }
  });

  const handleBlur = async () => {
    if (!value.trim()) return;
    
    try {
      await createDocumentMutation.mutateAsync(value);
    } catch (error) {
      
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.target.blur();
    }
    if (onKeyDown) onKeyDown(e);
  };

  return (
    <div className = "w-[333px] relative">
      <input
        type = "text"
        value = {value}
        onChange = {onChange}
        onBlur = {handleBlur}
        onKeyDown = {handleKeyDown}
        placeholder = "서류명을 입력해주세요."
        className = "w-[333px] h-[32px] text-[17px] pl-[6px] focus:outline-none placeholder-[#B2B2B2]"
        disabled = {createDocumentMutation.isPending}
      />
      <div className = "border-b border-[#D9D9D9]" />
    </div>
  );
}

export default DocumentListInput; 