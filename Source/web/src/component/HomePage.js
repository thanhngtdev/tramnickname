import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BannerTop from './homepage/BannerTop';
import Intro from './homepage/Intro';
import WhatWeDo from './homepage/WhatWeDo';
import Reason from './homepage/Reason';
import BookTrial from './homepage/BookTrial';
import FootballBegining from './homepage/FootballBegining';
import FootballFun from './homepage/FootballFun';
import InstaBox from './homepage/InstaBox';
import { homeActionType } from '../actions/actionTypes';

function HomePage() {
    const dispatch = useDispatch();

    const [parentFb, setParentFb] = useState(null);
    const [instaFeed, setInstaFeed] = useState({});
    const [gallery, setGallery] = useState({});
    const [intro, setIntro] = useState([]);

    useEffect(() => {
        dispatch({ type: homeActionType.GET_HOME });
    }, [dispatch]);

    const homeReducer = useSelector((state) => state.homeReducer);
    useEffect(() => {
        if (homeReducer.type) {
            if (homeReducer.type === homeActionType.GET_HOME_SUCCESS) {
                setParentFb(homeReducer.data.parentFb);
                setInstaFeed(homeReducer.data.instaFeed);
                setGallery(homeReducer.data.gallery);
                setIntro(homeReducer.data.homeIntro.cfg_value);
            }
        }
    }, [homeReducer]);

    return (
        <div>
            <BannerTop />
            <Intro intro={intro} />
            <WhatWeDo gallery={gallery} />
            <Reason />
            <BookTrial parentFb={parentFb} />
            <FootballBegining />
            <FootballFun />
            <InstaBox instaFeed={instaFeed} />
        </div>
    );
}

export default HomePage;
