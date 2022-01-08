import { useEffect, useRef, useState } from "react"
import { projectFirestore } from "../firebase/config"

export const useCollection = (collection, _query, _orderBy) => {

    const [documents, setDocuments] = useState(null)
    const [error, setError] = useState(null)

    // if don't use a ref --> infinite loop in useEffect
    // _query is am reference ary and is diffrerent in memeory on every function call
    const query = useRef(_query).current // current ary value
    const orderBy = useRef(_orderBy).current

    useEffect(()=>{
        let db = projectFirestore.collection(collection)
        if (query) {
            db = db.where(...query)
        }
        if (orderBy) {
            db = redbf.orderBy(...orderBy)
        }
        const unsub = db.onSnapshot((snapshot)=> {
            let resource = []
            // ary of documents
            snapshot.docs.forEach(doc => {
                resource.push({...doc.data(), id:doc.id})
            })
            // update states
            setDocuments(resource)
            setError(null)
        }, (error) => {
            console.log(error)
            setError(error.message)
        })
        // clearup function: unsubscribe on unmount
        return () => unsub()
    }, [collection, query, orderBy])

    return {documents, error}
}
