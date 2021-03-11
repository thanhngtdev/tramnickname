import React, { useEffect, useState } from 'react';

import { Switch, Route } from 'react-router-dom';
import { geolocated } from 'react-geolocated';
import { useDispatch, useSelector } from 'react-redux';

//! Views
import HomePage from './views/Homepage';
import ListNews from './views/News';
import Franchise from './views/Franchise';
import WeeklyTraining from './views/WeeklyTraining';
import HolidayCamp from './views/HolidayCamp';
import OneTraining from './views/OneTraining';
import BirthdayParty from './views/BirthdayParty';
import About from './views/About';
import JoinUs from './views/JoinUs';
import Footer from './component/Footer';
import Header from './component/Header';

import Coaching from './component/Coaching/Coaching';

import Contact from './component/Contact';
import BookTrialCamp from './component/BookTrialCamp';

import DetailNews from './component/DetailNews';
import LocationModal from './component/include/LocationModal';
import Location from './component/Location';

import { siteActionType } from './redux/actions/actionTypes';

import ListQNA from './component/ListQNA';
import DetailQNA from './component/DetailQNA';
import PathRoute from './common/PathRoute';
import ScrollToTop from './component/include/ScrollToTop';
import ThankYou from './component/ThankYou';
import Policy from './component/Policy';
import NotFound from './component/NotFound';
import usePermissionLocation from './hooks/usePermissionLocation';
import SchoolTraining from './component/SchoolTraining';
import BookTrialTraining from 'views/BookTrialTraning.js';
// import JoinUs from './component/JoinUs';

const DEFAULT_LAT = 51.5285582;
const DEFAULT_LOG = -0.2416794;

function RouteContent(props) {
    const dispatch = useDispatch();
    const locationStatus = usePermissionLocation();

    // useEffect(() => {
    //     dispatch({ type: siteActionType.GET_LIST_SITE });
    // }, []);

    useEffect(() => {
        if (locationStatus == 'granted') {
            dispatch({
                type: siteActionType.ALLOW_LOCATION,
                data: true,
            });
        }
        if (locationStatus == 'denied') {
            dispatch({
                type: siteActionType.ALLOW_LOCATION,
                data: false,
            });
        }
    }, [locationStatus]);

    useEffect(() => {
        const defaultAcademy = JSON.parse(
            localStorage.getItem('defaultAcademy'),
        );
        if (!defaultAcademy) {
            if (props.isGeolocationAvailable || props.isGeolocationEnabled) {
            } else
                dispatch({
                    type: siteActionType.FIND_NEARBY,
                    lat: localStorage.setItem(
                        'latitude',
                        props.coords.latitude,
                    ),
                    lng: localStorage.setItem(
                        'longitude',
                        props.coords.longitude,
                    ),
                });
        } else {
            dispatch({
                type: siteActionType.REFRESH_DEFAULT_DATA,
                siteId: defaultAcademy.ms_id,
            });
        }
    }, [dispatch]);

    const siteReducer = useSelector((state) => state.siteReducer);
    useEffect(() => {
        if (siteReducer.type) {
            if (
                siteReducer.type === siteActionType.REFRESH_DEFAULT_DATA_SUCCESS
            ) {
                // console.log(siteReducer.data);
                localStorage.setItem(
                    'defaultAcademy',
                    JSON.stringify(siteReducer.data.site),
                );
            }
        }
    }, [siteReducer]);

    useEffect(() => {
        if (!props.isGeolocationAvailable) {
            // console.log('geo location not available');
            localStorage.setItem('latitude', DEFAULT_LAT);
            localStorage.setItem('longitude', DEFAULT_LOG);
        }
        if (!props.isGeolocationEnabled) {
            // console.log('geo location not enable');
            localStorage.setItem('latitude', DEFAULT_LAT);
            localStorage.setItem('longitude', DEFAULT_LOG);
        }
        if (!props.coords) {
            // console.log('getting location')
        } else {
            // console.log(props.coords);
            dispatch({
                type: siteActionType.FIND_NEARBY,
                lat: props.coords.latitude,
                long: props.coords.longitude,
            });
            localStorage.setItem('latitude', props.coords.latitude);
            localStorage.setItem('longitude', props.coords.longitude);
        }
    }, [props]);

    useEffect(() => {
        setTimeout(() => {
            dispatch({ type: siteActionType.GET_SITE_HAS_CAMP });
        }, 200);
    }, []);

    return (
        <div className="wapper">
            <ScrollToTop />
            <Header />
            <Switch>
                <Route exact path={PathRoute.Home} component={HomePage} />
                <Route exact path={PathRoute.AboutUs} component={About} />
                <Route exact path={PathRoute.Contact} component={Contact} />
                <Route
                    exact
                    path={PathRoute.WeeklyTraining}
                    component={WeeklyTraining}
                />
                <Route
                    exact
                    path={PathRoute.HolidayCamp}
                    component={HolidayCamp}
                />
                <Route
                    exact
                    path={PathRoute.OneTraining}
                    component={OneTraining}
                />
                <Route
                    exact
                    path={PathRoute.BirthdayParty}
                    component={BirthdayParty}
                />

                <Route exact path={PathRoute.JoinUs} component={JoinUs} />
                <Route exact path={PathRoute.Coaching} component={Coaching} />

                <Route exact path={PathRoute.BookTrialCamp}>
                    <BookTrialCamp />
                </Route>
                <Route
                    exact
                    path={PathRoute.BookTrialTraining}
                    component={BookTrialTraining}
                />

                <Route exact path={PathRoute.DetailNews}>
                    <DetailNews />
                </Route>
                <Route
                    exact
                    path={PathRoute.AcademyNews}
                    component={ListNews}
                />
                <Route exact path={PathRoute.ListNews}>
                    <ListNews />
                </Route>
                <Route exact path={PathRoute.HomeNews}>
                    <ListNews />
                </Route>
                <Route exact path={PathRoute.DetailQNA}>
                    <DetailQNA />
                </Route>
                <Route exact path={PathRoute.ListQNA}>
                    <ListQNA />
                </Route>
                <Route exact path={PathRoute.Location}>
                    <Location />
                </Route>
                <Route exact path={PathRoute.Franchise} component={Franchise} />
                <Route exact path={PathRoute.ThankYou}>
                    <ThankYou />
                </Route>
                <Route exact path={PathRoute.PolicyWithParam}>
                    <Policy />
                </Route>
                <Route exact path={PathRoute.Policy}>
                    <Policy />
                </Route>
                {/* <Route exact path={PathRoute.JoinUs}>
                    <JoinUs />
                </Route> */}
                <Route exact path={PathRoute.Error}>
                    <NotFound />
                </Route>
                <Route exact path={PathRoute.SchoolTraining}>
                    <SchoolTraining />
                </Route>
                <Route>
                    <NotFound />
                </Route>
            </Switch>
            <LocationModal />
            <Footer />
        </div>
    );
}

export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(RouteContent);
