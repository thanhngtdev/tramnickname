import isEmpty from 'lodash/isEmpty';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { saveListSite } from 'src/redux/actions/ListActions';

const saveList = (list) => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (!isEmpty(list)) {
            dispatch(saveListSite(list));
        }
    }, []);
};

export default saveList;
