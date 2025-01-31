/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { createContext } from "react";

export let RegisterContext = createContext();


export default function RegisterContextProvider(props) {
  const [registerData, setregisterData] = useState([]);


  return (
    <RegisterContext.Provider value={{ registerData, setregisterData }}>
      {props.children}
    </RegisterContext.Provider>
  );
}
