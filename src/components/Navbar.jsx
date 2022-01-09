import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'

// styles & assets
import './Navbar.css'
import Temple from '../assets/temple.svg'

export default function Navbar() {

    const {logout, isPending} = useLogout()

    return (
        <div className='navbar'>
            <ul>
                <li className='logo'>
                    <Link to='/'>
                        <img src={Temple} alt="evetns logo" />
                        <span>The Events</span>
                    </Link>
                </li>

                <li>
                    <Link to='/login'>Login</Link>
                </li>

                <li>
                    <Link to='/signup'>Signup</Link>
                </li>

                {!isPending && <button className='btn' onClick={logout}>Logout</button>}
                {isPending && <button className='btn' disabled>Logging out...</button>}
            </ul>
        </div>
    )
}