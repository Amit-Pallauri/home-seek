import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {deletePosts} from '../store/ownerReducer';
import { List, Avatar, Button } from 'antd';

class UnVerfiedHomeList extends Component {

    handleClick = (postId) => {
        this.props.deletePosts(postId)
    }
	render() {
        //console.log(this.props.homes)
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
					dataSource={this.props.homes}
					renderItem={(item) => (
						<List.Item key={item._id} actions={[<Link to={`/ownerhouses/create/${item._id}`}><Button type="primary" >Create Details</Button></Link>, <Button type="primary" onClick={() => this.handleClick(item._id)} danger>Delete Post</Button>]}>
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
		);
	}
}

export default connect(null, {deletePosts})(UnVerfiedHomeList);
