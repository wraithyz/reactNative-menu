const initialState = {
  fetching: false,
  fetched: false,
  menu: null,
  error: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_TTY_MENU_PENDING':
      return { ...state, fetching: true };
    case 'FETCH_TTY_MENU_FULFILLED':
      return { ...state, fetching: false, fetched: true, menu: JSON.parse(action.payload) };
    case 'FETCH_TTY_MENU_REJECTED':
      return { ...state, fetching: false, error: action.payload };
    default:
      return state;
  }
}
