import React, {  Component } from 'react';
import { connect } from 'react-redux';
import { loginUser, loginViaThirdParty } from '../redux/actions/userActions';
import { userValidation } from '../helpers/errorHanlder';
import { Link } from 'react-router-dom'
import { GoogleLogin } from 'react-google-login'
import { GOOGLE_CLIENT_ID,  FACEBOOK_APP_ID } from '../config'
import FacebookLogin from 'react-facebook-login'
import '../styles/signin-styles.css'

class Loginpage extends Component{
	state = {
		email : "",
		password : "",
		firstName : '',
		lastName : '',
		image : '',
		error : null
	}
    
     handleChange = (e) => {
		this.setState({[e.target.name] : e.target.value})
    }

     handleSubmit = (e) => {
		e.preventDefault();
		const isValidate = userValidation('signIn', this.state)
		if(isValidate) {
			this.props.loginUser(this.state)
			this.setState({error : ""})
			// return !user.error ? props.history.push('/') : null
		} else this.setState({error : "invalid credentials"})
	}

	 responseGoogle = res => {
		if (res.error) {
			this.setState({ error : res.error})
		}
		else {
			console.log(res)
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

	componentDidUpdate(prevProps){
		if(prevProps !== this.props){
			return this.props.user.isAuthenticating
				? this.setState({error : this.props.user.errorMessage})
				: undefined		
		}
	}

	render(){
		return (
			<>
				<div className='login-form-container'>
					<form className='login-form' onSubmit={this.handleSubmit}>
						<h1>Sign In</h1>
						<input
							type="email"
							name="email"
							onChange={this.handleChange}
							value={this.state.email}
							placeholder="Email"
							required
						/>
						<input
							type="password"
							name="password"
							onChange={this.handleChange}
							value={this.state.password}
							placeholder="password"
							required
						/>
						<Link to='/forgotPassword'  className="forgot-pass-btn" >forgot Password</Link>
						{/* {
							this.state.error
							?	<p style={{ 
									color:"red",
									textAlign : 'center',
									fontWeight : 800, 
									fontFamily : 'monospace', 
									padding : 0, margin : '6px' 
								}}>{this.state.error}</p>
							:	null
						} */}
						<input type="submit" value="Login"/>
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
					<img className='signin-image' src="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/authentication_fsn5.svg" alt=""/>
				</div>
			</>
		);	
	}
}

const mapStateToProps = storeState => {
    return { user : storeState.userState}
}

export default connect(mapStateToProps, { loginUser, loginViaThirdParty })(Loginpage);
