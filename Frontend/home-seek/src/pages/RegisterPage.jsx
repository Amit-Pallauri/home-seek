import React, { Component } from 'react';
import { connect } from 'react-redux';
import { registerUser, loginViaThirdParty } from '../redux/actions/userActions';
import { userValidation } from '.././helpers/errorHanlder'
import { GoogleLogin } from 'react-google-login'
import { GOOGLE_CLIENT_ID,  FACEBOOK_APP_ID } from '../config'
import FacebookLogin from 'react-facebook-login'

import '../styles/signup-styles.css'

class RegisterPage extends Component{
	state = {
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		error : null
	}
    
    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value })
	}

    handleSubmit = (e) => {
			e.preventDefault();
			const isValidate = userValidation('signUp', this.state)
			if(isValidate){ 
				this.props.registerUser(this.state)
				this.setState({error : null})
				// return !user.error ? props.history.push('/signIn') : null
			} else this.setState({error : 'invalid credentials'})			
	}

	responseGoogle = res => {
		if (res.error) {
			this.setState({ error : res.error})
		}
		else {
			const { profileObj : { email, givenName : firstName, familyName : lastName, imageUrl : image }} = res
			this.props.loginViaThirdParty({ email, firstName, lastName, image })
		}
	}

	 responseFacebook = res => {
		if(res.error) this.setState({ error : res.error})
		else {
			const { email, name : firstName, picture : {data : {url : image}} } = res
			this.props.loginViaThirdParty({ email, firstName, image })
		}
	}

	// componentDidUpdate(prevProps){
	// 	if(prevProps.user !== this.props )
	// 		return this.props.user.isAuthenticating
	// 			? this.setState({error : this.props.user.errorMessage})
	// 			: undefined
	// }

	render(){
		return (
			<>
				<div className='register-form-container'>
					<form className='register-form'  onSubmit={this.handleSubmit}>
						<h1>Sign Up</h1>
						<input
							type="text"
							name="firstName"
							onChange={this.handleChange}
							value={this.state.firstName}
							placeholder="FirstName"
							required
						/>
						<input
							type="text"
							name="lastName"
							onChange={this.handleChange}
							value={this.state.lastName}
							placeholder="LastName"
							required
						/>
						<input
							type="email"
							name="email"
							onChange={this.handleChange}
							value={this.state.email}
							placeholder="Enter your email"
							required
						/>
						<input
							type="password"
							name="password"
							onChange={this.handleChange}
							value={this.state.password}
							placeholder="Enter password"
							required
						/>
						{
							this.state.error
							?	<p style={{ 
									color:"red",
									textAlign : 'center',
									fontWeight : 800, 
									fontFamily : 'monospace', 
									padding : 0, margin : '6px' 
								}}>{this.state.error}</p>
							:	null
						}
						<input type="submit" value="Register"/>
						<div className='thirdPartyAuth'>
								<GoogleLogin
									clientId = {GOOGLE_CLIENT_ID}
									onSuccess = {this.responseGoogle}
									onFailure = {this.responseGoogle}
									cookiePolicy = {'single_host_origin'}
									className='google-login'
									icon= {true}
									buttonText={false}
								/>
								<FacebookLogin
									tag='button'
									textButton = ' '
									appId = {FACEBOOK_APP_ID}
									fields= "name, email, picture"
									callback={this.responseFacebook}
									version="3.1"
									cssClass='google-login'
									icon='fa-facebook'
								/>
							</div>
					</form>
					<img className='signup-image' src='https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/sign_in_e6hj.svg' alt="signUp"/>
				</div>
			</>
		);
	}
}

const mapStateToProps =  (storeState) => {
    return { 
		user : storeState.userState,
	}
}

export default connect(mapStateToProps, { registerUser, loginViaThirdParty })(RegisterPage);
