import actionTypes from './actionTypes';

export const findNearByAcademy = (lat, long) => {
    return {
        type: actionTypes.FIND_NEARBY_ACADEMY,
        lat: lat,
        long: long,
    };
};

export const getListCourse = ({ company_id, location_id, course_type }) => {
    return {
        type: actionTypes.GET_LIST_COURSE,
        company_id,
        location_id,
        course_type,
    };
};

export const courseStartDate = (course_id) => {
    return {
        type: actionTypes.COURSE_START_DATE,
        course_id: course_id,
    };
};

export const bookCourseSignUp = ({ totalData }) => {
    return {
        type: actionTypes.BOOK_COURSE_SIGNUP,
        totalData,
    };
};

export const bookCourse = ({ course_id, start_date, child_id, token }) => {
    return {
        type: actionTypes.BOOK_COURSE,
        course_id,
        start_date,
        child_id,
        token,
    };
};

export const checkEmail = (data) => {
    // console.log(data, 'data');
    return {
        type: actionTypes.CHECK_MAIL,
        data,
    };
};
