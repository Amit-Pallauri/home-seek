import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { profile } from '../store/adminReducer';

class ProfilePage extends Component {
	componentDidMount() {
		this.props.profile();
	}
	render() {
		if (!this.props.admin) return <Redirect to="/" />;
		return this.props.adminDetails ? (
			<div>
				<h1>Name: {this.props.adminDetails.adminProfile.name}</h1>
				<p>Email: {this.props.adminDetails.adminProfile.email} </p>
				<p>Role: {this.props.adminDetails.adminProfile.role} </p>
			</div>
		) : null;
	}
}

const mapStateToProps = (storeState) => {
	return {
		admin: storeState.features.admin.admin,
		adminDetails: storeState.features.admin.adminDetails,
		homes: storeState.features.ownerHomes.homes
	};
};

export default connect(mapStateToProps, { profile })(ProfilePage);
