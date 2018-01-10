import React,{Component} from 'react';
import Layout from './Layout';
import '../../styleSheet/Landing.css';
import PizzaBuilder from './PizzaBuilder';

 class Landing extends Component {

  render(){
  return(
    <div style={{textAlign:'center'}}>
      <Layout>
        <PizzaBuilder/>
        </Layout>     
    </div>
  );
  }
};

export default Landing;

