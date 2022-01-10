import uuid from 'react-uuid'
import { useEffect, useState } from "react"
import { timestamp } from "../../firebase/config"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useFirestore } from '../../hooks/useFirestore'

export default function ProjectComments({ project }) {

    const [newComment, setNewComment] = useState('')
    const { user: authUser } = useAuthContext()
    const { updateDocument, response } = useFirestore('projects')

    useEffect(()=>{
        if (response.success === true && response.error === null)
            setNewComment('')
    }, [response])

    const handleSubmit = (e) => {
        e.preventDefault()
        const commentToAdd = {
            displayName: authUser.displayName,
            phtotURL: authUser.photoURL,
            content: newComment,
            createdAt: timestamp.fromDate(new Date()),
            id: uuid()
        }

        updateDocument(project.id, {
            comments: [...project.comments, commentToAdd]
        })
    }

    return (
        <div className="project-comments">
            <h4>Project Comments</h4>
            <form className="add-comments" onSubmit={handleSubmit}>
                <label>
                    <span>Add new comments</span>

                    <textarea
                     required
                     onChange={e=>setNewComment(e.target.value)}
                     value={newComment}
                    ></textarea>

                    {!response.isPending && <button style={{'marginBottom': '100px'}} className='btn'>Add Comment</button>}
                    {response.isPending &&  <button style={{'marginBottom': '100px'}} disabled className='btn'>Adding...</button>}
                </label>
            </form>
        </div>
    )
}
