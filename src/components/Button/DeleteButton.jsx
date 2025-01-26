const DeleteButton = ({ onClick, variant, children }) => (
  <button
    onClick = {onClick}
    className = {`
      w-[120px] h-[40px] text-white font-bold rounded-[5px] text-[16px]
      ${variant === 'delete' ? 'bg-[#FF595C]' : 'bg-[#8E98A8]'}
    `}
  >
    {children}
  </button>
);

export default DeleteButton; 