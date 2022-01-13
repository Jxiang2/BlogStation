import { createContext, useEffect, useReducer } from "react";
import { projectAuth } from "../firebase/config";

export const AuthContext = createContext()

// action: {type, payload}
export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {...state, user: action.payload}
        case 'LOGOUT':
            return {...state, user: null}
        case 'UPDATE_PROFILE':
            return {...state, user: action.payload}
        case 'AUTH_IS_READY': 
            return {...state, authIsReady: true, user: action.payload}
        default:
            return state
    }
}

// context provider component
export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        authIsReady: false
    })

    useEffect(()=>{
        // unsub returns a listener that responds when first render or user auth state changes
        const unsub = projectAuth.onAuthStateChanged((user)=>{
            dispatch({type: 'AUTH_IS_READY', payload: user})
            unsub() // need to unsubscribe listener
        })
    }, [])

    console.log('AuthContext state: ', state)

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}