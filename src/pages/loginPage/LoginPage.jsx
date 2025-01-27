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
<<<<<<< HEAD
    <div className = "h-screen flex items-center justify-center bg-white">
      <div className = "w-[360px]">
        <h2 className = "text-[30px] font-bold text-center mb-[50px]">
          로그인
        </h2>
        <form className = "space-y-6" onSubmit = {handleLogin}>
          <div className = "space-y-[25px]">
            <div>
              <label 
                htmlFor = "id" 
                className = "block text-[13px] text-[#7C838A] mb-[16px] font-medium"
              >
                아이디
              </label>
              <input
                id = "id"
                name = "id"
                type = "text"
                required
                className = "w-full pb-[6px] pl-[7px] border-b border-[#D9D9D9] text-[12px] focus:outline-none placeholder-[#B2B2B2] font-normal"
                placeholder = "아이디를 입력해주세요"
                value = {loginForm.id}
                onChange = {handleInputChange}
              />
            </div>
            <div>
              <label 
                htmlFor = "password" 
                className = "block text-[13px] text-[#7C838A] mb-[16px] font-medium"
              >
                비밀번호
              </label>
              <input
                id = "password"
                name = "password"
                type = "password"
                required
                className = "w-full pl-[7px] pb-[6px] border-b border-[#D9D9D9] text-[12px] focus:outline-none placeholder-[#B2B2B2] font-normal"
                placeholder = "비밀번호를 입력해주세요"
                value = {loginForm.password}
                onChange = {handleInputChange}
              />
            </div>
          </div>
=======
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
>>>>>>> 566ae9ddf46aa62c6fde61e4569573cfb504d5e7

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