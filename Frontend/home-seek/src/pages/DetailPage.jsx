import React, { Component } from 'react';
import {createPayment,verifyPayments} from '../redux/actions/paymentActions';
import {connect} from 'react-redux';
class DetailPage extends Component {

    handleBook = () => {
        const payment = {
            amountInPaise: 20000 * 100,
            currency : "INR"
        }
        this.props.createPayment(payment)
    }

    handlePayment = (e) => {
        const checkoutObject = {
            key: "rzp_test_ZwkXJNBqm8UDM9",
            amount: 20000 * 100,
            currency : "INR",
            name: "Tejas",
            order_id: this.props.order.orderId,
            handler: ({razorpay_order_id,razorpay_payment_id,razorpay_signature}) => {
                const details = {
                    razorpay_order_id,
                    razorpay_payment_id,
                    razorpay_signature,
                    amount: 20000 * 100,
                    currency: "INR"
                }
                this.props.verifyPayments(details)
            }
        }
        const razorpay = new window.Razorpay(checkoutObject);
        razorpay.open()
        e.preventDefault()
    }
    render() {
        return (
            <div>
                <button onClick={this.handleBook}>Book Now</button>
                <button onClick={this.handlePayment}>pay the rent</button>
            </div>
        )
    }
}

const mapStateToProps = storeState => {
    return {
        order: storeState.paymentState.order
    }
}

export default connect(mapStateToProps, {createPayment,verifyPayments})(DetailPage);
