import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';
//import {Redirect} from 'react-router-dom';
class Loginpage extends Component {
	state = {
		email: '',
		password: ''
    };
    
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault();
		this.props.loginUser(this.state)
		this.props.history.push('/')
    }
	render() {
		return (
			<div className='login-form'>
				<form onSubmit={this.handleSubmit}>
					<h1>Login page</h1>
					<input
						type="email"
						name="email"
						onChange={this.handleChange}
						value={this.state.email}
						placeholder="Email"
						required
					/>
					<br/>
					<input
						type="password"
						name="password"
						onChange={this.handleChange}
						value={this.state.password}
						placeholder="password"
						required
					/>
					<br/>
					<input type="submit" value="Login"/>
					<a className='google-login' href='http://localhost:3000/google'><img  alt='google' src="https://img.icons8.com/material-sharp/24/000000/google-logo.png"/></a>
					<a className='google-login' href='http://localhost:3000/fb'><img  alt='facebook' src="https://img.icons8.com/material-sharp/24/000000/facebook-f.png"/></a>
				</form>
			</div>
		);
	}
}

const mapStateToProps = (storeState) => {
    return { user : storeState.userState.user}
}

export default connect(mapStateToProps, { loginUser })(Loginpage);
