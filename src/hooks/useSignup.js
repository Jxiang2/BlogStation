import { useState, useEffect } from "react"
import  { projectAuth } from '../config/config'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {

    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    const signup = async (email, password, displayName) => {
        setError(null)
        setIsPending(true)

        try {
            // sign up user
            const res = await projectAuth.createUserWithEmailAndPassword(email, password)
            if (!res) throw new Error('Could not complete sign up')

            // add the additional attribute displayName to user
            await res.user.updateProfile({displayName: displayName})

            // dispatch login action
            dispatch({type: 'LOGIN', payload: res.user})

            if (!isCancelled) {
               setIsPending(false)
               setError(null) 
            }
            
        } catch (err) {
            console.log(err.message)

            // update states
            if (!isCancelled) {
                setError(err.message)
                setIsPending(false)
            }
        }
    }

    // cleanup function
    useEffect(()=> {
        return () => setIsCancelled(true)
    }, [])

    return {error, isPending, signup}
}