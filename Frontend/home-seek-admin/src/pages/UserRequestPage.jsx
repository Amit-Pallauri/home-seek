import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserRequests, getOwnerRequests, deleteOwnerRequests, deleteUserRequests } from '../store/userRequest';
import UserRequestList from '../components/UserRequestList';
//import { Spin } from 'antd';

class UserRequestPage extends Component {
	componentDidMount() {
		this.props.getUserRequests();
		this.props.getOwnerRequests();
	}

	handleClick = (requestId) => {
		this.props.deleteOwnerRequests(requestId);
	};

	handleClick1 = (requestId) => {
		this.props.deleteUserRequests(requestId)
	}
	render() {
		console.log(this.props.ownerRequests)
		if (!this.props.admin) return <Redirect to="/" />;
		return this.props.userRequests && this.props.ownerRequests ? (
			<UserRequestList
				userRequests={this.props.userRequests.UserRequests}
				ownerRequests={this.props.ownerRequests.OwnerRequests}
				onDelete={this.handleClick}
				onDelete1={this.handleClick1}
			/>
		) : null;
	}
}

const mapStateToProps = (storeState) => {
	return {
		admin: storeState.features.admin.admin,
		homes: storeState.features.ownerHomes.homes,
		userRequests: storeState.features.requests.userRequests,
		ownerRequests: storeState.features.requests.ownerRequests
	};
};

export default connect(mapStateToProps, { getUserRequests, getOwnerRequests, deleteOwnerRequests, deleteUserRequests })(UserRequestPage);
