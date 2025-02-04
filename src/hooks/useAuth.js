import { useMutation } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { authState } from '../recoil/auth/auth';

function useAuth() {
  const setAuth = useSetRecoilState(authState);
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: async (credentials) => {
      const response = await axios.post('/api/login', credentials, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    },
    onSuccess: (data) => {
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
    }
  });

  return {
    login: loginMutation.mutate,
    isLoading: loginMutation.isPending,
    error: loginMutation.error
  };
}

export default useAuth; 