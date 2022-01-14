import  { projectAuth, projectFirestore, projectStorage } from '../firebase/config'
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
                displayName: displayName})

                // update userDocument
                const updatedDocument = await col.doc(authUser.uid).update({displayName: displayName})

                // update projectsDocuments with a query, no need to wait
    
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

    const changeAvatar = async (thumbmail) => {

        setError(null)
        setIsPending(true)
        const user = projectAuth.currentUser

        if (!isCancelled) {
            try {
            // uploade new user thumbmail to storage
            const uploadPath = `thumbnails/${user.uid}/${thumbmail.name}`
            const img = await projectStorage.ref(uploadPath).put(thumbmail)
            const imgUrl = await img.ref.getDownloadURL()

            // update the additional attribute  to user
            await user.updateProfile({photoURL: imgUrl})

            // update update userDoc & projectDoc
            const updatedDocument = await col.doc(authUser.uid).update({photoURL: imgUrl})
            
            // update context & states 
            dispatch({type:'UPDATE_PROFILE', payload: {...authUser, photoURL: imgUrl}})
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

    // clearup function
    useEffect(() => {
        return () => {
            console.log('cancelled due to redirect')
            setIsCancelled(true)
        }
    }, [])
    
    return { changeDisplayName, changeAvatar, error, isPending }
}