import React,{Component} from 'react';
import Aux from '../../hoc/Aux';
import Pizza from './Pizza';
import BuildControls from './BuildControls';
import Model from './Model/Model';
import OrderSummary from './OrderSummary';


const INGREDIENT_PRICES = {
  salad:0.5,
  cheese:0.4,
  meat:1.3,
  bacon:1.0
}
class PizzaBuilder extends Component{
    state={
      ingredients:{
        salad:0,
        meat:0,
        cheese:0,
        bacon:0
      },
      totalPrice:4,
      purchasable:false,
      purchasing:false
    }
  updatePurchaseState(ingredients){
    // const ingredients={
    //   ...this.state.ingredients
    // };
    //create array string
    const sum = Object.keys(ingredients).map(igKey=>{
      return ingredients[igKey];
    })
    .reduce((sum,el)=>{
      return sum+el;
    },0);
    this.setState({purchasable:sum>0});
  }
  purchaingHandler=()=>{
    this.setState({purchasing:true});
  }
  purchaingClosedHandler = ()=>{
    this.setState({purchasing:false});
  }
  purchaingContinueHandler=()=>{
    console.log("clicked");
  }
  addIngredientHandler = (type)=>{
    const oldCount = this.state.ingredients[type];
    const updateCounted = oldCount +1;
    const updateIngredients = {
      ...this.state.ingredients
    }
    updateIngredients[type] = updateCounted;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({totalPrice:newPrice,ingredients:updateIngredients});
    this.updatePurchaseState(updateIngredients);
  }

  reduceIngredientHandler = (type)=>{
    const oldCount = this.state.ingredients[type];
    const updateCounted = oldCount -1;
    if(updateCounted<0){
      return;
    }
    const updateIngredients = {
      ...this.state.ingredients
    }
    updateIngredients[type] = updateCounted;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceAddition;
    this.setState({totalPrice:newPrice,ingredients:updateIngredients});
    this.updatePurchaseState(updateIngredients);
  }
  //}
  render(){
    //copy ingredient in an immutable way
    const disabledInfo = {
      ...this.state.ingredients
    }
    for(let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key]<=0//true or false;
    }
    return(
      <Aux>
        <Model show = {this.state.purchasing} 
          modelClosed = {this.purchaingClosedHandler}>
          <OrderSummary 
          ingredients = {this.state.ingredients} 
          price={this.state.totalPrice}
          modelClosed = {this.purchaingClosedHandler}
          modelContinue = {this.purchaingContinueHandler}/>
        </Model>
        <Pizza ingredients = {this.state.ingredients}/>
        <BuildControls
          ingredientAdd = {this.addIngredientHandler}
          ingredientReduce = {this.reduceIngredientHandler}
          disabled = {disabledInfo}
          price = {this.state.totalPrice}
          ordered = {this.purchaingHandler}
          purchasable = {this.state.purchasable}/>
      </Aux>
    );
  }
}

export default PizzaBuilder;