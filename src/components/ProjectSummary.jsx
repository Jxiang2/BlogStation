import Avatar from './Avatar'

export default function ProjectSummary( { project }) {
    return (
        <div className="project-summary">
            <h2 className="page-title">{project.name}</h2>

            <p className="date">Project due by {project.date.toDate().toDateString()}</p>

            <p className="detail">{project.detail}</p>

            <h4>Project assigned to:</h4>

            <div className='assigned-users'>
                {project.assignedUsersList.map(user=>(
                <div key={user.id}>
                    <Avatar src={user.photoURL}/>
                </div>))}
            </div>
        </div>
    )
}
