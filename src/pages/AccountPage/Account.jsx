// styles
import { useState } from 'react'
import { useUpdateProfile } from '../../hooks/useUpdateProfile'
import './Account.css'

export default function Account() {

    const [displayName, setDisplayName] = useState('')
    const [thumbmail, setThumbmail] = useState(null)
    const [thumbmailError, setThumbmailError] = useState(null)
    const { changeDisplayName, error, isPending } = useUpdateProfile('users')

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
    }

    const handleChangeDisplayName = async (e) => {
        e.preventDefault()
        console.log(displayName);
        // changeDisplayName(displayName)
    }

    const handleChangechangeAvatar = async (e) => {
        e.preventDefault()
        console.log(thumbmail);
    }

    return (
        <div>
            <label>
                <span>Display Name: </span>
                <input 
                 type="text" 
                 required
                 onChange={(e)=>setDisplayName(e.target.value)}
                 value={displayName}
                 maxLength={15}
                />
                <button 
                 style={{marginTop: '10px'}} 
                 className='btn'
                 onClick={handleChangeDisplayName}>submit</button>
            </label>   

            <label>
                <span>Profile Image: </span>
                <input 
                 type="file" 
                 required
                 onChange={handleFileChange}
                />
                {thumbmailError && <div className='error'>{thumbmailError}</div>}
                <button 
                 style={{marginTop: '10px'}} 
                 className='btn'
                 onClick={handleChangechangeAvatar}>submit</button>
            </label>  
        </div>
    )
}
