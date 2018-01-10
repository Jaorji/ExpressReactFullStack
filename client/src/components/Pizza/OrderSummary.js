import React from 'react';
import Aux from '../../hoc/Aux';
import Payment from '../Payment';
import Button from './Button';
import '../../styleSheet/Button.css';

const orderSummary = (props)=>{
  const ingredientSummary = Object.keys(props.ingredients)
        .map((igKey)=>{
          return (
            <li key = {igKey}>
              <span style={{textTransform:'capitalized'}}>{igKey}:{props.ingredients[igKey]}</span>
            </li>
        )})
  return(
    <Aux>
      <h3>Your Order</h3>
      <p> A pizza with the following ingredients.</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p><strong>Total Price:{props.price.toFixed(2)}</strong></p>
      <p>Continue to check out?</p>
      <Button btnType="Danger" clicked ={props.modelClosed}>Cancel</Button>
      <Button btnType="Success" clicked={props.modelContinue}>Continue</Button>
      <Payment amount = {props.price}/>
      </Aux>

  )
  

}

export default orderSummary;