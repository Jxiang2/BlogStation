import { useFirestore } from '../../hooks/useFirestore'
import { useAuthContext } from '../../hooks/useAuthContext'
import Avatar from '../Avatar/Avatar'

export default function ProjectSummary( { project }) {

    const { deleteDocument } = useFirestore('projects')
    const { user: authUser} = useAuthContext()

    const handleClick = (e) => {
        deleteDocument(project.id)
    }

    return (
        <div className="project-summary">
            <h2 className="page-title">{project.name}</h2>
            <p>By {project.createdBy.displayName}</p>
            <p className="date">Project due by {project.date.toDate().toDateString()}</p>

            <p className="detail">{project.detail}</p>

            <h4>Project assigned to:</h4>

            <div className='assigned-users'>
                {project.assignedUsersList.map(user=>(
                <div key={user.id}>
                    <Avatar src={user.photoURL}/>
                </div>))}
            </div>
            
            {authUser.uid === project.createdBy.id 
            && <button className='btn' onClick={handleClick}>Mark as completed</button>}
        </div>
    )
}
