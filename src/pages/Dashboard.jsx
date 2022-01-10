import { useCollection } from '../hooks/useCollection'
import ProjectList from '../components/ProjectList/ProjectList'
import ProjectFilter from '../components/ProjectFilter/ProjectFilter'

// styles
import './Dashboard.css'

export default function Dashboard() {

    const { documents, error } = useCollection('projects')

    return (
        <div>
            <h3 className='page-title'>Dashboard</h3>
            {error && <p className='error'>{error}</p>}
            {documents && <ProjectFilter/>}
            {documents && <ProjectList projects={documents}/>}
        </div>
    )
}
