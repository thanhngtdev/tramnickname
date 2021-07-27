import React from 'react';
import BookTrial from '../components/Booking/BookTrial';
import BannerTop from '../components/HomePage/BannerTop';
// import FootballBegining from 'components/HomePage/FootballBegining';
import FootballBegining from '../components/HomePage/FootballBegining';
import FootballFun from '../components/HomePage/FootballFun';
import InstaBox from '../components/HomePage/InstaBox';
import Intro from '../components/HomePage/Intro';
import Reason from '../components/HomePage/Reason';
import WhatWeDo from '../components/HomePage/WhatWeDo';
import saveList from '../hooks/useSaveList';
import DefaultLayout from '../layout/DefaultLayout';
import siteService from '../services/siteService';

function HomePage({ data, listSite }) {
    saveList(listSite);

    return (
        <DefaultLayout seo={data.seoMeta}>
            <BannerTop bannerTop={data?.bannerTop || {}} />
            <div className="intro-homepage">
                <Intro intro={data?.homeIntro?.cfg_value || []} />
            </div>
            <div className="whatwedo">
                <WhatWeDo
                    whatWeDo={data?.whatWeDo || {}}
                    testimonial={data?.testimonial || {}}
                    gallery={data?.gallery || {}}
                    gallery2={data?.gallery2 || {}}
                />
            </div>
            <Reason reason={data?.reason?.cfg_value || []} />
            <BookTrial parentFb={data?.parentFb || {}} />
            <div className="fb-begin-homepage">
                <FootballBegining
                    footballBegining={data?.footballBegining || {}}
                />
            </div>
            <FootballFun footballFun={data?.footballFun || {}} />
            <InstaBox instaFeed={data?.instaFeed || {}} />
        </DefaultLayout>
    );
}

export async function getServerSideProps() {
    return await Promise.all([
        siteService.getHome(),
        siteService.getListSite(),
    ]).then((values) => {
        return {
            props: {
                data: values[0].data.data,
                listSite: values[1].data.data.lstSite,
            },
        };
    });
}

export default HomePage;
