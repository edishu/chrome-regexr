import type { PlasmoCSConfig } from "plasmo";
import { useEffect, useState } from "react";
import type { SearchInput } from "types";

import type { PlasmoMessaging } from "@plasmohq/messaging";

export const config: PlasmoCSConfig = {
  matches: ["https://developer.chrome.com/docs/*"],
  all_frames: true
};

const CustomButton = () => {
  const [searchInput, setSearchInput] = useState<
    PlasmoMessaging.Request<string, SearchInput> | undefined
  >();

  // Add Listener to get search message form extension
  useEffect(() => {
    chrome.runtime.onMessage.addListener(
      (req: PlasmoMessaging.Request<string, SearchInput>, _, sendResponse) => {
        setSearchInput(req);
        return;
      }
    );
  }, []);

  // Find and highlight matches
  useEffect(() => {
    if (searchInput) {
      const h1 = document.querySelector("h1");
      const regex = new RegExp(`(${searchInput.body.searchText})`, "g");
      //   const newContent = h1.textContent.replaceAll(regex, `<mark>$1</mark>`);
      const newContent = h1.textContent.replaceAll(
        searchInput.body.searchText,
        `<mark>${searchInput.body.searchText}</mark>`
      );
      h1.innerHTML = newContent;
    }
  }, [searchInput]);

  return <h1>{searchInput?.body?.searchText}</h1>;
};
// 1. Do depth first seach to find all leaf elements of document
// 1.1 An element is leaf element if it does not has any children...
// 1.1 or all of the children are inline elements. Use getDisplayType https://stackoverflow.com/questions/2880957/detect-inline-block-type-of-a-dom-element
// 2. Use mark element to higlight text
// 3. Add case sensitive option
// 4. Add regex option
// 5. Dispaly number of results found on popup
// 6. Modifiy selection for currently selected (make it orange)
// 6.1 Add navigation to select others
export default CustomButton;
