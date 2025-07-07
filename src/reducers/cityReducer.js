const initialState = {
  selectedCity: null,
  notSelected: [],
  paramPlace: null,
};
const cityReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SELECT_CITY':
      return {
        ...state,
        selectedCity: action.payload
      };
    case 'UPDATE_NOT_SELECTED':
      return {
        ...state,
        notSelected: action.payload
      };
    case 'SET_LANGUAGE': // Nuevo case para manejar el idioma
      return {
        ...state,
        isSpanishLanguage: action.payload,
      };
    case 'PARAM_PLACE':
      return {
        ...state,
        paramPlace: action.payload,
      };
    default:
      return state;
  }
};
export default cityReducer;
