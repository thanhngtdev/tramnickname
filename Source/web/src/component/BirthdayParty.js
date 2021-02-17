/* eslint-disable no-undef */
import React, { Fragment, useEffect, useState } from 'react';
import AboutUs from './camp/AboutUs';
import Feedback from './camp/Feedback';
import FootballSkill from './camp/FootballSkill';
import '../css/holiday-camp.css';
import BookTrialParty from './camp/BookTrialParty';
import QNA from './camp/QNA';
import BirthdayPackage from './camp/BirthdayPackage';
import ImageGallery from './homepage/ImageGallery';
import BirthdayExtra from './camp/BirthdayExtra';
import { useDispatch, useSelector } from 'react-redux';
import ModelManager from '../common/ModelManager';
import { siteActionType } from '../actions/actionTypes';
import useTruspilot from '../hooks/useTruspilot';


const ClearBoth = function () {
    return <div style={{ clear: 'both' }} />;
};

export default function BirthdayParty() {
    const dispatch = useDispatch();

    const currentAcademy = ModelManager.getLocation();
    const [about, setAbout] = useState({});
    const [about2, setAbout2] = useState({});
    const [faq, setFaq] = useState([]);
    const [parentFb, setParentFb] = useState({});
    const [skillGain, setSkillGain] = useState({});
    const [birthdayPackage, setPackage] = useState({});
    const [imageGallery, setImageGallery] = useState({});
    const [partyInclude, setPartyInclude] = useState({});
    const [partyOptional, setPartyOptional] = useState({}); 

    useTruspilot();

    useEffect(() => {
        dispatch({
            type: 'GET_DETAIL_SITE',
            siteId: currentAcademy.ms_id,
            cate: 15,
        });
        dispatch({ type: siteActionType.GET_LIST_SITE });
    }, [dispatch]);

    const siteReducer = useSelector((state) => state.siteReducer);
    useEffect(() => {
        if (siteReducer.type) {
            if (siteReducer.type === siteActionType.GET_DETAIL_SITE_SUCCESS) {
                // console.log(siteReducer.data);
                setSkillGain(siteReducer.data.keyElement || {});
                setParentFb(siteReducer.data.parentFb || {});
                setFaq(siteReducer.data.faq || []);
                setAbout(siteReducer.data.about || {});
                setAbout2(siteReducer.data.about2 || {});
                setPackage(siteReducer.data.package || {});
                setImageGallery(siteReducer.data.gallery || {});
                setPartyInclude(siteReducer.data.partyInclude || {});
                setPartyOptional(siteReducer.data.partyOptional || {});
            }
        }
    }, [siteReducer]);


    return (
        <Fragment>
            <AboutUs data={about} />
            <ClearBoth />
            <div className="about-info about-info-birthday">
                <div className="container">
                    <div
                        style={{
                            backgroundColor: 'white',
                            position: 'relative',
                            overflow: 'hidden',
                            borderRadius: 6,
                        }}>
                        <img src={require('../images/left-quote.png')} />
                        <span className="slide-text">{about2.cfg_des}</span>
                    </div>
                </div>
            </div>
            <ClearBoth />
            <div className="box-slide-review birthday-review">
                <Feedback />
            </div>
            <ClearBoth />
            <FootballSkill data={skillGain} />
            <ClearBoth />
            <BirthdayPackage data={birthdayPackage} />
            <ClearBoth />
            <BirthdayExtra
                partyInclude={partyInclude}
                partyOptional={partyOptional}
            />
            <ClearBoth />
            <BookTrialParty parentFb={parentFb} />
            <ClearBoth />
            <div className="birthday-gallery">
                <div className="container">
                    <ImageGallery gallery={imageGallery} />
                </div>
            </div>

            <ClearBoth />
            <QNA data={faq} />
        </Fragment>
    );
}
