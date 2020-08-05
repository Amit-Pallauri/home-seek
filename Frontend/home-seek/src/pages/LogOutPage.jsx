import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../redux/actions/userActions';
//import {Redirect} from 'react-router-dom';
class Loginpage extends Component {
    
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.logoutUser()
    }
	render() {
		return (
            //<Redirect to="/register" /> 
            
		//) : (
			<form onSubmit={this.handleSubmit}>
                <input type="submit" value="Logout"/>
			</form>
		);
	}
}

// const mapStateToProps = (storeState) => {
//     return { user : storeState.userState.user}
// }

export default connect(null, { logoutUser })(Loginpage);
