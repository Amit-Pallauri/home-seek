import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addProfilepic, updateProfile, updateBankDetails } from '../redux/actions/userActions'
import { Input, Form, Button, Select, Card, Avatar, Descriptions, message } from 'antd';
import '../styles/profile-page.css'
import '../styles/loading.css'
const { Option } = Select;
const { Meta } = Card;

var layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
var tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };
  
class ProfilePage extends Component {
    state = {
        image: '',
        DOB : '',
        gender : '',
        city : '',
        district : '',
        state : '',
        pincode : '',
        maritalStatus : '',
        AccountName : '',
        AccountNo : '',
        BankName : '',
        IFSC : '',
        editProfile : false,
        editBankDetails : false,
        loading : false
    }
    onGenderChange = value => {
        this.setState({gender : value})
      };

    dateChangeHandle = e=> {
        this.setState({DOB : e.target.value})
      }

    handleChange = e => {
          e.preventDefault()
          this.setState({[e.target.name] : e.target.value})
      }

    handleFileChange = e => {
        e.preventDefault()
        this.setState({image : e.target.files[0]})
    }

    handleSubmit = e => {
      e.preventDefault()
      const formData = new FormData()
      this.setState({ editProfile : false})
      //console.log(this.state.image)
      formData.append('image', this.state.image)
      this.props.addProfilepic(formData)
      this.props.updateProfile(this.state)
      message.info('profile updated');
    }

    handleMaritalStatusChange = e => {
      this.setState({maritalStatus : e.value})
    }

    onCardChange = checked => {
      this.setState({ loading: !checked });
    };

    handleEditClick = e => {
      e.preventDefault()
      this.setState({editProfile : true})
    }
    
    hanldeClickForBankDetails = e => {
      e.preventDefault()
      this.setState({ editBankDetails : true})
    }
    
    handleBankDetailsSubmit = () => {
      this.setState({editBankDetails : false})
      const {AccountNo, AccountName, BankName, IFSC } = this.state
      this.props.updateBankDetails({AccountNo, AccountName, BankName, IFSC})
      message.info('Bank details updated');
    }

    handleChangeForBankDetails = e => {
      e.preventDefault()
      this.setState({[e.target.name] : e.target.value})
    }

    render() {
      const {
        firstName,
        lastName, 
        email, 
        DOB, 
        gender, 
        phoneNumber,
        Address:{ 
          city, 
          district, 
          state, 
          pincode 
        }, maritalStatus,
        bankDetails : {
          AccountName,
          AccountNo,
          BankName,
          IFSC
        }
      } = this.props.user.user.data
      const formatedDate = new Date(DOB).toLocaleDateString()
        return (
          !this.state.loading
          ? 
            <>
            <div className='profile-container'>
              <Card style={{ width: 300, marginTop: 16 }}>
                <Meta
                  avatar={
                    this.props.user.user.data.image  
                    ? <Avatar src={this.props.user.user.data.image } />
                    : <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  }
                  title={`${firstName} ${lastName}`}
                />
                <div className='card-data-container'>
                      <Button onClick={this.handleEditClick} type="primary" htmlType="submit">
                        Edit profile
                      </Button>
                  <div className='card-data'>
                    <span className='card-data-el'><b>Gender :</b><p>{gender}</p></span>
                    <span className='card-data-el'><b>email :</b><p>{email}</p></span>
                    <span className='card-data-el'><b>Date of birth :</b><p>{formatedDate}</p></span>
                    <span className='card-data-el'><b>city :</b><p>{city}</p></span>
                    <span className='card-data-el'><b>district :</b><p>{district}</p></span>
                    <span className='card-data-el'><b>state :</b><p>{state}</p></span>
                    <span className='card-data-el'><b>pincode :</b><p>{pincode}</p></span>
                    <span className='card-data-el'><b>maritalStatus :</b><p>{maritalStatus}</p></span>
                    <span className='card-data-el'><b>phoneNumber :</b><p>{phoneNumber}</p></span>
                  </div>
                </div>
              </Card>
            { this.state.editProfile 
              ?  
                <div className='profilepage-container'>
                  <Form encType='multipart/form-data' onSubmitCapture={this.handleSubmit} className='profilepage-form' {...layout}  name="control-hooks">
                      <Form.Item
                          name="gender"
                          label="Gender"
                          rules={[
                          {
                              required: true,
                          },
                          ]}
                      >
                      <Select
                        placeholder="Select a option and change input text above"
                        onChange={this.onGenderChange}
                        allowClear
                      >
                        <Option value="male">male</Option>
                        <Option value="female">female</Option>
                        <Option value="other">other</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item label='marital status'>
                      <Select
                          labelInValue
                          defaultValue={{ value: 'select' }}
                          style={{ width: 120 }}
                          onChange={this.handleMaritalStatusChange}
                        >
                        <Option value="married">Married</Option>
                        <Option value="single">single</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item label="Date of birth">
                      <Input type='datetime-local' value={this.state.DOB} onChange={this.dateChangeHandle}/>
                    </Form.Item>
                    <Form.Item label="city">
                        <Input
                            type="text"
                            name="city"
                            value={this.state.city}
                            placeholder="Enter your city name"
                            onChange={this.handleChange}
                            required
                        /> 
                    </Form.Item>
                    <Form.Item label="District">
                        <Input 
                            type="text"
                            name="district"
                            value={this.state.district}
                            placeholder="Enter your district"
                            onChange={this.handleChange}
                            required
                        />
                    </Form.Item>
                    <Form.Item label="state">
                        <Input
                            type="text"
                            name="state"
                            value={this.state.state}
                            placeholder="Enter your State name"
                            onChange={this.handleChange}
                            required
                        /> 
                        </Form.Item>
                    <Form.Item label="pincode">
                        <Input
                            type="number"
                            name="pincode"
                            value={this.state.pincode}
                            placeholder="Enter pincode"
                            onChange={this.handleChange}
                            required
                        /> 
                    </Form.Item>

                    <Form.Item label='profile picture' >
                        <Input type="file" name="image" onChange={this.handleFileChange}/> 
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                      <Button type="submit" htmlType="submit">
                        Submit
                      </Button>
                  </Form.Item>
                </Form>
              </div>
              : null
            }
          </div>
          <div className='bank-details-container'>
            <div className='bank-details-description'>
              <Descriptions title="Bank Info">
                <Descriptions.Item label="Acc Name">{AccountName}</Descriptions.Item>
                <Descriptions.Item label="Acc No">{AccountNo}</Descriptions.Item>
                <Descriptions.Item label="Bank Name">{BankName}</Descriptions.Item>
                <Descriptions.Item label="IFSC">{IFSC}</Descriptions.Item>
                <Descriptions.Item>
                  <Button type='primary' onClick={this.hanldeClickForBankDetails}>
                    Edit details
                  </Button>
                </Descriptions.Item>
              </Descriptions>
            </div>
            {
              this.state.editBankDetails 
              ? 
                <div className='bank-edit-conatiner'>
                    <Form encType='multipart/form-data' onSubmitCapture={this.handleBankDetailsSubmit} className='profilepage-form' {...layout}  name="control-hooks">
                      <Form.Item label="Account Name">
                          <Input
                              type="text"
                              name="AccountName"
                              value={this.state.AccountName}
                              placeholder="e.g., Teja S"
                              onChange={this.handleChangeForBankDetails}
                              required
                          /> 
                      </Form.Item>
                      <Form.Item label="Acc No.">
                          <Input 
                              type="text"
                              name="AccountNo"
                              value={this.state.AccountNo}
                              placeholder="e.g., 7000436281827"
                              onChange={this.handleChangeForBankDetails}
                              required
                          />
                      </Form.Item>
                      <Form.Item label="Bank name">
                          <Input
                              type="text"
                              name="BankName"
                              value={this.state.BankName}
                              placeholder="e.g., State Bank of India"
                              onChange={this.handleChangeForBankDetails}
                              required
                          /> 
                          </Form.Item>
                      <Form.Item label="IFSC">
                          <Input
                              type="text"
                              name="IFSC"
                              value={this.state.IFSC}
                              placeholder="e.g., SBIN00998"
                              onChange={this.handleChangeForBankDetails}
                              required
                          /> 
                      </Form.Item>
                      <Form.Item {...tailLayout}>
                        <Button type="submit" htmlType="submit">
                          Submit
                        </Button>
                      </Form.Item>
                  </Form>                
                </div>
              : null    
            }
          </div>
          </>
          : 
            <div className="container">
              <div className="box" />
            </div>
        );
    }
}

const mapStateToProps = stateStatus => {
  return {
    user : stateStatus.userState
  }
}


export default connect(mapStateToProps, {addProfilepic, updateProfile, updateBankDetails})(ProfilePage)
