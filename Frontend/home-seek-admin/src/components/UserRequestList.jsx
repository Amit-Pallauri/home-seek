import React, { Component } from 'react';
import ListingRequest from './ListingRequest';
import { Button, Descriptions } from 'antd';
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
											<Descriptions title={requests.request} layout="horizontal">
											<Descriptions.Item label="UserName">{requests.user.firstName}</Descriptions.Item>
											<Descriptions.Item label="Telephone">{requests.user.phoneNumber}</Descriptions.Item>
											<Descriptions.Item label="Society Name">{requests.user.home.societyName}</Descriptions.Item>
											<Descriptions.Item label="Home Address">
												{requests.user.home.location.formattedAddress}
											</Descriptions.Item>
											<Descriptions.Item label="Owner name">{requests.user.home.name}</Descriptions.Item>
												<div>
													<Button
														type="primary"
														onClick={() => this.props.onDelete1(requests._id)}
														danger
													>
														Delete Request
													</Button>{' '}
												</div>
											</Descriptions>
											
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
											<div style={{ borderBottom : '1px solid lightgrey', width : '35%', padding : '20px'}}>
												<h3>Request: {requests.request}</h3>
												<p>Description : {requests.description}</p>
											</div>
											<ListingRequest listing={requests.listing} />
											<Button
												type="primary"
												onClick={() => this.props.onDelete(requests._id)}
												danger
											>
												Delete Request
											</Button>
											<hr />
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
