const initialState = {
  inventory: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_INVENTORY":
      return { ...state, inventory: action.payload };
    default:
      return state;
  }
};

export default rootReducer;
