import React,{Component} from 'react';
import StripeCheckout from 'react-stripe-checkout';
import {connect} from 'react-redux';
import * as actions from '../actions';

class Payment extends Component{
  render(){
    return (
      <StripeCheckout
        name="Tonghu"
        description="Payment for Pizza"
        amount={(this.props.amount)*100}
        token={token=> this.props.handleToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
       <button className="btn">
         Add CREDITS
       </button>
      </StripeCheckout>
    );
  }
}
export default connect(null,actions)(Payment);