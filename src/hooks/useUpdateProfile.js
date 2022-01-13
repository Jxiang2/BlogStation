import  { projectAuth, projectFirestore } from '../firebase/config'
import { useAuthContext } from './useAuthContext'
import { useState, useEffect } from "react"

export const useUpdateProfile = (colRef) => {

    // users collection
    const col = projectFirestore.collection(colRef)

    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [isCancelled, setIsCancelled] = useState(false)
    const { dispatch, user: authUser } = useAuthContext()

    const changeDisplayName = async (displayName) => {

        setError(null)
        setIsPending(true)
        const user = projectAuth.currentUser

        if  (!isCancelled) {
            try {
                // update authUser
                await user.updateProfile({
                displayName: displayName
                })
                console.log('passed')
                // also update userDocument
                const updatedDocument = await col.doc(authUser.uid).update({displayName: displayName})
                console.log('passed')
                // update context & states
                dispatch({type:'UPDATE_PROFILE', payload: {...authUser, displayName: displayName}})
                setIsPending(false)
                setError(null) 
                return updatedDocument
            } catch (err) {
                setError(err.message)
                setIsPending(false)
                return null
            }
        }
    }

    const changeAvatar = () => {

    }

    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])
    
    return { changeDisplayName, changeAvatar, error, isPending }
}