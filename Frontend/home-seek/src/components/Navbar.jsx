import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logoutUser } from '../redux/actions/userActions'

const Navbar = ({logoutUser, user, history}) => {
    const handleClick = (e) => {
        e.preventDefault()
        logoutUser()
        return !user ? history.push('/signIn') : null
    }
    return (
        <div className='navbar'>
            <Link style={{textDecoration: 'none'}} to='/'>
                    <img className='brand' alt='logo' src="https://img.icons8.com/wired/50/000000/home.png"/>
            </Link>
            <div className='user-regd'>
                {
                    !user || !user.token
                        ? 
                            <>
                                <Link to='/signUp'><button>sign Up</button></Link>
                                <Link to='/signIn'><button>sign In</button></Link>
                            </>
                        :   
                            <>
                                <button onClick ={handleClick}>sign Out</button>
                                <Link to='/chat'><button>Chat</button></Link>
                                <Link to='/owner/listing/create'><button>CreatePost</button></Link>
                            </>
                }
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        user : state.userState.user
    }
}

export default connect(mapStateToProps, { logoutUser })(Navbar)
