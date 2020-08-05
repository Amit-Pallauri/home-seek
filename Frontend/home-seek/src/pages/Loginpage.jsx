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
    }
	render() {
		return (
            //<Redirect to="/register" /> 
            
		//) : (
			<form onSubmit={this.handleSubmit}>
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
			</form>
		);
	}
}

const mapStateToProps = (storeState) => {
    return { user : storeState.userState.user}
}

export default connect(mapStateToProps, { loginUser })(Loginpage);
