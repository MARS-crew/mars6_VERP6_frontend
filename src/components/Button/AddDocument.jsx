function AddDocument({ onClick }) {
  return (
    <button
      onClick = {onClick}
      className = "w-[1194px] h-[52px] bg-white rounded-[8px] mt-[30px] flex items-center justify-center shadow-[0_0_2px_2px_rgba(0,0,0,0.10)]"
    >
      <span className = "text-[30px] text-[#8E98A8] leading-[30px] flex items-center justify-center">+</span>
    </button>
  );
}

export default AddDocument;