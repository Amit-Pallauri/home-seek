import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { profile } from '../store/adminReducer';
import { Card, Avatar } from 'antd';
const { Meta } = Card;

class ProfilePage extends Component {
	componentDidMount() {
		this.props.profile();
	}
	render() {
		if (!this.props.admin) return <Redirect to="/" />;
		return this.props.adminDetails ? (
			<div>
				<Card
					style={{
						 width: 300 
					}}
				>
					<Meta
						avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
						title={`Name: ${this.props.adminDetails.adminProfile.name}`}
						description={`Email: ${this.props.adminDetails.adminProfile.email}`}
					/>
					<p>Role: {this.props.adminDetails.adminProfile.role} </p>
				</Card>
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
