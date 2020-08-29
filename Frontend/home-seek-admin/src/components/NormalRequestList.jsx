import React, { Component } from 'react';
import { Button, Descriptions } from 'antd';
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
						<h3 style={{ margin : '20px 0', borderBottom : '1px solid lightgrey'}}>Visiting Requests</h3>
						{/* <Descriptions title="Normal Requests" layout="horizontal"> */}
							{this.props.requests.map((requests) => {
								return requests  ? (
									<Descriptions style={{ borderBottom : '1px solid lightgrey'}} key={requests._id}>
										<Descriptions.Item label="Request">{requests.request}</Descriptions.Item>
										<Descriptions.Item label="HouseSocietyName">{requests.home.societyName}</Descriptions.Item>
										<Descriptions.Item label="HouseLocation">{requests.home.details.location.formattedAddress}</Descriptions.Item>
										<Descriptions.Item label="Rent" span={2}>
											{requests.home.details.rent}
										</Descriptions.Item>
										<Descriptions.Item label="VisiterName">{requests.user.firstName}</Descriptions.Item>
										<Descriptions.Item label="VisiterEmail">{requests.user.email}</Descriptions.Item>
										<Descriptions.Item label="VisiterphoneNumber">{requests.user.phoneNumber}</Descriptions.Item>
										<Descriptions.Item label="OwnerName">{requests.home.name}</Descriptions.Item>
										<Descriptions.Item label="OwnerPhoneNumber">{requests.home.phoneNumber}</Descriptions.Item>
										<div>
											<Button type="primary" onClick={() => this.handleClick(requests._id)} danger>
												Delete Request
											</Button>
										</div>
									</Descriptions>
								) : null;
							})}
						{/* </Descriptions> */}
						{/* <Descriptions title="Normal Requests" layout="horizontal">
							<Descriptions.Item label="Request">{requests.request}</Descriptions.Item>
							<Descriptions.Item label="HouseSocietyName">{requests.home.societyName}</Descriptions.Item>
							<Descriptions.Item label="HouseLocation">{requests.home.details.location.formattedAddress}</Descriptions.Item>
							<Descriptions.Item label="Rent" span={2}>
								{requests.home.details.rent}
							</Descriptions.Item>
							<Descriptions.Item label="VisiterName">{requests.user.firstName}</Descriptions.Item>
							<Descriptions.Item label="VisiterEmail">{requests.user.email}</Descriptions.Item>
							<Descriptions.Item label="VisiterphoneNumber">{requests.user.phoneNumber}</Descriptions.Item>
							<Descriptions.Item label="OwnerName">{requests.home.name}</Descriptions.Item>
							<Descriptions.Item label="OwnerPhoneNumber">{requests.home.phoneNumber}</Descriptions.Item>
							<Button type="primary" onClick={() => this.handleClick(requests._id)} danger>
								Delete Request
							</Button>
						</Descriptions> */}
					</div>
				) : null}
			</div>
		);
	}
}

export default connect(null, { deleteNormalRequests })(NormalRequestList);
