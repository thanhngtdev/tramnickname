import isEmpty from 'lodash/isEmpty';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { saveListSite } from 'src/redux/actions/ListActions';

const saveList = (list) => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (!isEmpty(list)) {
            const newList = list.map((item) => {
                let ms_addresses = item.ms_addresses;

                try {
                    ms_addresses = JSON.parse(item.ms_addresses);
                } catch (error) {
                    console.log(error, 'err');
                }

                return { ...item, ...ms_addresses[0] };
            });

            dispatch(saveListSite(newList));
        }
    }, []);
};

export default saveList;
