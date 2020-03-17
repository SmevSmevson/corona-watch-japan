import React, { useReducer, createContext, useEffect } from 'react'
import { casesDataReducer } from "../reducers/casesDataReducer";

export const CasesDataContext = createContext()

const CasesDataContextProvider = (props) => {
    const [casesData, dispatch] = useReducer(casesDataReducer, [])
    
    useEffect(() => {
        dispatch({type: 'INIT_CASES_DATA', dispatch})
    }, [])

    return (
        <CasesDataContext.Provider value={{casesData, dispatch}}>
            {props.children}
        </CasesDataContext.Provider>
    )
}

export default CasesDataContextProvider