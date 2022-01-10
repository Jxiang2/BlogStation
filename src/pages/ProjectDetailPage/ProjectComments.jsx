import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import uuid from 'react-uuid'
import { useEffect, useState } from "react"
import { timestamp } from "../../firebase/config"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useFirestore } from '../../hooks/useFirestore'
import Avatar from '../../components/Avatar/Avatar'

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
            photoURL: authUser.photoURL,
            content: newComment,
            createdAt: timestamp.fromDate(new Date()),
            id: uuid()
        }
        updateDocument(project.id, {
            comments: [...project.comments, commentToAdd]
        })

        // bad way
        // console.log(response)
        // if (response.success === true && response.error === null)
        //     setNewComment('')
        //     console.log('sucessful update');
    }

    return (
        <div className="project-comments">
            <h4>Project Comments</h4>

            <ul>
                {project.comments.length > 0 && project.comments.map((comment)=>(
                    <li key={comment.id}>
                        <div className='comment-author'>
                            <Avatar src={comment.photoURL}/>
                            <p>{comment.displayName}</p>
                        </div>

                        <div className='comment-date'>
                            <p>{formatDistanceToNow(comment.createdAt.toDate(), {addSuffix: true})}</p>
                        </div>

                        <div className="comment-conetent"><p>{comment.content}</p></div>
                    </li>
                ))}
            </ul>

            <form className="add-comments" onSubmit={handleSubmit}>
                <label>
                    <span>Add new comments</span>

                    <textarea
                     required
                     onChange={e=>setNewComment(e.target.value)}
                     value={newComment}
                    ></textarea>

                    {!response.isPending && 
                    <button style={{'marginBottom': '100px'}} className='btn'>Add Comment</button>}
                    {response.isPending &&  
                    <button style={{'marginBottom': '100px'}} disabled className='btn'>Adding...</button>}
                </label>
            </form>
        </div>
    )
}
