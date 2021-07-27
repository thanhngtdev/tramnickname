import { useEffect, useState } from 'react';
import Constants from '../common/Constants';

const usePermissionLocation = () => {
    const [statusPermission, setStatusPermission] = useState(
        Constants.STATUS_PERMISSION_LOCATION.PROMPT,
    );

    useEffect(() => {
        if (navigator.permissions && navigator.permissions.query) {
            navigator.permissions
                .query({ name: 'geolocation' })
                .then(function (result) {
                    setStatusPermission(result.state);
                    result.onchange = function () {
                        setStatusPermission(result.state);
                    };
                });
        }
    }, []);

    return statusPermission;
};

export default usePermissionLocation;
