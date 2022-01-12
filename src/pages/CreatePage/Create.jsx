import Select from 'react-select'
import { useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useCollection } from '../../hooks/useCollection'
import { useAuthContext } from '../../hooks/useAuthContext' 
import { useFirestore } from '../../hooks/useFirestore'
import { useDocument } from '../../hooks/useDocument'
import { timestamp } from '../../firebase/config'

// styles
import './Create.css'

const categories = [
    {value: 'animals', label: 'animals'},
    {value: 'architecture', label: 'architecture'},
    {value: 'anime', label: 'anime'},
    {value: 'game', label: 'game'},
    {value: 'nature', label: 'nature'},
    {value: 'people', label: 'people'},
]

export default function Create() {

    const { addDocument, response } = useFirestore('projects')
    const { updateDocument } = useFirestore('users')
    const { user: authUser } = useAuthContext()
    const { error: retrieveUserError, document: userDoc } = useDocument('users', authUser.uid)
    const { documents } = useCollection('users')
    const [users, setUsers] = useState([])
    const [name, setName] = useState('')
    const [detail, setDetail] = useState('')
    const [date, setDate] = useState('')
    const [category, setCategory] = useState('')
    const [assignedUsers, setAssignedUsers] = useState([])
    const [formError, setFormError] = useState(null)
    const history = useHistory()

    // listen to userList
    useEffect(()=>{
        if (documents) {
            const options = documents.map((user)=> {
                return {value: user, label: user.displayName}
            })
            setUsers(options)
        }
    }, [documents])

    // listen to addDocument reponse
    useEffect(()=>{
        if (response.success === true) {
            history.push('/')
        }

    }, [response, history])

    const handleSubmit = async (e) => {
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

        await addDocument(project)
        if (userDoc && !retrieveUserError) {
            updateDocument(authUser.uid, {uploadedImgCount: userDoc.uploadedImgCount+1})
        }
        
    }

    return (
        <div className='create-form'>
            <h2 className='page-title'>Upload New Artwork</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Artwork Name</span>
                    <input 
                     type="text"
                     required
                     onChange={e=>setName(e.target.value)}
                     value={name}
                    />
                </label>

                <label>
                    <span>Artwork Detail</span>
                    <textarea 
                     type="text"
                     required
                     onChange={e=>setDetail(e.target.value)}
                     value={detail}
                    />
                </label>

                <label>
                    <span>Date of Completion</span>
                    <input 
                     type="date"
                     required
                     onChange={e=>setDate(e.target.value)}
                     value={date}/>
                </label>

                <label>
                    <span>Artwork Category</span>
                    <Select
                     maxMenuHeight='100px'
                     onChange={(option)=>setCategory(option)}
                     options={categories}
                    />
                </label>

                <label>
                    <span>Credits To</span>
                    <Select 
                     maxMenuHeight='100px'
                     options={users}
                     onChange={(option)=>setAssignedUsers(option)}
                     isMulti/>
                </label>

                {formError && <p className='error'>{formError}</p>}

                {!response.isPending && <button style={{'marginBottom': '100px'}} className='btn'>Add</button>}
                {response.isPending &&  <button style={{'marginBottom': '100px'}} disabled className='btn'>Adding...</button>}
            </form>
        </div>
    )
}
