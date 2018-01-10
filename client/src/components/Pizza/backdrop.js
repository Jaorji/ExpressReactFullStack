import React from 'react';
import '../../styleSheet/BackDrop.css';

const backDrop =(props)=>{
    console.log(props);
  return (
    props.show?<div className="Backdrop" onClick={props.clicked}></div>:null
  );

}

export default backDrop;