import { Link } from 'react-router-dom'

// styles & assets
import './Navbar.css'
import Temple from '../assets/temple.svg'

export default function Navbar() {
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

                <button className='btn'>Logout</button>
            </ul>
        </div>
    )
}