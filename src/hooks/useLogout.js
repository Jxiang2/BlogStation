import { useState, useEffect } from "react"
import { projectAuth, projectFirestore } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"

export const useLogout = () => {

    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const {dispatch, user} = useAuthContext()

    const logout = async () => {
        setError(null)
        setIsPending(true)

        // sign user out
        try {
            // update online status
            const { uid } = user
            await projectFirestore.collection('users').doc(uid).update({online: false})

            // signout
            await projectAuth.signOut()
            
            // dispatch logout action
            dispatch({type: 'LOGOUT'})

            // update states
            if (!isCancelled) {
                setIsPending(false)
                setError(null) 
            }
        } catch(err) {
            if (!isCancelled) {
                console.log(err.message)
                setError(err.message)
                setIsPending(false)
            }
        }
    }

    useEffect(()=> {
        return () => setIsCancelled(true)
    }, [])

    return { logout, error, isPending }
}