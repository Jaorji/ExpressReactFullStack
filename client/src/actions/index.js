import axios from 'axios';
import { FETCH_USER , FETCH_SURVEYS} from './types';

//must export function then can be used in another file
export  const fetchUser= () => async (dispatch) => {
  //payload:http 中的有效数据。
    const res = await axios.get('/api/current_user')
    dispatch({ type:FETCH_USER,payload:res.data});
};
export const handleToken = token => async (dispatch)=>{
  const res = await axios.post('/api/stripe',token);

  dispatch({type:FETCH_USER,payload:res.data});

};

export const submitForm =(values,history) => async(dispatch)=>{
  const res = await axios.post('/api/surveys',values);
  //history.push('/surveys');
  dispatch({type:FETCH_USER,payload:res.data});
};

export const fetchSurveys = ()=>async (dispatch)=>{
  const res = await axios.get('/api/surveys');

  dispatch({type:FETCH_SURVEYS,payload:res.data});
}