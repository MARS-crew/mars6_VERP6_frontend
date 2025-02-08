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

      console.log('[문서 생성 요청 데이터]', {
        title,
        docTypeId,
        token: auth.token
      });

      const response = await axiosInstance.post(`/docs`, {
        title: title,
        docTypeId: Number(docTypeId)
      }, {
        headers: {
          'Authorization': `Bearer ${auth.token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('[문서 생성 응답]', response.data);
      return response.data;
    },
    onSuccess: async (data) => {
      console.log('[문서 생성 성공]', {
        data,
        docTypeId,
        result: data.result
      });
      
      // 캐시 무효화 및 즉시 리프레시
      await queryClient.invalidateQueries({
        queryKey: ['docTypeDocuments', docTypeId],
        refetchType: 'active'
      });

      // 부모 컴포넌트에 알림
      if (onDocumentCreated) {
        onDocumentCreated(data.result);
      }
    },
    onError: (error) => {
      console.error('[문서 생성 실패]', {
        error,
        docTypeId,
        response: error.response?.data
      });
      alert(error.response?.data?.message || '문서 생성에 실패했습니다.');
    }
  });

  const handleBlur = async () => {
    if (!value.trim()) return;
    
    try {
      console.log('[문서 생성 시도]', {
        title: value,
        docTypeId: docTypeId,
        docTypeIdType: typeof docTypeId
      });
      await createDocumentMutation.mutateAsync(value);
    } catch (error) {
      console.error('[문서 생성 에러 상세]', error);
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