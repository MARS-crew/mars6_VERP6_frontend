const LoginInput = ({ label, type = "text", placeholder, value, onChange, name }) => {
    return (
      <div>
        <label 
          htmlFor = {name}
          className = "block text-[13px] text-[#7C838A] mb-[16px]"
        >
          {label}
        </label>
        <input
          id = {name}
          name = {name}
          type = {type}
          value = {value}
          onChange = {onChange}
          placeholder = {placeholder}
          className = "w-[360px] h-[26px] pl-[7px] pb-[6px] border-b border-[#D9D9D9] text-[12px] focus:outline-none placeholder-[#B2B2B2]"
        />
      </div>
    );
  };
  
  export default LoginInput;