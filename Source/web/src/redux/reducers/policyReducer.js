import type from "../actions/actionTypes";

const initialState = {
  message: "",
  data: {},
};

const policyReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.GET_POLICY_SUCCESS:
      return {
        ...state,
        type: type.GET_POLICY_SUCCESS,
        data: action.data,
      };
    case type.GET_POLICY_FAILED:
      return {
        ...state,
        type: type.GET_POLICY_FAILED,
        message: action.message,
      };
    default:
      return state;
  }
};

export default policyReducer;
