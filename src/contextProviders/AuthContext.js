import React, { useReducer, createContext, useEffect } from 'react'
import { authReducer } from "../reducers/authReducer";
// import db from '../db'

export const AuthContext = createContext()

const AuthContextProvider = (props) => {
    const [auth, dispatch] = useReducer(authReducer, {})
    
    // useEffect(() => {
    //     console.log('authState', auth)
    // }, [auth])

    return (
        <AuthContext.Provider value={{auth, dispatch}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider