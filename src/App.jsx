import LinkInput from "./components/LinkInput";
import Button from "./components/Button";
import LinkOutput from "./components/LinkOutput";

import { FiCopy } from "react-icons/fi";
import { ImCheckmark } from "react-icons/im";
import { CgCloseO } from "react-icons/cg";

import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Background from "./components/Background/Background";

const App = () => {
  const [originalURL, setOriginalURL] = useState("");
  const [shortURL, setShortURL] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toggleAlert, setToggleAlert] = useState(false);

  // loading saved urls
  // const [history, setHistory] = useState([]);

  // Checking if localStorageHistory exists
  // if ("shortlinqx" in localStorage) {
  // }

  const handleShortenURL = () => {
    if (shortURL !== "") {
      setShortURL("");
    }
    if (originalURL !== "") {
      setLoading(true);
      fetch(`https://api.shrtco.de/v2/shorten?url=${originalURL}`)
        .then((res) => res.json())
        .then((data) => {
          setShortURL(data.result.short_link2);
          setLoading(false);
        });
    } else {
      setToggleAlert(true);
      return;
    }
  };
  const handleInputEvent = (e) => {
    setOriginalURL(e.target.value);
  };
  return (
    <div className='h-screen w-screen flex flex-col justify-center items-center'>
      <Background />
      <div className='bg-white p-8 rounded shadow-lg'>
        <div className='text-2xl text-center mb-8 select-none'>
          <span className='font-black text-red-500'>.</span>
          <span className='font-bold text-blue-600'>ShortLinqx</span>
        </div>
        <section className='flex flex-col gap-2 md:flex-row mb-2'>
          <LinkInput
            handleInputEvent={handleInputEvent}
            originalURL={originalURL}
          />
          <Button
            handleShortenURL={handleShortenURL}
            title={loading ? "Loading..." : "Shorten"}
            color={"bg-blue-600"}
          />
        </section>
        <small
          className={`bg-red-200 text-red-800 px-2 py-1 rounded-sm flex items-center justify-between ${
            toggleAlert ? "" : "hidden"
          }`}>
          Please enter a URL to shorten!
          <CgCloseO
            onClick={() => setToggleAlert(false)}
            className='cursor-pointer'
          />
        </small>
        {shortURL !== "" && (
          <div>
            {/* <hr className='opacity-0 my-4 md:my-8' /> */}
            <section className='flex justify-between text-slate-600 mt-8'>
              <LinkOutput link={shortURL} />
              <CopyToClipboard text={shortURL} onCopy={() => setCopied(true)}>
                <button>
                  {copied ? (
                    <ImCheckmark className='bg-slate-100 rounded p-1 text-xl shadow-inner' />
                  ) : (
                    <FiCopy className='bg-slate-100 rounded p-1 text-xl shadow-inner' />
                  )}
                </button>
              </CopyToClipboard>
            </section>
          </div>
        )}
        <section className='flex flex-col mt-8 gap-2 text-slate-400'>
          <hr />
          <small className='mx-auto select-none'>
            Made with <span className='opacity-80'>❤️</span> by Trapcy
          </small>
        </section>
      </div>
      {/* <section className='bg-white p-8 rounded shadow-lg mt-4 text-center md:w-[24rem] w-[18rem]'>
        <div>
          <label>History</label>
          <hr className='my-4' />
        </div>
        <ul className='[&>*]:bg-slate-100/50 [&>*]:my-1 [&>*]:py-2 [&>*]:rounded-sm [&>*]:mx-2 overflow-y-auto h-[10rem]'></ul>
      </section> */}
    </div>
  );
};

export default App;
