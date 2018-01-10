import React from 'react';
import '../../styleSheet/Pizza.css';
import PizzaIngredient from './PizzaIngredient';

const pizza =(props)=>{

  let transformIngredient = Object.keys(props.ingredients).map(igKey=>{
          return [...Array(props.ingredients[igKey])].map((_,i)=>{
            return <PizzaIngredient key={igKey +i} type={igKey}/>;
          });
       })//transform an array to something else
        .reduce((arr,el)=>{
          return arr.concat(el)
        },[]);
  if(transformIngredient.length===0){
    transformIngredient= <p>Please start adding ingredients</p>;
  }
  return(
    <div className = "Pizza">
      <PizzaIngredient type="bread-top"/>
      {transformIngredient}
      <PizzaIngredient type="bread-bottom"/>
    </div>
  );
};

export default pizza;