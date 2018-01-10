import React from 'react';
import {connect} from 'react-redux';
import FIELD from './FormFields';
import _ from 'lodash';
import * as actions from '../../actions/index';
import {withRouter,Link} from 'react-router-dom';

const SurveyReview = (props)=>{

  const reviewFields = _.map(FIELD, ({name,label})=>{
    return (
      <div key={name}>
        <label>{label}</label>
        <div>
          {props.formValues[name]}
        </div>
      </div>
    )
  })
  
  return (
    <div>
      <h5>Please Confirm your Entries</h5>
      <div>
        {reviewFields}
      </div>
      
      <button
        className="teal btn-flat left white-text"
        onClick={props.onCancel}
      >
      Back
        <i className = "material-icons left">arrow_back</i>
      </button>
      <Link
        to='/surveys'
        onClick={()=> props.submitForm(props.formValues,props.history)}
        className="teal btn-flat right white-text"
      >
        Send Survey
        <i className = "material-icons right">email</i>
      </Link>
      </div>
  );
};
function mapStateToProps(state){
  return { formValues: state.form.surveyForm.values};

}

export default connect(mapStateToProps,actions)(withRouter(SurveyReview));