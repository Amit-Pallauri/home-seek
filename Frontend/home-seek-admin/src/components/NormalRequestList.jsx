import React, { Component } from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { deleteNormalRequests } from '../store/userRequest';

class NormalRequestList extends Component {
	handleClick = (requestId) => {
		this.props.deleteNormalRequests(requestId);
	};
	render() {
		return (
			<div>
				{this.props.requests ? (
					<div>
						<h1>Normal Requests</h1>
						{this.props.requests.map((requests) => {
							return requests  ? (
								<div key={requests._id}>
									<h3>Request: {requests.request}</h3>
									<p>HouseSocietyName: {requests.home.societyName}</p>
									<p>HouseLocation: {requests.home.details.location.formattedAddress}</p>
									<p>Rent: {requests.home.details.rent} Rs</p>
									<p>VisiterName: {requests.user.firstName}</p>
									<p>VisiterEmail: {requests.user.email}</p>
									<p>VisiterphoneNumber: {requests.user.phoneNumber}</p>
									<p>OwnerName: {requests.home.name}</p>
									<p>OwnerPhoneNumber: {requests.home.phoneNumber}</p>
									<Button type="primary" onClick={() => this.handleClick(requests._id)} danger>
										Delete Request
									</Button>
									<br />
									<br />
								</div>
							) : null;
						})}
					</div>
				) : null}
			</div>
		);
	}
}

export default connect(null, { deleteNormalRequests })(NormalRequestList);
