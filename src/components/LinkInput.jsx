const LinkInput = ({ handleInputEvent, originalURL }) => {
  return (
    <form>
      <input
        onChange={(e) => handleInputEvent(e)}
        type='text'
        value={originalURL}
        placeholder='Paste a long url here...'
        className='appearance-none p-2 shadow-inner rounded border outline-none'
      />
    </form>
  );
};

export default LinkInput;
