import { useState } from 'react'
import { useCollection } from '../hooks/useCollection'
import ProjectList from '../components/ProjectList/ProjectList'
import ProjectFilter from '../components/ProjectFilter/ProjectFilter'

// styles
import './Dashboard.css'

export default function Dashboard() {

    const { documents, error } = useCollection('projects')
    const [currentFilter, setCurrentFilter] = useState('all')

    const changeFilter = (newFilter) => {
        setCurrentFilter(newFilter)
    }

    return (
        <div>
            <h3 className='page-title'>Dashboard</h3>
            {error && <p className='error'>{error}</p>}
            {documents && <ProjectFilter currentFilter={currentFilter} changeFilter={changeFilter}/>}
            {documents && <ProjectList projects={documents}/>}
        </div>
    )
}
