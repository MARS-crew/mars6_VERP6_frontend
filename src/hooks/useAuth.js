import { useMutation } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axios';
import { authState } from '../recoil/auth/auth';
import { setCookie, removeCookie } from '../utils/cookies';

function useAuth() {
  const setAuth = useSetRecoilState(authState);
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: async (credentials) => {
      console.log('[로그인 API 요청]', credentials);
      const response = await axiosInstance.post('/login', credentials);
      console.log('[로그인 API 응답 전체]', response);
      console.log('[로그인 API 응답 데이터]', response.data);
      return response.data;
    },
    onSuccess: (data) => {
      console.log('[로그인 성공 데이터]', {
        isSuccess: data.isSuccess,
        code: data.code,
        result: data.result
      });
      
      if (data.isSuccess && data.code === "2000") {
        const { token, username, name, role } = data.result;
        
        if (!role) {
          console.error('[로그인 오류] 권한 정보가 없습니다.', data.result);
          throw new Error('사용자 권한 정보를 가져오는데 실패했습니다.');
        }
        
        setCookie('auth_token', token);
        const authData = {
          isAuthenticated: true,
          token: token,
          user: {
            username,
            name,
            role
          }
        };
        console.log('[Auth 상태 업데이트]', authData);
        setAuth(authData);
        navigate('/main');
      } else {
        throw new Error('로그인에 실패했습니다.');
      }
    },
    onError: (error) => {
      console.error('[로그인 실패]', error);
      removeCookie('auth_token');
      setAuth({
        isAuthenticated: false,
        token: null,
        user: null
      });
    }
  });

  const logout = () => {
    removeCookie('auth_token');
    setAuth({
      isAuthenticated: false,
      token: null,
      user: null
    });
    navigate('/login-page');
  };

  return {
    login: loginMutation.mutate,
    logout,
    isLoading: loginMutation.isPending,
    error: loginMutation.error
  };
}

export default useAuth; 