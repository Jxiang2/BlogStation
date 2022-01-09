import { NavLink } from 'react-router-dom'

// styles & assets
import './Sidebar.css'
import DashbordIcon from '../assets/dashboard_icon.svg'
import AddIcon from '../assets/add_icon.svg'

export default function Sidebar() {
    return (
        <div className='sidebar'>
            <div className='sidebar-content'>

                <div className='user'>
                    <p>Hey user</p>
                </div>

                <nav className='links'>
                    <ul>
                        <li>
                            <NavLink exact to='/'> {/* NavLink gains am active class when it's clicked} */}
                                <img src={DashbordIcon} alt="dashboard-icon"/>
                                <span>Dashboard</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink exact to='/create'>
                                <img src={AddIcon} alt="add-icon"/>
                                <span>New Event</span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>

            </div>
        </div>
    )
}
