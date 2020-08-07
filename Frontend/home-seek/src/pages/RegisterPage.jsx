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
    }
	render() {
		return (
            //<Redirect to="/register" /> 
            
		//) : (
			<form onSubmit={this.handleSubmit}>
				<input
					type="text"
					name="firstName"
					onChange={this.handleChange}
					value={this.state.firstName}
					placeholder="firstName"
					required
				/>
                <br/>
				<input
					type="text"
					name="lastName"
					onChange={this.handleChange}
					value={this.state.lastName}
					placeholder="lastName"
					required
				/>
                <br/>
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
                <input type="submit" value="Register"/>
			</form>
		);
	}
}

const mapStateToProps = (storeState) => {
    return { user : storeState.userState.user}
}

export default connect(mapStateToProps, { registerUser })(RegisterPage);
