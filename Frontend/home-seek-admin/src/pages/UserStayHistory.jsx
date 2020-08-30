import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Dropdown, Menu, Button, Descriptions } from 'antd'
import { historyOfUser, findUserWithHome  } from '../store/ownerReducer'
import '../styles/loading.css'

class UserStayHistory extends Component {
    
    componentDidMount(){
        this.props.historyOfUser()
    }

    handleClick = userId => {
        console.log(userId)
        this.props.findUserWithHome(userId)
    }

    render() {
        const UserMenu = (
            <Menu style={{ overflow : 'auto', height : '200px'}}>
                    {
                        this.props.verifiedUser
                            ?
                                this.props.verifiedUser.foundUsers.map( user =>
                                    <Menu.Item>
                                        <Button onClick={()=>this.handleClick(user._id)} key={user._id}>{user.home.societyName}</Button>
                                    </Menu.Item>
                                ) 
                            : null
                    }
            </Menu>        
        )
        
        return (
            <>
                <div>
                    <Dropdown overlay={UserMenu}>
                        <Button>verified homes</Button>
                    </Dropdown>
                </div>
                <div>
                    {
                        this.props.findUserWithHomeData 
                            ?   
                                this.props.findUserWithHomeData.foundUser
                                    ?
                                    <div>
                                        <Descriptions style={{ borderBottom : '1px solid lightgrey', marginTop: '20px' }} title="User Info" layout="horizontal">
                                            <Descriptions.Item label="tenent Name">{this.props.findUserWithHomeData.foundUser.firstName + " "  + this.props.findUserWithHomeData.foundUser.lastName}</Descriptions.Item>
                                            <Descriptions.Item label="Telephone">{this.props.findUserWithHomeData.foundUser.phoneNumber}</Descriptions.Item>
                                            <Descriptions.Item label="email">{this.props.findUserWithHomeData.foundUser.email}</Descriptions.Item>
                                            <Descriptions.Item label="Address" >
                                                {this.props.findUserWithHomeData.foundUser.Address.city + ", " + this.props.findUserWithHomeData.foundUser.Address.district + ", " + this.props.findUserWithHomeData.foundUser.Address.state}
                                            </Descriptions.Item>
                                        </Descriptions>
                                    
                                        <Descriptions style={{ borderBottom : '1px solid lightgrey'}} title="Home Info" layout="horizontal">
                                            <Descriptions.Item label="Owner">{this.props.findUserWithHomeData.foundUser.home.name}</Descriptions.Item>
                                            <Descriptions.Item label="Telephone">{this.props.findUserWithHomeData.foundUser.home.phoneNumber}</Descriptions.Item>
                                            <Descriptions.Item label="society">{this.props.findUserWithHomeData.foundUser.home.societyName}</Descriptions.Item>
                                            <Descriptions.Item label="Address" >
                                            {this.props.findUserWithHomeData.foundUser.home.location.formattedAddress}
                                            </Descriptions.Item>
                                        </Descriptions>   

                                        <Descriptions style={{ borderBottom : '1px solid lightgrey'}} title="Payment Info" layout="horizontal">
                                            <Descriptions.Item label="Token Ammount Paid">{this.props.findUserWithHomeData.foundUser.rentPaid.tokenAmmountPaid.value}</Descriptions.Item>
                                            <Descriptions.Item label="checkIn date">{this.props.findUserWithHomeData.foundUser.rentPaid.tokenAmmountPaid.onDate}</Descriptions.Item>
                                            <br/>
                                            <Descriptions.Item label="Advance Deposit">{this.props.findUserWithHomeData.foundUser.rentPaid.depositMoney.value}</Descriptions.Item>
                                            <Descriptions.Item label="Date" >{this.props.findUserWithHomeData.foundUser.rentPaid.depositMoney.onDate}</Descriptions.Item>
                                            <br/>
                                        </Descriptions>  
                                        <Descriptions style={{ borderBottom : '1px solid lightgrey'}} title="Monthly payment Info" layout="horizontal">
                                            {
                                                this.props.findUserWithHomeData.foundUser.rentPaid.monthlyPayment.length !==0 
                                                    ? 
                                                        this.props.findUserWithHomeData.foundUser.rentPaid.monthlyPayment.map( month => 
                                                            <div style={{ display : 'flex', flexDirection : 'column'}} key={month._id}>
                                                                <p>Monthly Payment: {month.value}</p>
                                                                <p>Date: {month.onDate}</p>
                                                            </div>
                                                        )
                                                    : null
                                            }         
                                            </Descriptions>               
                                    </div>
                                : 
                                <div className="container">
                                    <div className="box"></div>
                                </div>

                            : null
                    }
                </div>
            </>
            
        )
    }
}

const mapStateToProps = storeState => {
    return {
        verifiedUser : storeState.features.ownerHomes.historyOfUser,
        findUserWithHomeData : storeState.features.ownerHomes.findUserWithHome
    }
}

export default connect(mapStateToProps, { historyOfUser, findUserWithHome }) (UserStayHistory)