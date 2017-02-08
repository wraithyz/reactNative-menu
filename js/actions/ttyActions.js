import axios from 'axios';

export function fetchTtyMenu() {
  return function (dispatch) {
    axios.get('http://ec2-52-29-236-223.eu-central-1.compute.amazonaws.com/api/tty')
      .then((response) => {
        dispatch({ type: 'FETCH_TTY_MENU_FULFILLED', payload: response });
      })
      .catch((err) => {
        dispatch({ type: 'FETCH_TTY_MENU_REJECTED', payload: err });
      });
  };
}
