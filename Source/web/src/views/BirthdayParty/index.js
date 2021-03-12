/* eslint-disable no-undef */
import React, { Fragment, useEffect, useRef, useState } from 'react';
import AboutUs from 'component/camp/AboutUs';
import Feedback from 'component/camp/Feedback';
import FootballSkill from 'component/camp/FootballSkill';
import 'css/holiday-camp.css';
import BookTrialParty from 'component/camp/BookTrialParty';
import QNA from 'component/camp/QNA';
import BirthdayPackage from 'component/camp/BirthdayPackage';
import ImageGallery from 'views/Homepage/components/ImageGallery';
import BirthdayExtra from 'component/camp/BirthdayExtra';
import { useDispatch, useSelector } from 'react-redux';
import ModelManager from 'common/ModelManager';
import { siteActionType } from 'redux/actions/actionTypes';
import useTruspilot from 'hooks/useTruspilot';
import { getDetailSite } from 'redux/actions/detailSiteAction';
import Testimonial from 'views/Homepage/components/Testimonial';

const ClearBoth = function () {
    return <div style={{ clear: 'both' }} />;
};

export default function BirthdayParty() {
    //! state
    const dispatch = useDispatch();
    const detailSiteReducer = useSelector((state) => state.detailSiteReducer);
    const currentAcademyId = ModelManager.getLocation()?.ms_id;
    const { data, lstSite } = detailSiteReducer;

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
    const [preferedPackage, setPreferedPackage] = useState('');

    //! useEffect
    useTruspilot();
    useEffect(() => {
        dispatch(getDetailSite({ currentAcademyId, cate: 15 }));
    }, []);
    // useEffect(() => {
    //     dispatch({
    //         type: 'GET_DETAIL_SITE',
    //         siteId: currentAcademy.ms_id || siteReducer.lstSite[0]?.ms_id,
    //         cate: 15,
    //     });
    // }, [dispatch]);

    // useEffect(() => {
    //     if (siteReducer.type) {
    //         if (siteReducer.type === siteActionType.GET_DETAIL_SITE_SUCCESS) {
    //             console.log(siteReducer.data);
    //             setSkillGain(siteReducer.data.keyElement || {});
    //             setParentFb(siteReducer.data.parentFb || {});
    //             setFaq(siteReducer.data.faq || []);
    //             setAbout(siteReducer.data.about || {});
    //             setAbout2(siteReducer.data.about2 || {});
    //             setPackage(siteReducer.data.package || {});
    //             setImageGallery(siteReducer.data.gallery || {});
    //             setPartyInclude(siteReducer.data.partyInclude || {});
    //             setPartyOptional(siteReducer.data.partyOptional || {});
    //         }
    //     }
    // }, [siteReducer]);

    // useEffect(() => {
    //     console.log('prefered');
    // }, [preferedPackage]);

    //! function
    //scroll to enquire section when book button clicked
    const ref = useRef();
    function handleScroll() {
        window.scrollTo({
            top: ref.current.offsetTop,
            behavior: 'smooth',
        });
    }

    //set prefered package when book button clicked
    function clickPreferedButton(packageTitle) {
        // console.log(packageTitle, 'packageTitle');
        setPreferedPackage(packageTitle);
    }

    return (
        <Fragment>
            <AboutUs data={data?.about || {}} />
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
                        <img src={require('images/left-quote.png')} />
                        <span className="slide-text">{about2.cfg_des}</span>
                    </div>
                </div>
            </div>
            <ClearBoth />
            <div className="box-slide-review birthday-review">
                <Testimonial />
            </div>
            <ClearBoth />
            <FootballSkill data={data?.skillGain || {}} />
            <ClearBoth />
            <BirthdayPackage
                onClick={(preferedPackage) => {
                    handleScroll();
                    clickPreferedButton(preferedPackage);
                }}
                data={data?.package || {}}
            />
            <ClearBoth />
            <BirthdayExtra
                partyInclude={data?.partyInclude || {}}
                partyOptional={data?.partyOptional || {}}
            />
            <ClearBoth />
            <BookTrialParty
                ref={ref}
                parentFb={data?.parentFb || {}}
                package={data?.package || {}}
                preferedPackage={preferedPackage}
            />
            <ClearBoth />
            <div className="birthday-gallery">
                <div className="container">
                    <ImageGallery gallery={data?.gallery || {}} />
                </div>
            </div>

            <ClearBoth />
            <QNA data={data?.faq || []} />
        </Fragment>
    );
}
