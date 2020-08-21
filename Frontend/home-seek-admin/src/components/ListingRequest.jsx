import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {deleteHomes} from '../store/ownerReducer';
import { List, Avatar, Button } from 'antd';


class ListingRequest extends Component {

    handleClick = (homeId) => {
        this.props.deleteHomes(homeId)
    }
    render() {
        return (
			<div>
				<List
					itemLayout="vertical"
					size="large"
					pagination={{
						onChange: (page) => {
							console.log(page);
						},
						pageSize: 3
					}}
					dataSource={this.props.listing}
					renderItem={(item) => (
						<List.Item key={item._id} actions={[<Link to={`/ownerhouses/update/${item._id}`}><Button type="primary" >Update Home</Button></Link>, <Button type="primary" onClick={() => this.handleClick(item._id)} danger>Delete Listing</Button>]}>
							<List.Item.Meta
								avatar={<Avatar size={40}>USER</Avatar>}
								title={item.name}
								description={item.location.formattedAddress}
                            />
                            <p>vacant: {String(item.vacant)}</p>
                            <p>verified: {String(item.verified)}</p>
                            <p>phone number: {item.phoneNumber}</p>
						</List.Item>
					)}
				/>
			</div>
        )
    }
}

export default connect(null, {deleteHomes})(ListingRequest);
