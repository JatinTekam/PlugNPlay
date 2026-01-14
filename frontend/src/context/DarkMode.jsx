import { useState } from "react";
import { createContext } from "react";


export const DarkMode=createContext();

export function SetDarkMode({children}){
 const [darkMode, setDarkMode] = useState(true);
 return <DarkMode.Provider value={[darkMode,setDarkMode]}>{children}</DarkMode.Provider>
}