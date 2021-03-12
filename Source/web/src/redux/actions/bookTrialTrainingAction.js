import actionTypes from "./actionTypes";

export const courseStartDate = ({course_id}) => {
  return {
      type: actionTypes.COURSE_START_DATE,
      course_id: course_id,
  };
};

export const bookCourseSignUp = ({totalData}) => {
  return {
      type: actionTypes.BOOK_COURSE_SIGNUP,
      totalData,
  };
};

export const bookCourse = ({course_id, start_date, child_id, token}) => {
  return {
    type: actionTypes.BOOK_COURSE,
    course_id,
    start_date,
    child_id,
    token,
  };
};