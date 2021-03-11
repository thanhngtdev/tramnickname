import React, { useState, useEffect } from 'react';
import { Fragment } from 'react';
import 'css/holiday-camp.css';

import CampInclude from 'component/camp/CampInclude';
import Feedback from 'component/camp/Feedback';
import InstaBox from 'component/camp/InstaBox';
import FootballSkill from 'component/camp/FootballSkill';
import WhyWMF from 'component/camp/WhyWMF';

import QNA from 'component/camp/QNA';
import AboutUs from 'component/camp/AboutUs';
import AboutInfoCamp from 'component/camp/AboutInfoCamp';
import AboutSecure from 'component/camp/AboutSecure';
import ModelManager from 'common/ModelManager';
import { useDispatch, useSelector } from 'react-redux';
import BookTrialHoliday from 'component/camp/BookTrialHoliday';
import useTruspilot from 'hooks/useTruspilot';
import { getDetailSite } from 'redux/actions/detailSiteAction';

const ClearBoth = function () {
    return <div style={{ clear: 'both' }} />;
};

function HolidayCamp() {
    //! state
    const dispatch = useDispatch();
    const detailSiteReducer = useSelector((state) => state.detailSiteReducer);
    const currentAcademyId = ModelManager.getLocation()?.ms_id;
    const { data, lstSite } = detailSiteReducer;

    //! useEffect
    useTruspilot();

    useEffect(() => {
        dispatch(getDetailSite({ currentAcademyId, cate: 9 }));
    }, []);

    return (
        <Fragment>
            <AboutUs data={data?.about || {}} />
            <ClearBoth />
            <div className="about-info">
                <AboutInfoCamp lstAcademy={lstSite || []} />
            </div>
            <ClearBoth />
            <AboutSecure />
            <ClearBoth />
            <CampInclude data={data?.dayCamp || {}} />
            <ClearBoth />
            <div className="box-slide-review camp-review">
                <Feedback data={data?.testimonial || []} color="#EF9042" />
            </div>
            <ClearBoth />
            <FootballSkill data={data?.skillGain || {}} />
            <ClearBoth />
            <WhyWMF data={data?.whyWMF || {}} />
            <ClearBoth />
            <BookTrialHoliday parentFb={data?.parentFb || {}} />
            <ClearBoth />
            <InstaBox instaFeed={data?.instaFeed || {}} />
            <ClearBoth />
            <QNA data={data?.faq || []} />
        </Fragment>
    );
}

export default HolidayCamp;
