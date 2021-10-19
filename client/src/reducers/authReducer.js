const initialState = {  
  isLoggedIn: false
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGGED_IN':
        return{
          ...state,
          isLoggedIn:true
        };
        case 'ERROR':
        return{
          ...state,
          isLoggedIn: false
        };
      default:
        return state;
    }
  };

  export default authReducer;