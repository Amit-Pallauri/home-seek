import React, { useState } from 'react'
import { connect } from 'react-redux'
import { forgotPassword } from '../redux/actions/userActions'
import validator from 'validator'
import '../styles/forgotpass-styles.css'

const ForgotPassword = (props) => {
    const [data, setEmail] = useState({
        email : '',
        error : '',
        message : ''
    })

    const handleChange = e => {
        e.preventDefault()
        setEmail({ ...data, email: e.target.value})
    }

    const handleSubmit = e => {
        e.preventDefault();
        const isValidate = validator.isEmail(data.email)
        if(isValidate) {
            props.forgotPassword(data.email)
            setEmail({...data, message: 'kindly check your mail', error : null})
        }else setEmail({...data, error : "invalid credentials", message : null})
    }
    return (
        <div className='forgot-pass-container'>
            <form className="forgot-pass-form" onSubmit={handleSubmit}>
                <div>
                    <input name="email" type="email" value={data.email} onChange={handleChange} placeholder="please enter your mail" required/>
                    <input type="submit"/>
                </div>
                <div>
                    {
                        data.error 
                        ? <p style={{ margin: 0, color: 'red' }}>{data.error}</p> 
                        : null
                    }
                </div>
            </form>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        message : state.userState.message
    }
}

export default connect(mapStateToProps, { forgotPassword}) (ForgotPassword)