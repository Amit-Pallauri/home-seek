import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import {getRequestedPosts} from '../redux/actions/profileActions'

const OwnerProfile = ({postsState, getRequestedPosts}) => {

    useEffect(()=>{
        getRequestedPosts()
    }, [getRequestedPosts])

    return (
        <div>
            owner profile
        </div>
    )
}

const mapStateToProps = stateStatus => {
    return {
        postsState : stateStatus.postsState
    }
}

export default connect(mapStateToProps, { getRequestedPosts }) (OwnerProfile)
