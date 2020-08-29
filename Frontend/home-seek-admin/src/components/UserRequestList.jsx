import React, { Component } from 'react';
import ListingRequest from './ListingRequest';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { deleteUserRequests } from '../store/userRequest';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

function callback(key) {
	console.log(key);
}

class UserRequestList extends Component {
	handleClick = (requestId) => {
		this.props.deleteUserRequests(requestId);
	};
	render() {
		return (
			<div>
				<Tabs defaultActiveKey="1" onChange={callback}>
					<TabPane tab="UserRequests" key="1">
						{this.props.requests ? (
							<div>
								<h1>User Requests</h1>
								{this.props.requests.map((requests) => {
									return requests.user.owner === false ? (
										<div key={requests._id}>
											<h1>{requests.requests}</h1>
											<Button
												type="primary"
												onClick={() => this.handleClick(requests._id)}
												danger
											>
												Delete Request
											</Button>{' '}
										</div>
									) : null;
								})}
							</div>
						) : null}
					</TabPane>
					<TabPane tab="OwnerRequests" key="2">
						{this.props.requests ? (
							<div>
								<h1>Owner Requests</h1>
								{this.props.requests.map((requests) => {
									return requests.user.owner === true ? (
										<div key={requests._id}>
											<h1>{requests.request}</h1>
											<h2>{requests.description}</h2>
											<ListingRequest listing={requests.user.listings} />
											<Button
												type="primary"
												onClick={() => this.handleClick(requests._id)}
												danger
											>
												Delete Request
											</Button>
											<br />
											<br />
										</div>
									) : null;
								})}
							</div>
						) : null}
					</TabPane>
				</Tabs>
			</div>
		);
	}
}

export default connect(null, { deleteUserRequests })(UserRequestList);
