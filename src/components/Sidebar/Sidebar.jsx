import { NavLink } from 'react-router-dom'
import Avatar from '../Avatar/Avatar'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useDocument } from '../../hooks/useDocument'

// styles & assets
import './Sidebar.css'
import DashbordIcon from '../../assets/dashboard_icon.svg'
import AddIcon from '../../assets/add_icon.svg'
import AccountIcon from '../../assets/manage_accounts.svg'

export default function Sidebar() {

    const { user: authUser } = useAuthContext()
    const { error: retrieveUserError, document: userDoc } = useDocument('users', authUser.uid)

    return (
        <div className='sidebar'>
            <div className='sidebar-content'>

                <div className='user'>
                    <Avatar src={authUser.photoURL}/>
                    <p>Hey {authUser.displayName}</p>
                    {userDoc && !retrieveUserError && <p>{userDoc.uploadedImgCount} ★</p>}
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
                                <span>New Artwork</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink exact to='/account'>
                                <img src={AccountIcon} alt="account-icon"/>
                                <span>Account</span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}
