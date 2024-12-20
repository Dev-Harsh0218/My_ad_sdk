import "./App.css";
import AddAdsHandleData from "./AdsHandleData";
import { Toaster } from 'react-hot-toast';
import { useState } from "react";
import { IoReload } from "react-icons/io5";
function App() {
  const [hardRefresh,setHardRefresh] = useState(0);
  const handleHardrefresh = () => {
    setHardRefresh(hardRefresh+1);
  }

  return (
    <div className="w-full relative">
      <div onClick={handleHardrefresh} className="absolute right-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center gap-2">Hard refresh <IoReload/></button>
      </div>
      <Toaster position="top-center"/>
      <AddAdsHandleData hardRefresh={hardRefresh}/>
    </div>
  );
}

export default App;
