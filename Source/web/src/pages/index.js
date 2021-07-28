import React from 'react';
import BookTrial from 'src/components/Booking/BookTrial';
import BannerTop from 'src/components/HomePage/BannerTop';
import FootballBegining from 'src/components/HomePage/FootballBegining';
import FootballFun from 'src/components/HomePage/FootballFun';
import InstaBox from 'src/components/HomePage/InstaBox';
import Intro from 'src/components/HomePage/Intro.js';
import Reason from 'src/components/HomePage/Reason';
import WhatWeDo from 'src/components/HomePage/WhatWeDo';
import saveList from 'src/hooks/useSaveList';
import DefaultLayout from 'src/layout/DefaultLayout';
import siteService from 'src/services/siteService';

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

export async function getStaticProps() {
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
