import React from 'react';
import './Model.css';
import Aux from '../../../hoc/Aux';
import BackDrop from "../backdrop";

const model = (props)=>{
  return(
    <Aux>
      <BackDrop show = {props.show} clicked = {props.modelClosed}/>
      <div  className="Modal"
        style = {{
        transform: props.show ? 'translateY(0)':'translateY(-100vh)',
        opacity: props.show?'1':'0'
      }}
     >
      {props.children}
      </div>
    </Aux>
  );

}
export default model;