// styles
import Select from 'react-select'
import { useState } from 'react'
import './Create.css'

const categories = [
    {value: 'design', label: 'Design'},
    {value: 'sales', label: 'Sales'},
    {value: 'marketing', label: 'Marketing'},
    {value: 'dev', label: 'Development'}
]

export default function Create() {

    const [name, setName] = useState('')
    const [detail, setDetail] = useState('')
    const [date, setDate] = useState('')
    const [category, setCategory] = useState('')
    // const [asignedUsers, setAssignedUsers] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(name, detail, date, category)
    }

    return (
        <div className='create-form'>
            <h2 className='page-title'>Schedule New Event</h2>
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
                     maxMenuHeight='80px'
                     onChange={(option)=>setCategory(option)}
                     options={categories}
                    />
                </label>

                <label>
                    <span>Set Assignee</span>
                    {/* {set assignee} */}
                </label>

                <button className='btn'>Add Event</button>
            </form>
        </div>
    )
}
