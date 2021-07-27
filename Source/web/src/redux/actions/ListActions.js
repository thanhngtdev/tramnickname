import actionTypes from "./actionTypes";

export const saveListSite = (data) => {
  return {
    data,
    type: actionTypes.SAVE_lIST_SITE,
  };
};
