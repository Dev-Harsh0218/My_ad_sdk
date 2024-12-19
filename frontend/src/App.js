import "./App.css";
import AddAdsHandleData from "./AdsHandleData";
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="w-full relative">
      <Toaster position="top-center"/>
      <AddAdsHandleData/>
    </div>
  );
}

export default App;
