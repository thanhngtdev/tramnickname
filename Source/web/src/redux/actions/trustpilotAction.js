import actionTypes from "./actionTypes";

export const showTruspilot = (data) => {
  return {
      ...data,
      type: actionTypes.SHOW_TRUSPILOT,
  };
};
