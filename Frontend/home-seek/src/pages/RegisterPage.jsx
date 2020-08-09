import React, { Component } from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../redux/actions/userActions';
//import {Redirect} from 'react-router-dom';
class RegisterPage extends Component {
	state = {
		firstName: '',
		lastName: '',
		email: '',
		password: ''
    };
    
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault();
		this.props.registerUser(this.state)
		this.props.history.push('/signIn')
	}
	
	render() {
		return (
		<div className='register-form'>
			<form  onSubmit={this.handleSubmit}>
				<h1>Sign Up</h1>
				<input
					type="text"
					name="firstName"
					onChange={this.handleChange}
					value={this.state.firstName}
					placeholder="FirstName"
					required
				/>
                {/* <br/> */}
				<input
					type="text"
					name="lastName"
					onChange={this.handleChange}
					value={this.state.lastName}
					placeholder="LastName"
					required
				/>
                {/* <br/> */}
				<input
					type="email"
					name="email"
					onChange={this.handleChange}
					value={this.state.email}
					placeholder="Enter your email"
					required
				/>
                {/* <br/> */}
				<input
					type="password"
					name="password"
					onChange={this.handleChange}
					value={this.state.password}
					placeholder="Enter password"
					required
				/>
                {/* <br/> */}
                <input type="submit" value="Register"/>
				<a className='google-login' href='http://localhost:3000/google'><img alt='google' src="https://img.icons8.com/material-sharp/24/000000/google-logo.png"/></a>
				<a className='google-login' href='http://localhost:3000/fb'><img alt='facebook' src="https://img.icons8.com/material-sharp/24/000000/facebook-f.png"/></a>
			</form>
		</div>
		);
	}
}

const mapStateToProps = (storeState) => {
    return { user : storeState.userState.user}
}

export default connect(mapStateToProps, { registerUser })(RegisterPage);
