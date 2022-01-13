// styles
import { useState } from 'react'
import { useUpdateProfile } from '../../hooks/useUpdateProfile'
import './Account.css'

export default function Account() {

    const [displayName, setDisplayName] = useState('')
    const [thumbmail, setThumbmail] = useState(null)
    const [thumbmailError, setThumbmailError] = useState(null)
    const { changeDisplayName, 
            error: changeDisplayNameError, 
            isPending: changeDisplayNameIspending } = useUpdateProfile('users')

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

    const handleChangeDisplayName = (e) => {
        e.preventDefault()
        if (displayName) {
            changeDisplayName(displayName)
        } else {

        }
        
    }

    const handleChangechangeAvatar = async (e) => {
        e.preventDefault()
        console.log(thumbmail);
    }

    return (
        <>
            <label className='change-displayName'>
                <span>Display Name: </span>
                <input 
                 type="text" 
                 required
                 onChange={(e)=>setDisplayName(e.target.value)}
                 value={displayName}
                 maxLength={15}
                />

                {displayName && (
                    !changeDisplayNameIspending ?
                    <button 
                    style={{marginTop: '10px'}} 
                    className='btn'
                    onClick={handleChangeDisplayName}>Submit</button> :

                    <button 
                    style={{marginTop: '10px'}} 
                    className='btn'
                    disabled
                    onClick={handleChangeDisplayName}>Submitting...</button>
                )}

                {changeDisplayNameError && <p className='error'>{changeDisplayNameError}</p>}
            </label>   
            
            <label className='changeAvatar'>
                <span>Profile Image: </span>
                <input 
                 type="file" 
                 required
                 onChange={handleFileChange}
                />
                {thumbmailError && <div className='error'>{thumbmailError}</div>}
                
                {thumbmail &&
                    <button 
                    style={{marginTop: '10px'}} 
                    className='btn'
                    onClick={handleChangechangeAvatar}>Upload</button>} 
            </label>  
        </>
    )
}
