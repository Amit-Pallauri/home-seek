import React, {Component}  from 'react'
import { connect } from 'react-redux'
import {getRequestedPosts} from '../redux/actions/requestsActions'
import { Descriptions, Button, Drawer } from 'antd';
import '../styles/request.css'
import { particularHome } from '../redux/actions/listingActions';
import '../styles/loading.css'
class OwnerProfile extends Component{
    state = {
        visible : false
    }

    componentDidMount(){
        this.props.getRequestedPosts()
    }

    showDrawer = (homeId) => {
        this.setState({visible : true});
        this.props.particularHome(homeId)
      };

    onClose = () => {
        this.setState({visible : false});
    };

    render(){
        return (
            this.props.posts.posts.length === 0
            ? 
                    <div className="container">
                        <div className="box"></div>
                    </div>
            : 
                this.props.posts.posts.map(el =>

                    <div key={el._id} style = {{ display : 'flex', justifyContent : "center", alignItems : 'center'}} >
                        <Descriptions className='request-description' title={el.societyName}>
                            <Descriptions.Item label="Address">
                                {el.location.formattedAddress}
                            </Descriptions.Item>
                            <Descriptions.Item label="Telephone">{el.phoneNumber}</Descriptions.Item>
                            <Descriptions.Item label="created on">{el.createdAt}</Descriptions.Item>
                            <Descriptions.Item label="vacant">{el.vacant === true ? 'yes' : 'no'}</Descriptions.Item>
                            <Descriptions.Item label="verified">{el.verified === true ? 'yes' : 'no'}</Descriptions.Item>
                        </Descriptions>
                            {/* <button onClick={() => this.showDrawer(el._id)}>
                                Details
                            </button> */}
                    </div>
                )
        )    
    }
}

const mapStateToProps = stateStatus => {
    return {
        posts : stateStatus.postsState,
        homeDetails : stateStatus.listingState.particularHome
    }
}

export default connect(mapStateToProps, { getRequestedPosts, particularHome }) (OwnerProfile)
