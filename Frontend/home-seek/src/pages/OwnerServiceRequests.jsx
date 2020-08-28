import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Input, Button, Form, Popover, Menu, Dropdown } from 'antd';
import { getAllVerifiedPosts, createOwnerRequests } from '../redux/actions/listingActions'

const { TextArea } = Input;

class OwnerServiceRequests extends Component {
    state = {
        request : '',
        description : '',
        homeId : ''
    }

    componentDidMount(){
        this.props.getAllVerifiedPosts()
    }

    onChange = e => {
        this.setState({[e.target.name] : e.target.value})
      };

    handleClick = homeId => {
        this.setState({ homeId })
    }

    handleSubmit = e => {
        e.preventDefault()
        this.props.createOwnerRequests(this.state)
        this.setState({ request : '', description : ''})
    }

    render() {
        const homeMenu = (
			<Menu style={{ overflow : 'auto', height : '300px'}}>
				{
					this.props.listings.allVerifiedPosts 
					? 
					this.props.listings.allVerifiedPosts.verifiedListings.map(el =>
						<Menu.Item>
							<Button onClick={() => this.handleClick(el._id)}>{el.societyName}</Button>
						</Menu.Item>
					)
					: null
				}
				
			</Menu>
		)
        
        const content = (
            <div>
              <p>e.g., delete this listing.</p>
            </div>
        );
        return (
            <div style={{
                height : '500px',
                position : 'relative',
                left: '35%',
                top: '30%'
            }}>
                <Form style={{
                    width : '260px' ,
                    height : '220px' , 
                    display : "flex",
                    flexDirection : 'column',
                    justifyContent : "space-around"
                }} >
                    {this.state.homeId ? <p style={{color:'red'}}>id : {this.state.homeId}</p> : null}
                    <Dropdown overlay={homeMenu} placement="bottomLeft">
						<Button>Verified Homes</Button>
					</Dropdown>
                    <Popover content={content}>
                            <Input style={{padding : '10px'}} name='request' value={this.state.request} placeholder="what kind of service you need" onChange={this.onChange} />
                    </Popover>
                        <TextArea style={{height : '100px'}} name='description' value={this.state.description} placeholder="describe the problem in brief" onChange={this.onChange} />
                        <Button onClick ={this.handleSubmit} type='primary'>submit</Button>
                </Form>
            </div>
        )
    }
}

const mapStateToProps = storeState => {
    return {
        listings : storeState.listingState
    }
}

export default connect(mapStateToProps, {createOwnerRequests, getAllVerifiedPosts})(OwnerServiceRequests)