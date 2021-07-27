import LocationModal from 'src/components/include/LocationModal';
import usePermissionLocation from 'src/hooks/usePermissionLocation';
import useTruspilot from 'src/hooks/useTruspilot';
import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import Footer from './Footer';
import Header from './Header';

const DefaultLayout = (props) => {
    //! State
    const { children } = props;
    const dispatch = useDispatch();
    const locationStatus = usePermissionLocation();
    //! useEffect
    useTruspilot();

    // useEffect(() => {
    //   if (locationStatus == "granted") {
    //     dispatch({
    //       type: siteActionType.ALLOW_LOCATION,
    //       data: true,
    //     });
    //   }
    //   if (locationStatus == "denied") {
    //     dispatch({
    //       type: siteActionType.ALLOW_LOCATION,
    //       data: false,
    //     });
    //   }
    // }, [locationStatus]);

    //! Function

    //! Render
    return (
        <Fragment>
            <Header />
            {children}
            <Footer />
            <LocationModal />
        </Fragment>
    );
};

export default DefaultLayout;
