import ACTIONS from "./action";
import _ from "lodash";

const defaultState = {
  cities: [{
    city: 'MUMBAI',
    banks: []
  },{
    city: 'CHENNAI',
    banks: []
  }],
  selectedCity: 'Select City'
};

const bankReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ACTIONS.Types.ADD_BANKS: {
      console.log(action);

      let city = action.payload;
      let newState = _.cloneDeep(state);
      var filteredCityObj = newState.cities.filter(cityObj => {return cityObj.city === city.city})[0]
      filteredCityObj.banks = city.banks
      return newState;
    }

    case ACTIONS.Types.SAVE_SELECTED_CITY: {
      state.selectedCity = action.payload
      return state
    }

    default:
      return state;
  }
};

export default bankReducer;