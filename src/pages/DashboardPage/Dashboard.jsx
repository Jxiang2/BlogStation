import { useState } from 'react'
import { useCollection } from '../../hooks/useCollection'
import { useAuthContext } from '../../hooks/useAuthContext'
import ProjectList from '../../components/ProjectList/ProjectList'
import ProjectFilter from './ProjectFilter'

// styles
import './Dashboard.css'

export default function Dashboard() {

    const { user: authUser } = useAuthContext()
    const { documents, error } = useCollection('projects')
    const [currentFilter, setCurrentFilter] = useState('all')

    const filteredProjects = documents ? documents.filter((project)=>{
        switch (currentFilter) {
            case 'all':
                return true
            case 'related':
                let assignedToMe = false
                project.assignedUsersList.forEach((assignedUser)=>{
                    if (assignedUser.id === authUser.uid) {
                        assignedToMe = true
                    }
                })
                return assignedToMe
            case 'game':
            case 'anime':
            case 'nature':
            case 'architecture':
            case 'pets':
            case 'people':
                return project.category === currentFilter
            default:
                return true
        }
    }) : null

    return (
        <div>
            <h3 className='page-title'>Dashboard</h3>
            {error && <p className='error'>{error}</p>}
            {documents && <ProjectFilter currentFilter={currentFilter} changeFilter={setCurrentFilter}/>}
            {filteredProjects && <ProjectList projects={filteredProjects}/>}
        </div>
    )
}
