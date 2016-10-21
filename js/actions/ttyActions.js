
import axios from 'axios';

export function fetchTtyMenu() {
  return function (dispatch) {
    axios.get('http://localhost:3000/api/tty')
      .then((response) => {
        dispatch({ type: 'FETCH_TTY_MENU_FULFILLED', payload: response.data });
      })
      .catch((err) => {
        dispatch({ type: 'FETCH_TTY_MENU_REJECTED', payload: err });
      });
  };
}
