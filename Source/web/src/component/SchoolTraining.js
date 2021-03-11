import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import ModelManager from '../common/ModelManager';
import { useSelector, useDispatch } from 'react-redux';
import useTruspilot from '../hooks/useTruspilot';
import { siteActionType } from 'redux/actions/actionTypes';
import FootballSkill from './camp/FootballSkill';
import Feedback from './camp/Feedback';
import WhyWMF from './camp/WhyWMF';
import BookTrialOne from './camp/BookTrialOne';
import InstaBox from 'views/Homepage/components/InstaBox';
import QNA from './camp/QNA';
import AboutUs from './camp/AboutUs';
import Intro from 'views/Homepage/components/Intro';

const ClearBoth = function () {
    return <div style={{ clear: 'both' }} />;
};

function SchoolTraining() {
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
            cate: 9,
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
            <div style={{ backgroundColor: '#F2F2F2', marginBottom: '80px' }}>
                <div
                    className="container why-wmf"
                    style={{ padding: '80px 165px' }}>
                    <h2 className="heading">Which schools already trust us?</h2>
                    <div style={{display:"flex"}}>
                        <div style={{width:"20%",padding:"0 15px"}}>
                            <img src={require('../images/logo-school1.png')} />
                        </div >
                        <div style={{width:"20%",padding:"0 15px"}}>
                            <img src={require('../images/logo-school2.png')} />
                        </div>
                        <div style={{width:"20%",padding:"0 15px"}}>
                            <img src={require('../images/logo-school3.png')} />
                        </div>
                        <div style={{width:"20%",padding:"0 15px"}}>
                            <img src={require('../images/logo-school4.png')} />
                        </div>
                        <div style={{width:"20%",padding:"0 15px"}}>
                            <img src={require('../images/logo-school5.png')} />
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
                        Enquire about school training for your pupils
                    </h4>
                    <p style={{ marginBottom: '3rem' }}>
                        Your pupils and parents will thank you for it in the
                        future.
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
                        Enquire about school training
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

export default SchoolTraining;
