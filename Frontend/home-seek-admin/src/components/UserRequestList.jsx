import React, { Component } from 'react';
import ListingRequest from './ListingRequest';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { getOwnerRequests } from '../store/userRequest';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

function callback(key) {
	console.log(key);
}
class UserRequestList extends Component {

	render() {
		//console.log(this.props.userRequests)
		return (
			<div>
				<Tabs defaultActiveKey="1" onChange={callback}>
					<TabPane tab="UserRequests" key="1">
						{this.props.userRequests ? (
							<div>
								{this.props.userRequests.map((requests) => {
									return  (
										<div key={requests._id}>
											<h1>{requests.request}</h1>
											<Button
												type="primary"
												onClick={() => this.props.onDelete1(requests._id)}
												danger
											>
												Delete Request
											</Button>{' '}
										</div>
									);
								})}
							</div>
						) : null}
					</TabPane>
					<TabPane tab="OwnerRequests" key="2">
						{this.props.ownerRequests ? (
							<div>
								{this.props.ownerRequests.map((requests) => {
									return requests.user.owner === true ? (
										<div key={requests._id} >
											<h1>{requests.request}</h1>
											<h2>{requests.description}</h2>
											<ListingRequest listing={requests.listing} />
											<Button
												type="primary"
												onClick={() => this.props.onDelete(requests._id)}
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

export default connect(null, { getOwnerRequests })(UserRequestList);
