import { useState } from 'react'

// styles
import './Login.css'

export default function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(email, password)
    }

    return (
        <form className='auth-form' onSubmit={handleSubmit}>

            <h2>login</h2>

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

            <button>Login</button>

            {/* {!isPending && <button className='btn'>Sign up</button>}
            {isPending && <button className='btn' disabled>Loading...</button>}
            {error && <p className='error'>error</p>} */}

        </form>
    )
}
