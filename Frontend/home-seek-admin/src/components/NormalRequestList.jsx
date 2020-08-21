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
									<h1>{requests.requests}</h1>
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
