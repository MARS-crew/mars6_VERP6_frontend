function LoginButton({ onClick, children }) {
  return (
    <button
      onClick = {onClick}
      className = "w-[360px] h-[50px] bg-[#8E98A8] text-white text-[13px] font-semibold rounded-[5px]"
    >
      {children}
    </button>
  );
}

export default LoginButton; 