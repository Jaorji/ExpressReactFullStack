import React from 'react';
import Aux from '../../hoc/Aux';
import '../../styleSheet/Layout.css';

const layout =( props )=>(
  <Aux>
    <main className = "Content">
      {props.children}
    </main>
  </Aux>
  
);

export default layout;