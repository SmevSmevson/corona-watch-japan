import React, { useReducer, createContext, useEffect } from 'react'
import { mapDataReducer } from "../reducers/mapDataReducer";
// import db from '../db'

export const MapDataContext = createContext()

const MapDataContextProvider = (props) => {
    const [mapData, dispatch] = useReducer(mapDataReducer, {})
    
    useEffect(() => {
        dispatch({type: 'INIT_MAP_DATA', dispatch})
    }, [])

    // useEffect(() => {
    //     console.log(mapData)
    // }, [mapData])

    return (
        <MapDataContext.Provider value={{mapData, dispatch}}>
            {props.children}
        </MapDataContext.Provider>
    )
}

export default MapDataContextProvider