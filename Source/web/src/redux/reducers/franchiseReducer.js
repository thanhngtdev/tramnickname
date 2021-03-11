import types from 'redux/actions/actionTypes';

const initialState = {
    isFetching: false,
    data: {},
    error: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.GET_FRANCHISE_DETAIL_REQUEST:
            return {
                ...state,
                isFetching: true,
            };

        case types.GET_FRANCHISE_DETAIL_SUCCESS:
            return {
                ...state,
                isFetching: false,
                data: action.data,
                error: null,
            };

        case types.GET_FRANCHISE_DETAIL_FAILED:
            return {
                ...state,
                isFetching: false,
                error: action.error,
            };

        default:
            return state;
    }
};
