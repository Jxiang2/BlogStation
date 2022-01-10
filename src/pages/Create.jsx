import Select from 'react-select'
import { useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useCollection } from '../hooks/useCollection'
import { useAuthContext } from '../hooks/useAuthContext' 
import { useFirestore } from '../hooks/useFirestore'
import { timestamp } from '../firebase/config'

// styles
import './Create.css'

const categories = [
    {value: 'design', label: 'Design'},
    {value: 'sales', label: 'Sales'},
    {value: 'marketing', label: 'Marketing'},
    {value: 'dev', label: 'Development'}
]

export default function Create() {

    const { addDocument, response } = useFirestore('projects')
    const { user: authUser } = useAuthContext()
    const { documents } = useCollection('users')

    const history = useHistory()
    const [users, setUsers] = useState([])
    const [name, setName] = useState('')
    const [detail, setDetail] = useState('')
    const [date, setDate] = useState('')
    const [category, setCategory] = useState('')
    const [assignedUsers, setAssignedUsers] = useState([])
    const [formError, setFormError] = useState(null)

    useEffect(()=>{
        if (documents) {
            const options = documents.map((user)=> {
                return {value: user, label: user.displayName}
            })
            setUsers(options)
        }
    }, [documents])

    useEffect(()=>{
        if (response.success === true) {
            history.push('/')
        }
    }, [response, history])

    const handleSubmit = (e) => {
        e.preventDefault()
        setFormError(null)
    
        if (!category) {
          setFormError('Please select a project category.')
          return
        }
        if (assignedUsers.length < 1) {
          setFormError('Please assign the project to at least 1 user')
          return
        }

        const createdBy = { 
            displayName: authUser.displayName, 
            photoURL: authUser.photoURL,
            id: authUser.uid
        }
    
        const assignedUsersList = assignedUsers.map(u => {
          return { 
            displayName: u.value.displayName, 
            photoURL: u.value.photoURL,
            id: u.value.id
          }}
        )
    
        const project = {
          name,
          detail,
          assignedUsersList, 
          createdBy,
          category: category.value,
          date: timestamp.fromDate(new Date(date)),
          comments: []
        }

        addDocument(project)
    }

    return (
        <div className='create-form'>
            <h2 className='page-title'>Schedule New Project</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Project Name</span>
                    <input 
                     type="text"
                     required
                     onChange={e=>setName(e.target.value)}
                     value={name}
                    />
                </label>

                <label>
                    <span>Project Detail</span>
                    <textarea 
                     type="text"
                     required
                     onChange={e=>setDetail(e.target.value)}
                     value={detail}
                    />
                </label>

                <label>
                    <span>Set Date</span>
                    <input 
                     type="date"
                     required
                     onChange={e=>setDate(e.target.value)}
                     value={date}/>
                </label>

                <label>
                    <span>Set Category</span>
                    <Select
                     maxMenuHeight='100px'
                     onChange={(option)=>setCategory(option)}
                     options={categories}
                    />
                </label>

                <label>
                    <span>Set Assignee</span>
                    <Select 
                     maxMenuHeight='100px'
                     options={users}
                     onChange={(option)=>setAssignedUsers(option)}
                     isMulti/>
                </label>

                {formError && <p className='error'>{formError}</p>}

                {!response.isPending && <button style={{'marginBottom': '100px'}} className='btn'>Add Project</button>}
                {response.isPending &&  <button style={{'marginBottom': '100px'}} disabled className='btn'>Adding...</button>}
            </form>
        </div>
    )
}
