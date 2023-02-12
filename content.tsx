import type { PlasmoCSConfig } from "plasmo";
import { useEffect } from "react";

export const config: PlasmoCSConfig = {
  matches: ["https://docs.plasmo.com/*"],
  all_frames: true
};

const CustomButton = () => {
  useEffect(() => {
    chrome.runtime.onMessage.addListener((req, _, sendResponse) => {
      console.log(req);
      sendResponse("from cs");
      return;
    });
  }, []);
  return <button>Custom button</button>;
};

export default CustomButton;
