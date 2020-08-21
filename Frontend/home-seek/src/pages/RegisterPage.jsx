import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { registerUser, loginViaThirdParty } from '../redux/actions/userActions';
import { userValidation } from '.././helpers/errorHanlder'
import '../styles/signup-styles.css'

const RegisterPage = (props) => {
	const [user, setUser] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		error : null
	})
    
    const handleChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value })
	}
	
	const handleClick = e => {
		loginViaThirdParty()
	}

    const handleSubmit = (e) => {
			e.preventDefault();
			const isValidate = userValidation('signUp', user)
			if(isValidate){ 
				props.registerUser(user)
				setUser({...user, error : null})
				// return !user.error ? props.history.push('/signIn') : null
			} else setUser({...user, error : 'invalid credentials'})			
	}
	useEffect(()=> {
		return props.user.isAuthenticating
				? setUser({...user, error : props.user.errorMessage})
				: undefined
	}, [props.user])

	return (
		<>
			<div className='register-form'>
				<form  onSubmit={handleSubmit}>
					<h1>Sign Up</h1>
					<input
						type="text"
						name="firstName"
						onChange={handleChange}
						value={user.firstName}
						placeholder="FirstName"
						required
					/>
					<input
						type="text"
						name="lastName"
						onChange={handleChange}
						value={user.lastName}
						placeholder="LastName"
						required
					/>
					<input
						type="email"
						name="email"
						onChange={handleChange}
						value={user.email}
						placeholder="Enter your email"
						required
					/>
					<input
						type="password"
						name="password"
						onChange={handleChange}
						value={user.password}
						placeholder="Enter password"
						required
					/>
					{
						user.error
						?	<p style={{ 
								color:"red",
								textAlign : 'center',
								fontWeight : 800, 
								fontFamily : 'monospace', 
								padding : 0, margin : '6px' 
							}}>{user.error}</p>
						:	null
					}
					<input type="submit" value="Register"/>
					<div className='thirdPartyAuth'>
						<a onClick={handleClick} className='google-login' href='http://localhost:3000/google'><img alt='google' src="https://img.icons8.com/material-sharp/24/000000/google-logo.png"/></a>
						<a className='google-login' href='http://localhost:3000/fb'><img alt='facebook' src="https://img.icons8.com/material-sharp/24/000000/facebook-f.png"/></a>
					</div>
				</form>
			</div>
			<div >
				<img className='signup-image' src='https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/sign_in_e6hj.svg' alt="signUp image"/>
			</div>
		</>
		);
}

const mapStateToProps =  (storeState) => {
    return { 
		user : storeState.userState,
	}
}

export default connect(mapStateToProps, { registerUser })(RegisterPage);
