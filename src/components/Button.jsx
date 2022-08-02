const Button = ({ title, color, handleShortenURL }) => {
  return (
    <button
      onClick={handleShortenURL}
      type='button'
      className={`${color} px-4 py-2 text-white rounded relative`}>
      {title}
      <div className={title === "Loading..." ? "" : "hidden"}>
        <div className='w-[10px] h-[10px] bg-red-500 absolute -top-1 -right-1 rounded-full border-2 border-white'></div>
        <div className='animate-ping w-[10px] h-[10px] bg-red-300 absolute -top-1 -right-1 rounded-full'></div>
      </div>
    </button>
  );
};

export default Button;
