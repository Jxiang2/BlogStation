import { Link } from 'react-router-dom'
import Avatar from '../Avatar/Avatar'

// styles
import './ProjectList.css'

export default function ProjectList({ projects }) {
    return (
        <div className='project-list'>
            {projects.length === 0 && <p> No Artworks Yet</p>}
            {projects.map((project)=>(
                <Link to={`/projects/${project.id}`} key={project.id}>
                    <h4>{project.name}</h4>
                    <p>due by {project.date.toDate().toDateString()}</p>
                    <div className='assigned-to'>
                        <ul>
                            {project.assignedUsersList.map((user)=>(
                            <li key={user.photoURL}>
                                <Avatar src={user.photoURL}/>
                            </li>))}
                        </ul>
                    </div>
                </Link>
            ))}
        </div>
    )
}
