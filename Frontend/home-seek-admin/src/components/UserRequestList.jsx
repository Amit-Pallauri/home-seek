import React, { Component } from 'react';
import ListingRequest from './ListingRequest';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { deleteUserRequests } from '../store/userRequest';

class UserRequestList extends Component {
	handleClick = (requestId) => {
		this.props.deleteUserRequests(requestId);
	};
	render() {
		return (
			<div>
				{this.props.requests ? (
					<div>
						<h1>User Reuests</h1>
						{this.props.requests.map((requests) => {
							return requests.user.owner === false ? (
								<div key={requests._id}>
									<h1>{requests.requests}</h1>
									<Button type="primary" onClick={() => this.handleClick(requests._id)} danger>
										Delete Request
									</Button>{' '}
								</div>
							) : null;
						})}
					</div>
				) : null}
				<div>
					{this.props.requests ? (
						<div>
							<h1>Owner Requests</h1>
							{this.props.requests.map((requests) => {
								return requests.user.owner === true ? (
									<div key={requests._id}>
										<h1>{requests.requests}</h1>
										<ListingRequest listing={requests.user.listings} />
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
			</div>
		);
	}
}

export default connect(null, { deleteUserRequests })(UserRequestList);
