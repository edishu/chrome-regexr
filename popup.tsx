import { useState } from "react";

function IndexPopup() {
  const [data, setData] = useState("");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 16
      }}>
      <label htmlFor="searchInput">Search</label>
      <input
        id="searchInput"
        onChange={(e) => setData(e.target.value)}
        value={data}
      />
    </div>
  );
}

export default IndexPopup;
