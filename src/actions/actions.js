export const setLang = (lang) => {
    return {
        type: 'SET_LANG',
        payload: lang,
    }
}
export const setCity = (city) => {
    return {
        type: 'SET_CITY',
        payload: city,
    }
}
export const setLoading = (loading) => {
    return {
        type: 'SET_LOADING',
        payload: loading,
    }
}
export const setWeather = (weather) => {
    return {
        type: 'SET_WEATHER',
        payload: weather,
    }
}
export const setWidth = (width) => {
    return {
        type: 'SET_WIDTH',
        payload: width,
    }
}
export const setSelectedTab = (tab) => {
    return {
        type: 'SET_SELECTED_TAB',
        payload: tab,
    }
}