import { useState } from 'react';
import LoginButton from '../../components/Button/LoginButton';

function LoginPage() {
  const [loginForm, setLoginForm] = useState({
    id: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('로그인 시도:', loginForm);
  };

  return (
    <div className = "h-screen flex items-center justify-center bg-[#F6F6F6]">
      <div className = "w-[530px] h-[646px] bg-white rounded-[24px] shadow-[0_0_2px_2px_rgba(0,0,0,0.10)] flex items-center justify-center">
        <div className = "w-[360px]">
          <h2 className = "text-[30px] font-bold text-center mb-[50px]">
            로그인
          </h2>
          <form className = "space-y-[25px]" onSubmit = {handleLogin}>
            <LoginInput
              label = "아이디"
              name = "id"
              placeholder = "아이디를 입력해주세요"
              value = {loginForm.id}
              onChange = {handleInputChange}
            />
            <LoginInput
              label = "비밀번호"
              name = "password"
              type = "password"
              placeholder = "비밀번호를 입력해주세요"
              value = {loginForm.password}
              onChange = {handleInputChange}
            />

            <div className = "mt-[25px] font-semibold">
              <LoginButton type = "submit">
                로그인
              </LoginButton>
            </div>
            
            <div className = "text-center mt-[25px] font-medium">
              <a href = "#" className = "text-[15px] text-gray-900">
                회원가입
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage; 