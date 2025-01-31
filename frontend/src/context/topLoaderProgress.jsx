
import { useContext, createContext, useState, useEffect } from 'react'
const ProgressContext = createContext();


const ProgressProvider = ({ children }) => {
    const [progress, setProgress] = useState(0)


    return (
        <ProgressContext.Provider value={[progress, setProgress]} >
            {children}
        </ProgressContext.Provider >
    )
}

//custom hooks
const useProgress = () => useContext(ProgressContext);
export { useProgress, ProgressProvider }