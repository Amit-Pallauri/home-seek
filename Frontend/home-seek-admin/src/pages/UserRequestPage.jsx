import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserRequests } from '../store/userRequest';
import UserRequestList from '../components/UserRequestList';
//import { Spin } from 'antd';

class UserRequestPage extends Component {
	componentDidMount() {
		this.props.getUserRequests();
	}
	render() {
        //console.log(this.props.userRequests)
		if (!this.props.admin) return <Redirect to="/" />;
		return this.props.userRequests ? <UserRequestList requests={this.props.userRequests.UserRequests} /> : null;
	}
}

const mapStateToProps = (storeState) => {
    return {
        admin: storeState.features.admin.admin,
        homes : storeState.features.ownerHomes.homes,
        userRequests: storeState.features.requests.userRequests
    }
}

export default connect(mapStateToProps, {getUserRequests})(UserRequestPage);
