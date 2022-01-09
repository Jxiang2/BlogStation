import { useState } from 'react'
import { useSignup } from '../hooks/useSignup'

// styles
import './Signup.css'

export default function Signup() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [displayName, setDisplayName ] = useState('')

    const [thumbmail, setThumbmail] = useState(null)
    const [thumbmailError, setThumbmailError] = useState(null)

    const { signup, isPending, error } = useSignup()

    const handleSubmit = (e) => {
        e.preventDefault()
        signup(email, password, displayName, thumbmail)
    }

    const handleFileChange = (e) => {
        setThumbmail(null)
        let selected = e.target.files[0]
        if (!selected) {
            setThumbmailError('Please select a file')
            return
        }
        if (!selected.type.includes('image')) {
            setThumbmailError('Selected file must be an image')
            return 
        }
        if (selected.size > 500000) {
            setThumbmailError('Image size must be less than 100kb')
            return
        }

        // valid file
        setThumbmailError(null)
        setThumbmail(selected)
        console.log('thumbmail updated')
    }

    return (
        <form className='auth-form' onSubmit={handleSubmit}>

            <h2>Sign up</h2>

            <label>
                <span>Email: </span>
                <input 
                 type="email" 
                 required
                 onChange={(e)=>setEmail(e.target.value)}
                 value={email}
                />
            </label>

            <label>
                <span>Password: </span>
                <input 
                 type="password" 
                 required
                 onChange={(e)=>setPassword(e.target.value)}
                 value={password}
                />
            </label>

            <label>
                <span>Display Name: </span>
                <input 
                 type="text" 
                 required
                 onChange={(e)=>setDisplayName(e.target.value)}
                 value={displayName}
                />
            </label>   

            <label>
                <span>Profile Image: </span>
                <input 
                 type="file" 
                 required
                 onChange={handleFileChange}
                />
                {thumbmailError && <div className='error'>{thumbmailError}</div>}
            </label>  

            {!isPending && <button className='btn'>Sign up</button>}
            {isPending && <button className='btn' disabled>Loading...</button>}
            {error && <p className='error'>error</p>}

        </form>
    )
}
