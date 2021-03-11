import React, { Fragment, useEffect, useRef, useState } from 'react';
import AboutUs from 'component/camp/AboutUs';
import Feedback from 'component/camp/Feedback';
import FootballSkill from 'component/camp/FootballSkill';
import WhyWMF from 'component/camp/WhyWMF';
import BookTrialOne from 'component/camp/BookTrialOne';
import InstaBox from 'component/camp/InstaBox';
import QNA from 'component/camp/QNA';
import Intro from 'views/Homepage/components/Intro';
import { Button } from 'react-bootstrap';
import ModelManager from 'common/ModelManager';
import { siteActionType } from 'redux/actions/actionTypes';
import { useSelector, useDispatch } from 'react-redux';
import useTruspilot from 'hooks/useTruspilot';
import { getDetailSite } from 'redux/actions/detailSiteAction';

const ClearBoth = function () {
    return <div style={{ clear: 'both' }} />;
};

function OneTraining() {
    //! state
    const dispatch = useDispatch();
    const detailSiteReducer = useSelector((state) => state.detailSiteReducer);
    const currentAcademyId = ModelManager.getLocation()?.ms_id;
    const { data } = detailSiteReducer;

    //! useEffect
    useTruspilot();

    useEffect(() => {
        dispatch(getDetailSite({ currentAcademyId, cate: 14 }));
    }, []);

    const enquireBox = useRef(null);
    return (
        <Fragment>
            <AboutUs data={data?.about || {}} />
            <ClearBoth />
            <Intro intro={data?.trainingIntro?.cfg_value || []} />
            <ClearBoth />
            <FootballSkill data={data?.skillGain || {}} />
            <ClearBoth />
            <div className="box-slide-review one-training">
                <Feedback />
            </div>
            <ClearBoth />
            <div className="provides">
                <div className="container">
                    <h3 className="heading">
                        Who provides the 1-to-1 top coaching
                    </h3>
                </div>
                <div className="provides-row">
                    <div className="provides-image">
                        <img
                            style={{ float: 'right' }}
                            src={require('images/hs_photo_pc.jpg')}
                            alt=""
                        />
                    </div>
                    <div className="provides-text">
                        <div className="provides-wrap-text">
                            <p style={{ marginTop: 0 }}>
                                We Make Footballers only allow Senior Coaches
                                who have been awarded the WMF 1-on-1 Coaching
                                Badge to provide these sessions. All of our
                                Coaches work from the We Make Footballers
                                syllabus and Methodology, however, each coach
                                has their unique style and personality.
                            </p>
                            <p
                                className="text-leading"
                                style={{
                                    padding: '1rem',
                                    backgroundColor: '#F2F2F2',
                                }}>
                                At the <b>Isleworth Academy</b>, our 1-to-1
                                coaching is undertaken by <b>Head-Coach-name</b>
                            </p>
                            <p>
                                Esmond currently has a number of 1-on-1 clients
                                who he is helping to improve their individual
                                skills whilst developing at their weekly
                                training and local teams. His high energy means
                                your child will have a lot of fun whilst still
                                getting top quality sessions.
                            </p>
                            <b>How much do sessions cost?</b>
                            <p
                                className="text-cost"
                                style={{
                                    padding: '1rem',
                                    backgroundColor: '#F2F2F2',
                                    color: '#FF7100',
                                }}>
                                One Off - £60 | Block Of 4 - £200
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <ClearBoth />
            <div className="container">
                <div className="enquire">
                    <h4
                        style={{
                            fontSize: 45,
                            margin: '0 auto',
                            maxWidth: 700,
                        }}>
                        Enquire about 1-to-1 training for your child
                    </h4>
                    <p style={{ marginBottom: '3rem' }}>
                        Your child will thank you for it in the future
                    </p>
                    <Button
                        onClick={() => {
                            enquireBox.current.scrollIntoView({
                                behavior: 'smooth',
                            });
                        }}
                        style={{
                            backgroundColor: 'white',
                            color: '#FF7531',
                            borderRadius: 6,
                            boxShadow: 'none',
                            border: 'none',
                            padding: '1.5rem 3rem',
                            textTransform: 'uppercase',
                        }}>
                        Enquire about 1-to-1 coaching
                    </Button>
                </div>
            </div>
            <ClearBoth />
            <WhyWMF data={data?.whyWMF || {}} />
            <ClearBoth />
            <BookTrialOne _ref={enquireBox} parentFb={data?.parentFb || {}} />
            <ClearBoth />
            <InstaBox instaFeed={data?.instaFeed || {}} />
            <ClearBoth />
            <QNA data={data?.faq || []} />
        </Fragment>
    );
}

export default OneTraining;
