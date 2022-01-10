import uuid from 'react-uuid'
import { useState } from "react"
import { timestamp } from "../../firebase/config"
import { useAuthContext } from "../../hooks/useAuthContext"

export default function ProjectComments() {

    const [newComment, setNewComment] = useState('')
    const { user: authUser } = useAuthContext()

    const handleSubmit =  async (e) => {
        e.preventDefault()
        const commentToAdd = {
            displayName: authUser.displayName,
            phtotURL: authUser.photoURL,
            content: newComment,
            createdAt: timestamp.fromDate(new Date()),
            id: uuid()
        }
        console.log(commentToAdd)
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

                    <button className="btn">Add Comment</button>
                </label>
            </form>
        </div>
    )
}
