import React from 'react';
import '../../styleSheet/BuildControl.css';

const buildControl  =(props)=>(
  <div className="BuildControl">
    <div className="Label">{props.label}</div>
    <button 
      className = "Less"
      onClick={props.reduce} 
      disabled = {props.disabled}>less</button>
    <button 
      className = "More"
      onClick={props.added}>add</button>
  </div>

);

export default buildControl;