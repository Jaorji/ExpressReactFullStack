import React,{Component} from 'react';
import { reduxForm ,Field } from 'redux-form';
import SurveyField from './SurveyField';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import validateEmails from '../../utils/validateEmails';
import FIELD from './FormFields';

class SurveyForm extends Component{
  renderFields(){
    return _.map(FIELD,({label,name})=>{
      return(
        <Field 
          key = {name}
          type="text"
          name= {name}
          label={label}
          component={SurveyField}
        />
      );
    });
  }
  render(){
    return(
      <div >
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <button type="submit" className="teal btn-flat right white-text">
            Next
            <i className = "material-icons right">arrow_forward</i>
          </button>
          <Link to="/surveys" className="teal btn-flat left white-text">
            Back
            <i className = "material-icons left">arrow_back</i>
          </Link>
        </form>
      </div>
    )
  }
}

function validate(values){
  const errors={};

   errors.recipients = validateEmails(values.recipients||'');

   _.each(FIELD,({name})=>{
     if(!values[name]){
       errors[name]='You must provide a value';
     }
   });

  return errors;
}
export default reduxForm({
  validate,
  form:'surveyForm',
  destroyOnUnmount:false
})(SurveyForm);