import { useFirestore } from '../../hooks/useFirestore'
import { useAuthContext } from '../../hooks/useAuthContext'
import Avatar from '../../components/Avatar/Avatar'
import { useHistory } from 'react-router-dom'

export default function ProjectSummary( { project }) {

    const { deleteDocument } = useFirestore('projects')
    const { user: authUser} = useAuthContext()
    const history = useHistory()

    const handleClick = (e) => {
        deleteDocument(project.id)
        history.push('/')
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
            {authUser.uid === project.createdBy.id 
                && <button className='btn' style={{'marginBottom':'20px'}} onClick={handleClick}>Mark as completed</button>}
        </div>
        
    )
}
