import actionTypes from "./actionTypes";

export const getListFaq = ({ cate }) => {
  return {
    type: actionTypes.GET_LIST_FAQ,
    cate: cate,
  };
};

export const searchFAQ = (data) => {
  return {
    type: actionTypes.SEARCH_FAQ,
    ...data,
  };
};
