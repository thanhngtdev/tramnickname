import React, { useState, useEffect } from 'react';
import { Fragment } from 'react';
import '../css/holiday-camp.css';

import CampInclude from './camp/CampInclude';
import Feedback from './camp/Feedback';
import InstaBox from './camp/InstaBox';
import FootballSkill from './camp/FootballSkill';
import WhyWMF from './camp/WhyWMF';

import QNA from './camp/QNA';
import AboutUs from './camp/AboutUs';
import AboutInfoCamp from './camp/AboutInfoCamp';
import AboutSecure from './camp/AboutSecure';
import ModelManager from '../common/ModelManager';
import { useDispatch, useSelector } from 'react-redux';
import { siteActionType } from '../actions/actionTypes';
import BookTrialHoliday from './camp/BookTrialHoliday';
import useTruspilot from '../hooks/useTruspilot';

const ClearBoth = function () {
    return <div style={{ clear: 'both' }} />;
};

function HolidayCamp() {
    const dispatch = useDispatch();

    const siteReducer = useSelector((state) => state.siteReducer);

    const currentAcademy = ModelManager.getLocation();
    const [feedback, setFeedback] = useState([]);
    const [skillGain, setSkillGain] = useState({});
    const [whyWMF, setWhyWMF] = useState({});
    const [parentFb, setParentFb] = useState({});
    const [instaFeed, setInstaFeed] = useState({});
    const [faq, setFaq] = useState([]);
    const [about, setAbout] = useState({});
    const [dayCamp, setDayCamp] = useState({});

    useTruspilot();

    useEffect(() => {
        dispatch({
            type: 'GET_DETAIL_SITE',
            siteId: currentAcademy.ms_id || siteReducer.lstSiteCamp[0]?.ms_id,
            cate: 9,
        });
    }, [dispatch]);

    useEffect(() => {
        if (siteReducer.type) {
            if (siteReducer.type === siteActionType.GET_DETAIL_SITE_SUCCESS) {
                console.log(siteReducer.data);
                setFeedback(siteReducer.data.testimonial || []);
                setSkillGain(siteReducer.data.skillGain || {});
                setWhyWMF(siteReducer.data.whyWMF || {});
                setParentFb(siteReducer.data.parentFb || {});
                setInstaFeed(siteReducer.data.instaFeed || {});
                setFaq(siteReducer.data.faq || []);
                setAbout(siteReducer.data.about || {});
                setDayCamp(siteReducer.data.dayCamp || {});
            }
        }
    }, [siteReducer]);

    return (
        <Fragment>
            <AboutUs data={about} />
            <ClearBoth />
            <div className="about-info">
                <AboutInfoCamp lstAcademy={siteReducer.lstSiteCamp} />
            </div>
            <ClearBoth />
            <AboutSecure />
            <ClearBoth />
            <CampInclude data={dayCamp} />
            <ClearBoth />
            <div className="box-slide-review camp-review">
                <Feedback data={feedback} color="#EF9042" />
            </div>
            <ClearBoth />
            <FootballSkill data={skillGain} />
            <ClearBoth />
            <WhyWMF data={whyWMF} />
            <ClearBoth />
            <BookTrialHoliday parentFb={parentFb} />
            <ClearBoth />
            <InstaBox instaFeed={instaFeed} />
            <ClearBoth />
            <QNA data={faq} />
        </Fragment>
    );
}

export default HolidayCamp;
