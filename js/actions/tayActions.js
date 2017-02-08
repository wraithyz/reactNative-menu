import axios from 'axios';

export function fetchTayMenu() {
  return function (dispatch) {
    axios.get('http://ec2-52-29-236-223.eu-central-1.compute.amazonaws.com/api/tay')
      .then((response) => {
        dispatch({ type: 'FETCH_TAY_MENU_FULFILLED', payload: response });
      })
      .catch((err) => {
        dispatch({ type: 'FETCH_TAY_MENU_REJECTED', payload: err });
      });
  };
}
