import { useParams } from 'react-router-dom'
import { useDocument } from '../hooks/useDocument'

// styles
import './ProjectDetail.css'

export default function ProjectDetail() {

    const { id } = useParams()
    const { error, document } = useDocument('projects', id)

    console.log(error);

    if (error) {
        return <div className='error'>{error}</div>
    }

    if (!document) {
        return <div className='loading'>Loading...</div>
    }

    return (
        <div className='project-detail'>
            <h1>{document.name}</h1>
        </div>
    )
}
