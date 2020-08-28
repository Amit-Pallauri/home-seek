import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
import {allHomes} from '../redux/actions/listingActions';
import HomeListItem from '../components/HomeListItem';
import '../styles/loading.css'
class HomeListPage extends Component {

    componentDidMount() {
        this.props.allHomes()
    }
    render() {
        console.log(this.props.homes)
        if(!this.props.user)  return <Redirect to="/signIn" /> 
        return this.props.homes ? 
        <HomeListItem homes={this.props.homes} />
        : 
            <div className="container">
                <div className="box"></div>
            </div>
    }
}

const mapStateToProps = (storeState) => {
	return { 
        user: storeState.userState.user,
        homes: storeState.listingState.allHomes
    };
};


export default connect(mapStateToProps, {allHomes})(HomeListPage)
