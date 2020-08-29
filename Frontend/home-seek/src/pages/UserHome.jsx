import React, { Component } from 'react';
import { getMyHome } from '../redux/actions/userActions';
import { Descriptions, message, Button } from 'antd';
import { createPayment, verifyDepositPayments, verifyRentPayments } from '../redux/actions/paymentActions';
import '../styles/loading.css';
import { connect } from 'react-redux';

class UserHome extends Component {
	state = {
		book: false
	};
	componentDidMount() {
		this.props.getMyHome();
	}

	handleDepositBook = (e) => {
		e.preventDefault();
		this.setState({ book: true });
		const rent = this.props.myHome.data.home.details.rent;
		const deposit = this.props.myHome.data.home.details.deposit;
		const payment = {
			amountInPaise: (rent * 2)* 100,
			currency: 'INR'
		};
		this.props.createPayment(payment);
	};

	handleRentBook = (e) => {
		e.preventDefault();
		this.setState({ book: true });
		const rent = this.props.myHome.data.home.details.rent;
		const payment = {
			amountInPaise: rent * 100,
			currency: 'INR'
		};
		this.props.createPayment(payment);
	};

	handleDepositPayment = (e) => {
		e.preventDefault();
		const rent = this.props.myHome.data.home.details.rent;
		const deposit = this.props.myHome.data.home.details.deposit;
		const checkoutObject = {
			key: 'rzp_test_ZwkXJNBqm8UDM9',
			amount: rent * 2 * 100,
			currency: 'INR',
			name: 'Tejas',
			order_id: this.props.order.orderId,
			handler: ({ razorpay_order_id, razorpay_payment_id, razorpay_signature }) => {
				const details = {
					razorpay_order_id,
					razorpay_payment_id,
					razorpay_signature,
					amount: rent * 2 * 100,
					currency: 'INR',
					DepositPaidDate: new Date()
				};
				this.props.verifyDepositPayments(details);
			}
		};
		const razorpay = new window.Razorpay(checkoutObject);
		razorpay.open();
		this.setState({ book: false });
	};

	handleMonthlyPayment = (e) => {
		e.preventDefault();
		const rent = this.props.myHome.data.home.details.rent;
		const checkoutObject = {
			key: 'rzp_test_ZwkXJNBqm8UDM9',
			amount: rent * 100,
			currency: 'INR',
			name: 'Tejas',
			order_id: this.props.order.orderId,
			handler: ({ razorpay_order_id, razorpay_payment_id, razorpay_signature }) => {
				const details = {
					razorpay_order_id,
					razorpay_payment_id,
					razorpay_signature,
					amount: rent * 100,
					currency: 'INR',
					RentPaidDate: new Date()
				};
				this.props.verifyRentPayments(details);
			}
		};
		const razorpay = new window.Razorpay(checkoutObject);
		razorpay.open();
		this.setState({ book: false });
	};

	render() {
		return this.props.myHome ? this.props.myHome.data && this.props.myHome.data.home ? (
			<div>
				<div className="myHome-container">
					<Descriptions title="My Home Info">
						<Descriptions.Item label="Owner Name">{this.props.myHome.data.home.name}</Descriptions.Item>
						<Descriptions.Item label="society Name">
							{this.props.myHome.data.home.societyName}
						</Descriptions.Item>
						<Descriptions.Item label="Phone No.">
							{this.props.myHome.data.home.phoneNumber}
						</Descriptions.Item>
						<Descriptions.Item label="Location">
							{this.props.myHome.data.home.location.formattedAddress}
						</Descriptions.Item>
						<Descriptions.Item label="Rent">
							{this.props.myHome.data.home.details.rent}
						</Descriptions.Item>
					</Descriptions>
				</div>
				<div className="myHomeRent-container">
					<Descriptions title="Deposit Info">
						<Descriptions.Item label="One time payment paid ">
							{this.props.myHome.data.rentPaid.tokenAmmountPaid.value}
						</Descriptions.Item>
						<Descriptions.Item label="Paid Date ">
							{this.props.myHome.data.rentPaid.tokenAmmountPaid.onDate}
						</Descriptions.Item>
						{this.props.myHome.data.rentPaid.depositMoney ? (
							<>
								<Descriptions.Item label="Advance Deposit ">
									{this.props.myHome.data.rentPaid.depositMoney.value}
								</Descriptions.Item>
								<Descriptions.Item label="Paid Date ">
									{this.props.myHome.data.rentPaid.depositMoney.onDate}
								</Descriptions.Item>
							</>
						) : null}
					</Descriptions>
				</div>
				<div className="monthly-payment-container">
					<Descriptions title="Monthly Payment Info : ">
						{this.props.myHome.data.rentPaid.monthlyPayment.length !== 0 ? (
							this.props.myHome.data.rentPaid.monthlyPayment.map((el) => (
								<>
									<Descriptions.Item label="monthly payment">{el.value}</Descriptions.Item>
									<Descriptions.Item label="Date">{el.onDate}</Descriptions.Item>
								</>
							))
						) : (
							<Descriptions.Item>
								<b>
									<span style={{ color: 'green' }}>We will let you know once your month ends</span>
								</b>
							</Descriptions.Item>
						)}
					</Descriptions>
					{// this.state.book
					// ?
					this.props.myHome.data.rentPaid.depositMoney ? (
						<>
							{this.state.book ? (
								<Button onClick={this.handleMonthlyPayment} type="primary">
									pay your rent
								</Button>
							) : (
								<Button onClick={this.handleRentBook}>Payment status</Button>
							)}
						</>
					) : (
						<>
							{this.state.book ? (
								<Button onClick={this.handleDepositPayment} type="primary">
									Deposit your security money
								</Button>
							) : (
								<Button onClick={this.handleDepositBook}>Payment status</Button>
							)}
						</>
					)
					//:
					}
				</div>
			</div>
		) : (
			message.warning('you havent picked your home')
		) : (
			<div className="container">
				<div className="box" />
			</div>
		);
	}
}

const mapStateToProps = (storeState) => {
	return {
		myHome: storeState.userState.myHome,
		order: storeState.paymentState.order,
		successPayment: storeState.paymentState.successPayment
	};
};
export default connect(mapStateToProps, { getMyHome, createPayment, verifyDepositPayments, verifyRentPayments })(
	UserHome
);
