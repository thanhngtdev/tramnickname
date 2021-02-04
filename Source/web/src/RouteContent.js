import React, { useEffect } from 'react';

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
import ChildWelfarePolicy from './component/policies/ChildWelfarePolicy';
import AntiBullying from './component/policies/AntiBullying';
import EqualityAndDiversity from './component/policies/EqualityAndDiversity';
import PrivacyPolicy from './component/policies/PrivacyPolicy';

const DEFAULT_LAT = 51.5285582;
const DEFAULT_LOG = -0.2416794;

function RouteContent(props) {
    const dispatch = useDispatch();

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
        localStorage.setItem('latitude', props.coords.latitude);
        localStorage.setItem('longitude', props.coords.longitude);
    }
    return (
        <div className="wapper">
            <ScrollToTop />
            <Header />
            <Switch>
                <Route exact path="/">
                    <HomePage />
                </Route>
                <Route path="/about-us">
                    <About />
                </Route>
                <Route path={PathRoute.Contact}>
                    <Contact />
                </Route>
                <Route path={PathRoute.HolidayCamp}>
                    <HolidayCamp />
                </Route>
                <Route path={PathRoute.BookTrialCamp}>
                    <BookTrialCamp />
                </Route>
                <Route path={PathRoute.BookTrialTraining}>
                    <BookTrialTraining />
                </Route>
                <Route path={PathRoute.OneTraining}>
                    <OneTraining />
                </Route>
                <Route path={PathRoute.BirthdayParty}>
                    <BirthdayParty />
                </Route>
                <Route path={PathRoute.WeeklyTraining}>
                    <WeeklyTraining />
                </Route>
                <Route path={PathRoute.DetailNews}>
                    <DetailNews />
                </Route>
                <Route path={PathRoute.AcademyNews}>
                    <ListNews />
                </Route>
                <Route path={PathRoute.ListNews}>
                    <ListNews />
                </Route>
                <Route path={PathRoute.HomeNews}>
                    <ListNews />
                </Route>
                <Route path={PathRoute.DetailQNA}>
                    <DetailQNA />
                </Route>
                <Route path={PathRoute.ListQNA}>
                    <ListQNA />
                </Route>
                <Route path={PathRoute.Location}>
                    <Location />
                </Route>
                <Route path={PathRoute.Franchise}>
                    <Franchise />
                </Route>
                <Route path={PathRoute.ThankYou}>
                    <ThankYou />
                </Route>
                <Route path={PathRoute.WeFlarePolicy}>
                    <ChildWelfarePolicy />
                </Route>
                <Route path={PathRoute.AntiBullying}>
                    <AntiBullying/>
                </Route>
                <Route path={PathRoute.EqualityAndDiversity}>
                    <EqualityAndDiversity/>
                </Route>
                <Route path={PathRoute.PrivacyPolicy}>
                    <PrivacyPolicy/>
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
