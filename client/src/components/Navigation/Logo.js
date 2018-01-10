import React from 'react';
//webpack can find my image
import webLogo from '../../assets/images/logo.png';
import '../../styleSheet/Logo.css';

const logo =(props)=>(
  <div className="Logo">
    <img src = {webLogo} alt="Pizzie"/>
  </div>
)



export default logo;