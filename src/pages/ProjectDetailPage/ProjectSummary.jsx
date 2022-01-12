import { useFirestore } from '../../hooks/useFirestore'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useDocument } from '../../hooks/useDocument'
import Avatar from '../../components/Avatar/Avatar'
import { useHistory } from 'react-router-dom'

export default function ProjectSummary( { project }) {

    const { user: authUser} = useAuthContext()
    const { error: retrieveUserError, document: userDoc } = useDocument('users', authUser.uid)
    const { deleteDocument } = useFirestore('projects')
    const { updateDocument } = useFirestore('users')
    const history = useHistory()

    const handleClick = (e) => {
        e.preventDefault()
        history.push('/')
        if (userDoc && !retrieveUserError) {
            updateDocument(authUser.uid, {uploadedImgCount: userDoc.uploadedImgCount-1})
        }
        deleteDocument(project.id)
    }

    return (
        <div>
            <div className="project-summary">
                <h2 className="page-title">{project.name}</h2>

                <p>By {project.createdBy.displayName}</p>

                <p className="date">Artwork completed by {project.date.toDate().toDateString()}</p>

                <p className="detail">{project.detail}</p>

                <h4>Credits to:</h4>

                <div className='assigned-users'>
                    {project.assignedUsersList.map(user=>(
                    <div key={user.id}>
                        <Avatar src={user.photoURL}/>
                    </div>))}
                </div>
            </div>
            
            {(authUser.uid === project.createdBy.id)
            && <button className='btn' style={{'marginBottom':'20px'}} onClick={handleClick}>Delete</button>}
        </div>
        
    )
}
