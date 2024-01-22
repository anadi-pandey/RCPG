// MyProvider.js
import React, { useState } from "react";
import MyContext from "./UpdaterContext";

const UpdatorProvider = ({ children }) => {
  const [myState, setMyState] = useState(false);

  const updateState = (newValue) => {
    setMyState(newValue);
  };

  return (
    <MyContext.Provider value={{ myState, updateState }}>
      {children}
    </MyContext.Provider>
  );
};

export default UpdatorProvider;
