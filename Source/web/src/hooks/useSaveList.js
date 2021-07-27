import { isEmpty } from 'lodash';
import { useDispatch } from 'react-redux';
import { saveListSite } from 'src/redux/actions/ListActions';

const saveList = (list) => {
    if (!isEmpty(list)) {
        const dispatch = useDispatch();
        dispatch(saveListSite(list));
    }
};

export default saveList;
