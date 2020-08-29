import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Dropdown, Menu } from 'antd'
import { historyOfUser } from '../store/ownerReducer'

class UserStayHistory extends Component {
    
    componentDidMount(){
        this.props.historyOfUser()
    }

    handleClick = userId => {
        // this.props.findUserWithdetails
    }

    render() {
        const UserMenu = (
            <Menu style={{ overflow : 'auto', height : '300px'}}>
                {
                    this.props.verifiedUser 
                        ?
                            this.props.verifiedUser.map( user =>{
                                <Button onClick={()=>this.handleClick(user._id)} key={user._id}>{user.home.societyName}</Button>
                            }) 
                        : null
                }
                <Menu.Item>
                    <Button/>           
                </Menu.Item>
            </Menu>        
        )
        
        return (
            <div>
                <Dropdown overlay={UserMenu} placement="bottomLeft">
					Verified Users
				</Dropdown>
            </div>
        )
    }
}

const mapStateToProps = storeState => {
    return {
        verifiedUser : storeState.features.ownerHomes.historyOfUser
    }
}

export default connect(mapStateToProps, { historyOfUser }) (UserStayHistory)