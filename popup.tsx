import { ChangeEventHandler, useState } from "react";

import { sendToActiveContentScript } from "@plasmohq/messaging";

function IndexPopup() {
  const [data, setData] = useState("");

  const hadleInputChange: ChangeEventHandler<HTMLInputElement> = async (e) => {
    setData(e.target.value);
    const resp2 = await sendToActiveContentScript({
      name: "ping",
      body: {
        searchText: e.target.value
      }
    });

    console.log(resp2);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 16
      }}>
      <label htmlFor="searchInput">Search</label>
      <input id="searchInput" onChange={hadleInputChange} value={data} />
    </div>
  );
}

export default IndexPopup;
