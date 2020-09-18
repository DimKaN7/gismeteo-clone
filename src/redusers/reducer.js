// import {startCity} from '../services/labels';

const initialState = {
    lang: 'ru',
    city: 'Иркутск',
    weather: [],
    loading: true,
    selectedTab: 0,
    width: 0,
};

const reducer = (state=initialState, action) => {
    // console.log(state.prevCity);
    switch (action.type) {
        case 'SET_LANG':
            return {
                ...state,
                lang: action.payload
            }
        case 'SET_CITY': 
            return {
                ...state,
                city: action.payload,
            }
        case 'SET_LOADING': 
            return {
                ...state,
                loading: action.payload,
            } 
        case 'SET_WEATHER':
            return {
                ...state, 
                weather: action.payload,
            }
        case 'SET_WIDTH':
            return {
                ...state,
                width: action.payload
            }
        case 'SET_SELECTED_TAB':
            return {
                ...state,
                selectedTab: action.payload
            }
        default:
            return state;
    }
}

export default reducer;