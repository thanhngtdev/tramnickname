import { useDispatch } from 'react-redux';
import { siteActionType } from 'src/redux/actions/actionTypes';

export default function (setLoading, number) {
    let options = {
        enableHighAccuracy: true,
        timeout: 0,
        maximumAge: 0,
    };

    const success = (pos) => {
        setLoading('Loading');
        let crd = pos.coords;
        const dispatch = useDispatch();
        dispatch({
            type: siteActionType.GET_CURRENT_ACADEMY,
            lat: crd.latitude,
            long: crd.longitude,
            number: number,
        });
    };

    function error(err) {
        alert('Allow this site to access your location', err);
        // dispatch({
        //     type: siteActionType.GET_CURRENT_ACADEMY_FAILED,
        //     number: number,
        // });
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
}
