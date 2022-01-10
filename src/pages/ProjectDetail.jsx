import { useParams } from 'react-router-dom'
import ProjectSummary from './ProjectSummary'
import { useDocument } from '../hooks/useDocument'

// styles
import './ProjectDetail.css'

export default function ProjectDetail() {

    const { id } = useParams()
    const { error, document } = useDocument('projects', id)

    if (error) {
        return <div className='error'>{error}</div>
    }

    if (!document) {
        return <div className='loading'>Loading...</div>
    }

    return (
        <div className='project-detail'>
            <ProjectSummary project={document}/>
        </div>
    )
}
