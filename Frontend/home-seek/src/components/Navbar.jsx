import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logoutUser } from '../redux/actions/userActions'

const Navbar = ({logoutUser}) => {
    const handleClick = (e) => {
        e.preventDefault()
        logoutUser()
    }
    return (
        <div className='navbar'>
            <Link style={{textDecoration: 'none'}} to='/'>
                    <img className='brand' alt='logo' src="https://img.icons8.com/wired/50/000000/home.png"/>
            </Link>
            <div className='user-regd'>
                <Link to='/signUp'><button>sign Up</button></Link>
                <Link to='/signIn'><button>sign In</button></Link>
                <button onClick ={handleClick}>sign Out</button>
            </div>
        </div>
    )
}

export default connect(null, { logoutUser })(Navbar)
