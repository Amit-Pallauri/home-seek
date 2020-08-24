import React, {Component}  from 'react'
import { connect } from 'react-redux'
import {getRequestedPosts} from '../redux/actions/requestsActions'
import { Descriptions } from 'antd';

class OwnerProfile extends Component{
    state = {

    }

    componentDidMount(){
        this.props.getRequestedPosts()
    }

    render(){
        return (
            this.props.posts.posts.length == 0
            ? 
                <h1>Loading...</h1>
            : 
                this.props.posts.posts.map(el =>
                    <div key={el._id}>
                        <Descriptions title='listing requests'>
                            <Descriptions.Item label="Society Name">{el.societyName}</Descriptions.Item>
                            <Descriptions.Item label="Address">
                                {el.location.formattedAddress}
                            </Descriptions.Item>
                            <Descriptions.Item label="Telephone">{el.phoneNumber}</Descriptions.Item>
                            <Descriptions.Item label="created on">{el.createdAt}</Descriptions.Item>
                            <Descriptions.Item label="vacant">{el.vacant == true ? 'yes' : 'no'}</Descriptions.Item>
                            <Descriptions.Item label="verified">{el.verified == true ? 'yes' : 'no'}</Descriptions.Item>
                        </Descriptions>
                    </div>
                )
        )    
    }
}

const mapStateToProps = stateStatus => {
    return {
        posts : stateStatus.postsState
    }
}

export default connect(mapStateToProps, { getRequestedPosts }) (OwnerProfile)
