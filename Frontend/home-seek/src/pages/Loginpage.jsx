import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { loginUser, loginViaThirdParty } from '../redux/actions/userActions';
import { userValidation } from '../helpers/errorHanlder';
import { Link } from 'react-router-dom'
import '../styles/signin-styles.css'

const Loginpage = (props) => {
	const [user, setUser] = useState({
		email : "",
		password : "",
		error : null
	})
    
    const handleChange = (e) => {
		setUser({...user, [e.target.name] : e.target.value})
    }

    const handleSubmit = (e) => {
		e.preventDefault();
		const isValidate = userValidation('signIn', user)
		if(isValidate) {
			props.loginUser(user)
			setUser({...user, error : ""})
			// return !user.error ? props.history.push('/') : null
		} else setUser({...user, error : "invalid credentials"})
	}

	useEffect(()=> {
		return props.user.isAuthenticating
				? setUser({...user, error : props.user.errorMessage})
				: undefined
	}, [props.user])

	return (
		<>
			<div className='login-form' style={{height: '350px'}}>
				<form onSubmit={handleSubmit}>
					<h1>Login page</h1>
					<input
						type="email"
						name="email"
						onChange={handleChange}
						value={user.email}
						placeholder="Email"
						required
					/>
					<input
						type="password"
						name="password"
						onChange={handleChange}
						value={user.password}
						placeholder="password"
						required
					/>
					<Link to='/forgotPassword'  className="forgot-pass-btn" >forgot Password</Link>
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
					<input type="submit" value="Login"/>
					<div className='thirdPartyAuth'>
						<a className='google-login'  href='http://localhost:3000/google'><img  alt='google' src="https://img.icons8.com/material-sharp/24/000000/google-logo.png"/></a>
						<a className='google-login' href='http://localhost:3000/fb'><img  alt='facebook' src="https://img.icons8.com/material-sharp/24/000000/facebook-f.png"/></a>
					</div>
				</form>
			</div>
			<div>
				<img className='signin-image' src="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/authentication_fsn5.svg" alt=""/>
			</div>
		</>
	);
}

const mapStateToProps = storeState => {
    return { user : storeState.userState}
}

export default connect(mapStateToProps, { loginUser, loginViaThirdParty })(Loginpage);
