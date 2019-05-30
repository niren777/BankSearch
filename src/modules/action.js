// types of action
const Types = {
  ADD_BANKS: "ADD_BANKS",
  SAVE_SELECTED_CITY: "SAVE_SELECTED_CITY"
};
// actions
const addBanks = banks => ({
  type: Types.ADD_BANKS,
  payload: banks
});
const setSelectedCity = city => ({
  type: Types.SAVE_SELECTED_CITY,
  payload: city
});

export default {
  addBanks,
  setSelectedCity,
  Types
};