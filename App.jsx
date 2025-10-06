import { useState } from "react";
import axios from 'axios';

function App() {
  const [textIn, setTextIn] = useState("");
  console.log(textIn)
  const [selectVal, setSelectVal] = useState("");
  console.log(selectVal)
  const [result, setResult] = useState("");
  const handleTextTrans = async () => {
    try {
      const options = {
        method: 'POST',
        url: 'https://google-translator9.p.rapidapi.com/v2',
        headers: {
          'x-rapidapi-key': '519b6ff743msh236364a088f4b73p149bd4jsnfefca5564f2e',
          'x-rapidapi-host': 'google-translator9.p.rapidapi.com',
          'Content-Type': 'application/json'
        },
        data: {
          q: `${textIn}`,
          source: 'en',
          target: `${selectVal}`,
          format: 'text'
        }
      };

      const response = await axios.request(options)
      console.log(response?.data?.data?.translations?.[Number(0)]?.translatedText);
      setResult(response?.data?.data?.translations?.[Number(0)]?.translatedText);
    }
    catch (error) {
      setLoad(false);
      console.log(error?.data);
    }
  }
  return (
    <div className="h-screen w-screen bg-pink-200 flex items-center justify-center">
      <div className="flex items-center justify-center flex-col gap-y-15">
        <h1 className="gap-y-15 text-5xl text-white-600 font-bold">
          Text Translation
        </h1>
        <div className="flex items-center justify-center flex-col gap-y-10">
          <textarea name="input-text" className="bg-black-100 h-15 w-[500px] border border-black-800 rounded-lg text-lg px-4 py-2" onChange={(e) => setTextIn(e.target.value)} />
          <textarea name="input-text" className="bg-black-100 h-15 w-[500px] border border-black-800 rounded-lg text-lg px-4 py-2" value={result} readOnly />
        </div>
        <div>
          <label htmlFor="options">Convert Into: </label>
          <select name="value" className="bg-pink-300 px-2 py-2 rounded-lg border-black-800 cursor-pointer" onChange={(e) => setSelectVal(e.target.value)}>
            <option value="">Select</option>
            <option value="kn">Kannada</option>
            <option value="ko">Korean</option>
            <option value="th">Thai</option>
          </select>
        </div>
        <button className="flex items-center justify-center bg-pink-300 border-black-800 rounded-lg text-lg px-2 py-2 cursor-pointer font-bold mx-auto w-[500px]" onClick={handleTextTrans}>
         Translate
        </button>
      </div>
    </div>
  )
}

export default App;