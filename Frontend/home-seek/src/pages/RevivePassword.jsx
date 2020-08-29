import React, {useState} from 'react'
import { connect } from 'react-redux'
import { revivePassword } from '../redux/actions/userActions'
import '../styles/revivepass-styles.css'

const RevivePassword = (props) => {
    const [password, setPassword] = useState({
        newPassword : '',
        confirmPassword : '',
        error : null,
        message : null
    })

    const handleChange = e => {
        e.preventDefault()
        setPassword({...password, [e.target.name] : e.target.value})
    }
    const handleSubmit = e => {
        e.preventDefault()
        if (password.newPassword.length < 5 || password.confirmPassword.length < 5 || password.newPassword !== password.confirmPassword ){
            setPassword({...password, error : 'invalid format', message: null})
        } else {
            props.revivePassword(props.match.params.token, password)
            setPassword({...password, message : 'password changed successfully', error : null})
        }
    }


    return (
        <div className="revive-pass-container">
            <form className='revive-pass-form' onSubmit={handleSubmit}>
                <input type="password" value={password.newPassword} name="newPassword" onChange={handleChange} placeholder='enter a new password'/>
                <input type="password" value={password.confirmPassword} name="confirmPassword" onChange={handleChange}  placeholder='confirm password'/>
                <input type="submit" value="submit"/>
                {
                    password.error ? <p style ={{ color : 'orangered', padding : 0, margin : 0}} >{password.error}</p>
                    : null
                }
            </form>
        </div>
    )
}

export default connect(null, {revivePassword}) (RevivePassword)
