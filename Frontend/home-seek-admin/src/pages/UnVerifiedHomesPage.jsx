import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import  {verifyHomes} from '../store/ownerReducer';
import UnVerfiedHomeList from '../components/UnVerfiedHomeList';
//import { Spin } from 'antd';
class UnVerifiedHomesPage extends Component {
    componentDidMount() {
        this.props.verifyHomes()
    }
    render() {
        if(!this.props.admin) return <Redirect to="/" />
        return (
            this.props.homes ?
            <UnVerfiedHomeList homes={this.props.homes.listings} />
             : null
        )
    }
}


const mapStateToProps = (storeState) => {
    return {
        admin: storeState.features.admin.admin,
        homes : storeState.features.ownerHomes.homes
    }
}

export default connect(mapStateToProps, {verifyHomes})(UnVerifiedHomesPage)
