import types from 'redux/actions/actionTypes';

const initialState = {
    message: '',
    lstSite: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.GET_DETAIL_SITE:
            return {
                ...state,
                // isFetching: true,
            };

        case types.GET_DETAIL_SITE_SUCCESS:
            return {
                ...state,
                type: types.GET_DETAIL_SITE_SUCCESS,
                data: action.data,
                lstSite: action.lstSite,
            };

        case types.GET_DETAIL_SITE_FAILED:
            return {
                ...state,
                type: types.GET_DETAIL_SITE_FAILED,
                message: action.message,
            };

        default:
            return state;
    }
};
