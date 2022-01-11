import { useState, useEffect } from "react"
import  { projectAuth, projectStorage, projectFirestore } from '../firebase/config'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {

    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    const signup = async (email, password, displayName, thumbmail) => {
        setError(null)
        setIsPending(true)

        try {
            // sign up user
            const res = await projectAuth.createUserWithEmailAndPassword(email, password)
            if (!res) throw new Error('Could not complete sign up')

            // update user thumbmail
            const uploadPath = `thumbnails/${res.user.uid}/${thumbmail.name}`
            const img = await projectStorage.ref(uploadPath).put(thumbmail)
            const imgUrl = await img.ref.getDownloadURL()

            // add the additional attribute displayName to user
            await res.user.updateProfile({displayName: displayName, photoURL: imgUrl})

            // create user document based on user auth
            await projectFirestore.collection('users').doc(res.user.uid).set({
                online: true,
                displayName: displayName,
                photoURL: imgUrl,
                uploadedImgCount: 0
            })

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