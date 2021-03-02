import React, { useEffect } from 'react';
import { Fragment } from 'react';
import '../css/holiday-camp.css';

import TrainingInclude from './camp/TrainingInclude';
import Feedback from './camp/Feedback';
import InstaBox from './camp/InstaBox';
import BookTrial from './homepage/BookTrial';
import FootballSkill from './camp/FootballSkill';
import WhyWMF from './camp/WhyWMF';

import QNA from './camp/QNA';
import AboutUs from './camp/AboutUs';
import AboutInfo from './camp/AboutInfo';
import AboutSecure from './camp/AboutSecure';
import { useDispatch, useSelector } from 'react-redux';
import { siteActionType } from '../actions/actionTypes';
import { useState } from 'react';
import ModelManager from '../common/ModelManager';
import useTruspilot from '../hooks/useTruspilot';
import Testimonial from './homepage/Testimonial';

const ClearBoth = function () {
    return <div style={{ clear: 'both' }} />;
};

function WeeklyTraining() {
    const dispatch = useDispatch();

    const siteReducer = useSelector((state) => state.siteReducer);

    const currentAcademy = ModelManager.getLocation() || {};
    const [academyIntro, setAcademyIntro] = useState({});
    const [eachWeek, setEachWeek] = useState({});
    const [feedback, setFeedback] = useState([]);
    const [skillGain, setSkillGain] = useState({});
    const [whyWMF, setWhyWMF] = useState({});
    const [parentFb, setParentFb] = useState({});
    const [instaFeed, setInstaFeed] = useState({});
    const [faq, setFaq] = useState([]);
    const [about, setAbout] = useState({});

    useTruspilot();

    useEffect(() => {
        dispatch({
            type: 'GET_DETAIL_SITE',
            siteId: currentAcademy.ms_id || siteReducer.lstSite[0]?.ms_id,
            cate: 6,
        });
    }, [dispatch]);

    console.log('WeeklyTraining -> siteReducer', siteReducer);
    useEffect(() => {
        if (siteReducer.type) {
            if (siteReducer.type === siteActionType.GET_DETAIL_SITE_SUCCESS) {
                console.log(siteReducer.data);
                setAcademyIntro(siteReducer.data.academyIntro || {});
                setEachWeek(siteReducer.data.eachWeek || {});
                setFeedback(siteReducer.data.testimonial || []);
                setSkillGain(siteReducer.data.skillGain || {});
                setWhyWMF(siteReducer.data.whyWMF || {});
                setParentFb(siteReducer.data.parentFb || {});
                setInstaFeed(siteReducer.data.instaFeed || {});
                setFaq(siteReducer.data.faq || []);
                setAbout(siteReducer.data.about || {});
            }
        }
    }, [siteReducer]);

    return (
        <Fragment>
            <AboutUs data={about} />
            <ClearBoth />
            <div className="about-info">
                <AboutInfo lstAcademy={siteReducer.lstSite} />
            </div>
            <ClearBoth />
            <AboutSecure data={academyIntro.cfg_value} />
            <ClearBoth />
            <TrainingInclude data={eachWeek} />
            <ClearBoth />
            <div className="box-slide-review">
                <Feedback data={feedback} />
            </div>

            <ClearBoth />
            <FootballSkill data={skillGain} />
            <ClearBoth />
            <WhyWMF data={whyWMF} />
            <ClearBoth />
            <BookTrial parentFb={parentFb} />
            <ClearBoth />
            <InstaBox instaFeed={instaFeed} />
            <ClearBoth />
            <QNA data={faq} />
        </Fragment>
    );
}

export default WeeklyTraining;
