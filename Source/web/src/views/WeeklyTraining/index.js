import React, { useEffect } from 'react';
import { Fragment } from 'react';
import 'css/holiday-camp.css';

import TrainingInclude from 'component/camp/TrainingInclude';
import Feedback from 'component/camp/Feedback';
import InstaBox from 'component/camp/InstaBox';
import BookTrial from 'views/Homepage/components/BookTrial';
import FootballSkill from 'component/camp/FootballSkill';
import WhyWMF from 'component/camp/WhyWMF';

import QNA from 'component/camp/QNA';
import AboutUs from 'component/camp/AboutUs';
import AboutInfo from 'component/camp/AboutInfo';
import AboutSecure from 'component/camp/AboutSecure';
import { useDispatch, useSelector } from 'react-redux';
import ModelManager from 'common/ModelManager';
import useTruspilot from 'hooks/useTruspilot';
import Testimonial from 'views/Homepage/components/Testimonial';
import { getDetailSite } from 'redux/actions/detailSiteAction';

const ClearBoth = function () {
    return <div style={{ clear: 'both' }} />;
};

function WeeklyTraining() {
    //! state
    const dispatch = useDispatch();
    const detailSiteReducer = useSelector((state) => state.detailSiteReducer);
    const currentAcademyId = ModelManager.getLocation()?.ms_id;
    const { data, lstSite } = detailSiteReducer;

    //! useEffect
    useTruspilot();

    useEffect(() => {
        dispatch(getDetailSite({ currentAcademyId, cate: 6 }));
    }, []);

    return (
        <Fragment>
            <AboutUs data={data?.about || {}} />
            <ClearBoth />
            <div className="about-info">
                <AboutInfo lstAcademy={lstSite || []} />
            </div>
            <ClearBoth />
            <AboutSecure data={data?.academyIntro?.cfg_value || []} />
            <ClearBoth />
            <TrainingInclude data={data?.eachWeek || {}} />
            <ClearBoth />
            <div className="box-slide-review">
                <Testimonial style={"change-color"}/>
            </div>

            <ClearBoth />
            <FootballSkill data={data?.skillGain || {}} />
            <ClearBoth />
            <WhyWMF data={data?.whyWMF || {}} />
            <ClearBoth />
            <BookTrial parentFb={data?.parentFb || {}} />
            <ClearBoth />
            <InstaBox instaFeed={data?.instaFeed || {}} />
            <ClearBoth />
            <QNA data={data?.faq || []} />
        </Fragment>
    );
}

export default WeeklyTraining;
