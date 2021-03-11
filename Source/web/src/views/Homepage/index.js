import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BannerTop from './components/BannerTop';
import Intro from './components/Intro';
import WhatWeDo from './components/WhatWeDo';
import Reason from './components/Reason';
import BookTrial from './components/BookTrial';
import FootballBegining from './components/FootballBegining';
import FootballFun from './components/FootballFun';
import InstaBox from './components/InstaBox';
import { getHome } from 'redux/actions/homeAction';

function HomePage() {
    //! state
    const dispatch = useDispatch();
    const homeReducer = useSelector((state) => state.homeReducer);
    const { data } = homeReducer;

    //! useEffect
    useEffect(() => {
        dispatch(getHome());
    }, []);

    return (
        <div>
            <BannerTop />
            <Intro intro={data?.homeIntro?.cfg_value || []} />
            <WhatWeDo gallery={data?.gallery || {}} />
            <Reason />
            <BookTrial parentFb={data?.parentFb || {}} />
            <FootballBegining />
            <FootballFun />
            <InstaBox instaFeed={data?.instaFeed || {}} />
        </div>
    );
}

export default HomePage;
