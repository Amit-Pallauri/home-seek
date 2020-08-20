import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getNormalRequests } from '../store/userRequest';
import NormalRequestList from '../components/NormalRequestList';
class NormalRequestPage extends Component {
    componentDidMount() {
		this.props.getNormalRequests();
	}
    render() {
        //console.log(this.props.userRequests)
        if (!this.props.admin) return <Redirect to="/" />;
        return this.props.normalRequests ? <NormalRequestList requests={this.props.normalRequests.NormalRequests} /> : null;
        
    }
}

const mapStateToProps = (storeState) => {
    return {
        admin: storeState.features.admin.admin,
        homes : storeState.features.ownerHomes.homes,
        normalRequests: storeState.features.requests.normalRequests
    }
}

export default connect(mapStateToProps, {getNormalRequests})(NormalRequestPage)
