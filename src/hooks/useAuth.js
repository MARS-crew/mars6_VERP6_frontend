import { useMutation } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axios';
import { authState } from '../recoil/auth/auth';

function useAuth() {
  const setAuth = useSetRecoilState(authState);
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: async (credentials) => {
      console.log('[로그인 API 요청]', credentials);
      const response = await axiosInstance.post('/login', credentials);
      console.log('[로그인 API 응답]', response.data);
      return response.data;
    },
    onSuccess: (data) => {
      console.log('[로그인 성공]', data);
      if (data.isSuccess && data.code === "2000") {
        setAuth({
          isAuthenticated: true,
          token: data.result.token,
          user: data.result.user
        });
        localStorage.setItem('token', data.result.token);
        navigate('/');
      } else {
        throw new Error('로그인에 실패했습니다.');
      }
    },
    onError: (error) => {
      console.error('[로그인 실패]', error);
    }
  });

  return {
    login: loginMutation.mutate,
    isLoading: loginMutation.isPending,
    error: loginMutation.error
  };
}

export default useAuth; 