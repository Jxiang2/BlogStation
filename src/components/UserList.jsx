import { useCollection } from '../hooks/useCollection'
import { useAuthContext } from '../hooks/useAuthContext'
import Avatar from './Avatar'

// styles
import './UserList.css'

export default function UserList() {

    const { error, documents } = useCollection('users')
    const { user: authUser } = useAuthContext()
    

    return (
        <div className='user-list'>
            <h2>Users</h2>
            {error && <div className='error'>{error}</div>}

            {documents && documents
            .filter((user)=> {
                return user.id !== authUser.uid
            }).map((user)=>(
                <div key={user.id} className='user-list-item'>
                    {user.online && <span className='online-user'></span>}
                    <span>{user.displayName}</span>
                    <Avatar src={user.photoURL}/>
                </div>
            ))}

        </div>
    )
}
