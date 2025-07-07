export const selectCity = (city) => {
  return {
    type: 'SELECT_CITY',
    payload: city
  };
};
export const updateNotSelected = (cities) => {
  return {
    type: 'UPDATE_NOT_SELECTED',
    payload: cities
  };
};
export const setLanguage = (isSpanishLanguage) => { // Nueva acciÃ³n
  return {
    type: 'SET_LANGUAGE',
    payload: isSpanishLanguage,
  };
};
export const paramPlace = (param) => {
  return {
    type: 'PARAM_PLACE',
    payload: param,
  };
};
