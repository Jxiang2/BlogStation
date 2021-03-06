import { useReducer, useEffect, useState } from "react"
import { projectFirestore, projectStorage, timestamp } from "../firebase/config"

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: 'initial'
}

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case 'IS_PENDING':
      return { isPending: true, document: null, success: false, error: null }
    case 'ADDED_DOCUMENT':
      return { isPending: false, document: action.payload, success: true, error: null }
    case 'UPDATED_DOCUMENT':
      return { isPending: false, document: action.payload, success: true, error: null}
    case 'DELETED_DOCUMENT':
      return { isPending: false, document: null, success: true, error: null }
    case 'ERROR':
      return { isPending: false, document: null, success: false, error: action.payload }
    default:
      return state
  }
}

export const useFirestore = (collection) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState)
  const [isCancelled, setIsCancelled] = useState(false)

  // collection 
  const col = projectFirestore.collection(collection)

  // only dispatch is not cancelled
  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action)
    }
  }

  // add a document
  const addDocument = async (doc, image) => {
    dispatch({ type: 'IS_PENDING' })
    try {
      // uploade image
      const uploadPath = `artworks/${doc.createdBy.id}/${image.name}`
      const img = await projectStorage.ref(uploadPath).put(image)
      const artworkUrl = await img.ref.getDownloadURL()

      // create artwork document
      const createdAt = timestamp.fromDate(new Date())
      const addedDocument = await col.add({ ...doc, createdAt, artworkUrl })

      dispatchIfNotCancelled({ type: 'ADDED_DOCUMENT', payload: addedDocument })
      return addedDocument
    } catch (err) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: err.message })
      return null
    }
  }

  // update document (patch)
  const updateDocument = async (id, updates) => {
    dispatch({ type: 'IS_PENDING' })
    try {
      const updatedDocument = await col.doc(id).update(updates)
      
      dispatchIfNotCancelled({type: 'UPDATED_DOCUMENT', payload: updatedDocument})
      return updatedDocument
    } catch (err) {
      dispatchIfNotCancelled({type: 'ERROR', payload: err.message})
      return null
    } 
  }

  // delete a document
  const deleteDocument = async (id) => {
    dispatch({ type: 'IS_PENDING' })

    try {
      const documentToDeleteRef = col.doc(id)
      
      // delete image from storage
      const artworkUrl = (await documentToDeleteRef.get()).data().artworkUrl
      projectStorage.refFromURL(artworkUrl).delete()

      // delete the artwork document from firestore
      const deletedDocument = await documentToDeleteRef.delete()

      dispatchIfNotCancelled({ type: 'DELETED_DOCUMENT' })
      return deletedDocument

    } catch (err) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: err.message })
        return null
    }
  }
  
  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { addDocument, updateDocument, deleteDocument, response }

}