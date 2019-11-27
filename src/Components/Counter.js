import React, { useState } from "react";

export default function Counter({ children, name, count }) {
  const [inc, setInc] = useState(0);
  return (
    <div>
      {/* {children} */}
      {/* <p>Hello {name}</p> */}
      <p>{inc}</p>
      <button className="click-button" onClick={() => setInc(inc + 1)}>
        Click
      </button>
    </div>
  );
}
