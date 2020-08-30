import React, { Component } from 'react';
import { createPayment, verifytokenPayments } from '../redux/actions/paymentActions';
import { createOTP, verifyOTP, particularHome } from '../redux/actions/listingActions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {addNormalRequest } from '../redux/actions/userActions';
import { Carousel, Divider, Typography, Button, Modal, DatePicker, Form, Input, Spin } from 'antd';

const { Title } = Typography;
class DetailPage extends Component {
	state = {
         visible: false,
         visible1: false,
         phoneNumber: '',
         confirmPhoneNumber: '',
		 date: '',
		 checkInDate: '',
		 code: ''
        };

	showModal = () => {
		this.setState({
			visible1: true
		});
	};

	handleOk = (e) => {
		this.setState({
			visible1: false
		});
	};

	handleCancel = (e) => {
		this.setState({
			visible1: false
		});
	};

	showDateModel = () => {
		this.setState({
			visible: true
		});
	};

	handleOk1 = (e) => {
		const homeId = this.props.match.params.homeId;
		this.setState({
			visible: false
		});
		const data = {
			requests : `I want to visit this house on ${this.state.date}`,
			homeId: homeId
		}
        this.props.addNormalRequest(data)
	};

	handleCancel1 = (e) => {
		this.setState({
			visible: false
		});
	};

	onChange = (date, dateString) =>  {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); 
        let yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;
        if(today <= dateString) {
            this.setState({date : dateString })
        } else {
			this.setState({date : '' })
            alert("pick correct date")
        }
	}
	
	onChange1 = (date, dateString) =>  {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); 
        let yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;
        if(today <= dateString) {
            this.setState({checkInDate : dateString })
        } else {
			this.setState({checkInDate : '' })
            alert("pick correct date")
        }
    }
	

	handleChange3 = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

    handleGetOTP = () => {
		if(this.state.phoneNumber === this.state.confirmPhoneNumber) {
			const data = {
				phoneNumber: `91${this.state.phoneNumber}`
			};
			this.props.createOTP(data);
		}
		else {
			alert("PhoneNumber must be Same")
		}
	};

	handleSubmit1 = () => {
		const data = {
			phoneNumber: `91${this.state.phoneNumber}`,
			code: this.state.code
		};
		this.props.verifyOTP(data);
	};

	componentDidMount() {
		const homeId = this.props.match.params.homeId;
		this.props.particularHome(homeId);
	}

	handleBook = () => {
		const payment = {
			amountInPaise: 3000 * 100,
			currency: 'INR'
		};
		this.props.createPayment(payment);
	};

	handlePayment = (e) => {
		const homeId = this.props.match.params.homeId;
		const checkoutObject = {
			key: 'rzp_test_ZwkXJNBqm8UDM9',
			amount: 3000 * 100,
			currency: 'INR',
			name: 'Tejas',
			order_id: this.props.order.orderId,
			handler: ({ razorpay_order_id, razorpay_payment_id, razorpay_signature }) => {
				const details = {
					razorpay_order_id,
					razorpay_payment_id,
					razorpay_signature,
					amount: 3000 * 100,
					currency: 'INR',
					postId: homeId,
					checkInDate: this.state.checkInDate
				};
				this.props.verifytokenPayments(details);
			}
		};
		const razorpay = new window.Razorpay(checkoutObject);
		razorpay.open();
		e.preventDefault();
	};
	render() {
		return this.props.home ? (
			<div>
				<Carousel autoplay>
					{this.props.home.particuarPost.details.images.map((image) => (
						<div key={this.props.home.particuarPost._id}>
							<img src={`${image}`} alt="house" style={{ width: '100vw', height: 600 }} />
						</div>
					))}
				</Carousel>
				<Divider />
				<div style={{ display: 'flex', marginLeft: 700 }}>
					<span>Rent From</span>
					<span style={{ marginLeft: 70 }}>Security Deposit</span>
				</div>
				<div style={{ display: 'flex', marginLeft: 700 }}>
					<Title level={3}>{`₹${this.props.home.particuarPost.details.rent}`}</Title>
					<Title level={3} style={{ marginLeft: 20, marginTop: -1 }}>{`Just ${this.props.home.particuarPost
						.details.deposit} months rent`}</Title>
				</div>
				<Divider />
				<span>{this.props.home.particuarPost.name}</span>
				<Title level={2}>{this.props.home.particuarPost.details.projectName}</Title>
				<span>{`Only For ${this.props.home.particuarPost.details.type}`}</span>
				<br />
				<br />
				<Divider />
				<Title level={2}>House Features</Title>
				<br />
				<Title level={3}>Furnishing</Title>
				<div style={{ display: 'flex' }}>
					{this.props.home.particuarPost.details.furnishing.beds ? (
						<div style={{ marginLeft: 20 }}>
							<img src="https://img.icons8.com/bubbles/100/000000/bed.png" alt="bedRooms" />
							<span>{`${this.props.home.particuarPost.details.bedrooms} BedRooms `}</span>
							<span>{`| ${this.props.home.particuarPost.details.furnishing.noOfBeds} Beds`}</span>
						</div>
					) : null}
					{this.props.home.particuarPost.details.furnishing.dish ? (
						<div style={{ marginLeft: 50 }}>
							<img src="https://img.icons8.com/plasticine/100/000000/gps-searching.png" alt="dish" />
							<span>present</span>
						</div>
					) : null}
					{this.props.home.particuarPost.details.furnishing.fridge ? (
						<div style={{ marginLeft: 50 }}>
							<img src="https://img.icons8.com/color/96/000000/fridge.png" alt="fridge" />
							<span>present</span>
						</div>
					) : null}
					{this.props.home.particuarPost.details.furnishing.oven ? (
						<div style={{ marginLeft: 50 }}>
							<img src="https://img.icons8.com/color/96/000000/toaster-oven.png" alt="oven" />
							<span>present</span>
						</div>
					) : null}
					{this.props.home.particuarPost.details.furnishing.sofa ? (
						<div style={{ marginLeft: 50 }}>
							<img src="https://img.icons8.com/color/96/000000/sofa.png" alt="sofa" />
							<span>present</span>
						</div>
					) : null}
					{this.props.home.particuarPost.details.furnishing.tv ? (
						<div style={{ marginLeft: 50 }}>
							<img src="https://img.icons8.com/plasticine/100/000000/retro-tv.png" alt="tv" />
							<span>present</span>
						</div>
					) : null}
					{this.props.home.particuarPost.details.furnishing.wifi ? (
						<div style={{ marginLeft: 50 }}>
							<img src="https://img.icons8.com/fluent/96/000000/wifi.png" alt="wifi" />
							<span>present</span>
						</div>
					) : null}
					<div style={{ marginLeft: 50 }}>
						<img src="https://img.icons8.com/color/96/000000/bath.png" alt="bath" />
						<span>{`${this.props.home.particuarPost.details.bathRooms} BathRooms `}</span>
					</div>
				</div>
				<Divider />
				<Title level={3}>Extra</Title>
				<h1>Car Parking: {this.props.home.particuarPost.details.carParking}</h1>
				<h1>SuperBuiltUpArea: {this.props.home.particuarPost.details.superBuiltUpArea}</h1>
				<h1>Carpet Area: {this.props.home.particuarPost.details.carpetArea}</h1>
				<h1>Total Floors: {this.props.home.particuarPost.details.totalFloors}</h1>
				<h1>House Facing: {this.props.home.particuarPost.details.facing}</h1>
				<h1>HouseNumber: {this.props.home.particuarPost.details.floorNumber}</h1>
				<h1>Location: {this.props.home.particuarPost.details.location.formattedAddress}</h1>
				<Divider />
				<Title level={3}>Rent Details</Title>
				<h1>Monthly Rent: {`₹${this.props.home.particuarPost.details.rent}`}</h1>
				<br />
				<h1>Security Deposit: {`Only ${this.props.home.particuarPost.details.deposit}`} </h1>
				<span>Fully refundable if vacated in original condition</span>
				<br />
				<br />
				<h1>One Time HomeSeek Fees: ₹{3000}</h1>
				<span>
					HomeSeek charges a one time accommodation convenience fee for all bookings which is calculated as a
					percentage of one month's rent
				</span>
				<br />
				<Button type="primary" onClick={this.showModal}>
					what does it cover?
				</Button>
				<Modal
					title="Basic Modal"
					visible={this.state.visible1}
					onOk={this.handleOk}
					onCancel={this.handleCancel}
				>
					<h1>One Time HomeSeek Fees</h1>
					<p>Finding & listing houses</p>
					<p>Arranging assisted house visits</p>
					<p>Agreements & KYC verification</p>
					<p>Cleaning your house before move-in</p>
					<p>Assisting you in move-in</p>
					<p>24X7 safety and security service</p>
					<p>Our platform fees</p>
				</Modal>
				<br />
				<br />
				<h1>Rent Excludes: Food, Utilities and Other Miscellaneous living expenses</h1>
				<Divider />
				<Title level={4}>For this house..</Title>
				<h1>HomeSeek is responsible for</h1>
				<span>Showing this house</span>
				<br />
				<span>Booking confirmation with owner</span>
				<br />
				<span>Creating rental agreement with owner</span>
				<br />
				<span>Post move-in services and maintenance at nominal prices</span>
				<br />
				<span>Returning deposits at the time of move-out</span>
				<br />
				<Divider />
				<Title level={4}>Terms of Stay</Title>
				<span>
					The dos and dont's of staying in a HomeSeek home (we will update when the webiste goes live)
				</span>
				<Divider />
				<div style={{ display: 'flex' }}>
					<Button type="primary" onClick={this.showDateModel} style={{ marginLeft: 700 }} size="large" >
						Schedule Visit
					</Button>
					<Modal
						title="Basic Modal"
						visible={this.state.visible}
						onOk={this.handleOk1}
						onCancel={this.handleCancel1}
						okButtonProps={(this.props.user.data.isVerifiedPhoneNumber === true ?  { disabled: false } : { disabled: true }) && (this.state.date === '' ? {disabled: true} : {disabled: false})}
					>
						<h1>When are you planning to visit?</h1>
						<span>Open from 11am - 7pm</span>
						<br /><br/>
						<DatePicker onChange={this.onChange} />
                        <br/><br/>
						{this.props.user.data.isVerifiedPhoneNumber === false ? (
							<Form className="otp-form">
								<Form.Item label="Phone no">
									<Input
										type="tel"
										name="phoneNumber"
										onChange={this.handleChange3}
										value={this.state.phoneNumber}
										placeholder="Enter phoneNumber"
										addonBefore="+91"
										required
									/>
								</Form.Item>
								<Form.Item label="Confirm">
									<Input
										type="tel"
										name="confirmPhoneNumber"
										onChange={this.handleChange3}
										value={this.state.confirmPhoneNumber}
										placeholder="Enter confirmPhoneNumber"
										addonBefore="+91"
										required
									/>
								</Form.Item>
								<Form.Item>
									<Button onClick={this.handleGetOTP} type="submit">
										send otp
									</Button>
								</Form.Item>
								<div >
									<Form.Item>
										<Input
											type="number"
											name="code"
											placeholder="Enter OTP"
											onChange={this.handleChange3}
											value={this.state.code}
										/>
									</Form.Item>
									<Form.Item>
										<Button style={{ width: '200px' }} onClick={this.handleSubmit1} type="submit">
											submit otp
										</Button>
									</Form.Item>
								</div>
							</Form>
						) : null}
					</Modal>
					<Button onClick={this.handleBook} type="primary" style={{ marginLeft: 20 }} size="large" >
						Book Now
					</Button>
					<br />
					<br />
				</div>
				{this.props.order ? (
					<div style={{ marginLeft: 700 }}>
						<h1>Date You want to Move</h1>
						<DatePicker onChange={this.onChange1} />
						<br />
						<br />
						{this.props.user.data.isVerifiedPhoneNumber === true ? (
							null
						) : (
							<Form className="otp-form">
							<Form.Item label="Phone no">
								<Input
									type="tel"
									name="phoneNumber"
									onChange={this.handleChange}
									value={this.state.phoneNumber}
									placeholder="Enter phoneNumber"
									addonBefore="+91"
									required
								/>
							</Form.Item>
							<Form.Item label="Confirm">
								<Input
									type="tel"
									name="confirmPhoneNumber"
									onChange={this.handleChange3}
									value={this.state.confirmPhoneNumber}
									placeholder="Enter confirmPhoneNumber"
									addonBefore="+91"
									required
								/>
							</Form.Item>
							<Form.Item>
								<Button onClick={this.handleGetOTP} type="submit">
									send otp
								</Button>
							</Form.Item>
							<div style={{ display: 'flex', justifyContent: 'space-around' }}>
								<Form.Item>
									<Input
										type="number"
										name="code"
										placeholder="Enter OTP"
										onChange={this.handleChange3}
										value={this.state.code}
									/>
								</Form.Item>
								<Form.Item>
									<Button style={{ width: '200px' }} onClick={this.handleSubmit1} type="submit">
										submit otp
									</Button>
								</Form.Item>
							</div>
						</Form>
						)}
						{this.state.checkInDate === '' ? null :
							<Button type="primary" onClick={this.handlePayment} size="large" >{`pay ₹3000 the token amount`}</Button>
						}
					</div>
				) : null}
				{this.props.successPayment ? <Redirect to="/homes" /> : null}
			</div>
		) : (
            <Spin size="large" style={{marginLeft : "50vw", marginTop: "50vh"}}/>
		);
	}
}

const mapStateToProps = (storeState) => {
	return {
		user: storeState.userState.user,
		order: storeState.paymentState.order,
		home: storeState.listingState.particularHome,
		successPayment: storeState.paymentState.successPayment
	};
};

export default connect(mapStateToProps, { createPayment, verifytokenPayments, particularHome,createOTP, verifyOTP, addNormalRequest })(DetailPage);
