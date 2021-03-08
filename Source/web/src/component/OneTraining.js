import React, { Fragment, useEffect, useRef, useState } from 'react';
import AboutUs from './camp/AboutUs';
import Feedback from './camp/Feedback';
import FootballSkill from './camp/FootballSkill';
import WhyWMF from './camp/WhyWMF';
import BookTrialOne from './camp/BookTrialOne';
import InstaBox from './camp/InstaBox';
import QNA from './camp/QNA';
import Intro from './homepage/Intro';
import { Button } from 'react-bootstrap';
import ModelManager from '../common/ModelManager';
import { siteActionType } from '../actions/actionTypes';
import { useSelector, useDispatch } from 'react-redux';
import useTruspilot from '../hooks/useTruspilot';

const ClearBoth = function () {
    return <div style={{ clear: 'both' }} />;
};

function OneTraining() {
    const dispatch = useDispatch();

    const siteReducer = useSelector((state) => state.siteReducer);

    const currentAcademy = ModelManager.getLocation();
    const [skillGain, setSkillGain] = useState({});
    const [parentFb, setParentFb] = useState({});
    const [instaFeed, setInstaFeed] = useState({});
    const [faq, setFaq] = useState([]);
    const [about, setAbout] = useState({});
    const [whyWMF, setWhyWMF] = useState({});
    const [trainingIntro, setTrainingIntro] = useState([]);

    useTruspilot();

    useEffect(() => {
        dispatch({
            type: 'GET_DETAIL_SITE',
            siteId: currentAcademy.ms_id || siteReducer.lstSite[0]?.ms_id,
            cate: 14,
        });
    }, [dispatch]);

    useEffect(() => {
        if (siteReducer.type) {
            if (siteReducer.type === siteActionType.GET_DETAIL_SITE_SUCCESS) {
                // console.log(siteReducer.data, 'siteeee');
                setSkillGain(siteReducer.data.skillGain || {});
                setParentFb(siteReducer.data.parentFb || {});
                setInstaFeed(siteReducer.data.instaFeed || {});
                setFaq(siteReducer.data.faq || []);
                setAbout(siteReducer.data.about || {});
                setWhyWMF(siteReducer.data.whyWMF || {});
                setTrainingIntro(
                    siteReducer.data.trainingIntro
                        ? siteReducer.data.trainingIntro.cfg_value
                        : [],
                );
            }
        }
    }, [siteReducer]);

    const enquireBox = useRef(null);
    return (
        <Fragment>
            <AboutUs data={about} />
            <ClearBoth />
            <Intro intro={trainingIntro} />
            <ClearBoth />
            <FootballSkill data={skillGain} />
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
                            src={require('../images/hs_photo_pc.jpg')}
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
            <WhyWMF data={whyWMF} />
            <ClearBoth />
            <BookTrialOne _ref={enquireBox} parentFb={parentFb} />
            <ClearBoth />
            <InstaBox instaFeed={instaFeed} />
            <ClearBoth />
            <QNA data={faq} />
        </Fragment>
    );
}

export default OneTraining;
