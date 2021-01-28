import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BannerTop from './franchise/BannerTop';
import CoachInfo from './franchise/CoachInfo';
import Intro from './homepage/Intro';
import BookTrial from './homepage/BookTrial';
import { siteActionType } from '../actions/actionTypes';
import Testimonial from './franchise/Testimonial';
import '../css/franchise.css';
import TrainingService from './franchise/TrainingService';
import CoachTeam from './franchise/CoachTeam';
import TrainingReason from './franchise/TrainingReason';
import QNA from './camp/QNA';
import RelateAreas from './franchise/RelateAreas';
import { useParams } from 'react-router-dom';

function Franchise() {
    const dispatch = useDispatch();
    let { id } = useParams();

    const [article, setArticle] = useState({});
    const [site, setSite] = useState({});
    const [faq, setFaq] = useState([]);
    const [intro, setIntro] = useState([]);
    const [lstFb, setLstFb] = useState([]);
    const [parentFb, setParentFb] = useState(null);
    const [footballBegining, setFootballBegining] = useState({});
    const [coachInfo, setCoachInfo] = useState({});
    const [service, setService] = useState({});

    useEffect(() => {
        dispatch({
            type: 'GET_DETAIL_SITE',
            siteId: id,
        });
    }, [dispatch, id]);

    const siteReducer = useSelector((state) => state.siteReducer);
    useEffect(() => {
        if (siteReducer.type) {
            if (siteReducer.type === siteActionType.GET_DETAIL_SITE_SUCCESS) {
                // console.log(siteReducer.data);
                setFaq(siteReducer.data.faq || []);
                setIntro(siteReducer.data.homeIntro.cfg_value);
                setLstFb(siteReducer.data.testimonial);
                setFootballBegining(siteReducer.data.footballBegining);
                setParentFb(siteReducer.data.parentFb);
                setSite(siteReducer.data.site);
                setArticle(siteReducer.data.article);
                setCoachInfo(siteReducer.data.coach);
                setService(siteReducer.data.service);
            }
        }
    }, [siteReducer]);

    return (
        <div>
            <BannerTop site={site} />
            <CoachInfo coach={coachInfo} />
            <Intro intro={intro} />
            <div className="franchise-review">
                <div className="container">
                    <Testimonial lstFb={lstFb} />
                </div>
            </div>
            <TrainingService site={site} service={service} />
            <TrainingReason reason={footballBegining} />
            <CoachTeam
                staff={coachInfo ? coachInfo['staff'] : []}
                site={site}
            />
            <BookTrial parentFb={parentFb} />
            <QNA data={faq} />
            <RelateAreas site={site} article={article} />
        </div>
    );
}

export default Franchise;
