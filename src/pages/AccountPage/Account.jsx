// styles
import { useState } from 'react'
import { useUpdateProfile } from '../../hooks/useUpdateProfile'
import { useAuthContext } from '../../hooks/useAuthContext'
import { projectAuth } from '../../firebase/config'
import './Account.css'

export default function Account() {

    const [displayName, setDisplayName] = useState('')
    const [showEmailSent, setShowEmailSent] = useState(false)
    const [emailError, setEmailError] = useState(null)
    const { user: authUser} = useAuthContext()
    const { changeDisplayName,
            error: changeDisplayNameError, 
            isPending: changeDisplayNameIspending } = useUpdateProfile('users')

    const handleChangeDisplayName = (e) => {
        e.preventDefault()
        if (displayName) {
            changeDisplayName(displayName)
        }
    }

    const resetPwd = () => {
        setEmailError(null)
        setShowEmailSent(true)
        setTimeout(()=>setShowEmailSent(false), 5000)
        projectAuth.sendPasswordResetEmail(authUser.email)
        .then(() => {
            console.log('email is sent')
        })
        .catch((error) => {
            console.log(error.message)
            setEmailError('failed to send email, try again later')
        });
    }

    return (
        <>
            <label className='change-displayName'>
                <span>Change Display Name </span>
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
                    style={{marginTop: '10px', marginLeft: '10px'}} 
                    className='btn'
                    onClick={handleChangeDisplayName}>Submit</button> :

                    <button 
                    style={{marginTop: '10px', marginLeft: '10px'}} 
                    className='btn'
                    disabled
                    onClick={handleChangeDisplayName}>Submitting...</button>
                )}

                {changeDisplayNameError && <p className='error'>{changeDisplayNameError}</p>}
            </label>  

            {!showEmailSent && <button style={{marginTop: '10px'}} className='btn' onClick={resetPwd}>Reset Password</button>}
            {showEmailSent && <button style={{marginTop: '10px'}} className='btn' disabled onClick={resetPwd}>Reset Password</button>}
            {showEmailSent && <p style={{color: 'green'}}>a password reset email is sent</p>}
            {emailError && <p>{emailError}</p>}
        </>
    )
}
