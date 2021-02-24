import React, { useEffect, useState } from 'react';

import { Switch, Route } from 'react-router-dom';
import { geolocated } from 'react-geolocated';
import { useDispatch, useSelector } from 'react-redux';
import Footer from './component/Footer';
import Header from './component/Header';
import HomePage from './component/HomePage';
import About from './component/About';
import Contact from './component/Contact';
import BookTrialCamp from './component/BookTrialCamp';
import BookTrialTraining from './component/BookTrialTraining';
import BirthdayParty from './component/BirthdayParty';
import OneTraining from './component/OneTraining';
import WeeklyTraining from './component/WeeklyTraining';
import ListNews from './component/ListNews';
import DetailNews from './component/DetailNews';
import LocationModal from './component/include/LocationModal';
import Location from './component/Location';

import { siteActionType } from './actions/actionTypes';
import Franchise from './component/Franchise';
import ListQNA from './component/ListQNA';
import DetailQNA from './component/DetailQNA';
import HolidayCamp from './component/HolidayCamp';
import PathRoute from './common/PathRoute';
import ScrollToTop from './component/include/ScrollToTop';
import ThankYou from './component/ThankYou';
import Policy from './component/Policy';
import NotFound from './component/NotFound';
import usePermissionLocation from './hooks/usePermissionLocation';

const DEFAULT_LAT = 51.5285582;
const DEFAULT_LOG = -0.2416794;

function RouteContent(props) {
    const dispatch = useDispatch();
    const locationStatus = usePermissionLocation();
    
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
                type: siteActionType.FIND_NEARBY_ACADEMY,
                lat: props.coords.latitude,
                long: props.coords.longitude,
            });
            localStorage.setItem('latitude', props.coords.latitude);
            localStorage.setItem('longitude', props.coords.longitude);
        }
    }, [props]);
    return (
        <div className="wapper">
            <ScrollToTop />
            <Header />
            <Switch>
                <Route exact path="/">
                    <HomePage />
                </Route>
                <Route exact path="/about-us">
                    <About />
                </Route>
                <Route exact path={PathRoute.Contact}>
                    <Contact />
                </Route>
                <Route exact path={PathRoute.HolidayCamp}>
                    <HolidayCamp />
                </Route>
                <Route exact path={PathRoute.BookTrialCamp}>
                    <BookTrialCamp />
                </Route>
                <Route exact path={PathRoute.BookTrialTraining}>
                    <BookTrialTraining />
                </Route>
                <Route exact path={PathRoute.OneTraining}>
                    <OneTraining />
                </Route>
                <Route exact path={PathRoute.BirthdayParty}>
                    <BirthdayParty />
                </Route>
                <Route exact path={PathRoute.WeeklyTraining}>
                    <WeeklyTraining />
                </Route>
                <Route exact path={PathRoute.DetailNews}>
                    <DetailNews />
                </Route>
                <Route exact path={PathRoute.AcademyNews}>
                    <ListNews />
                </Route>
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
                <Route exact path={PathRoute.Franchise}>
                    <Franchise />
                </Route>
                <Route exact path={PathRoute.ThankYou}>
                    <ThankYou />
                </Route>
                <Route exact path={PathRoute.Policy}>
                    <Policy />
                </Route>
                <Route exact path={PathRoute.Error}>
                    <NotFound />
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
