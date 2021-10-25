import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import ModelManager from 'src/common/ModelManager';
import saveList from 'src/hooks/useSaveList';
import siteService from 'src/services/siteService';

const DefaultLayout = dynamic(() => import('src/layout/DefaultLayout'));
const BookTrial = dynamic(() => import('src/components/Booking/BookTrial'));
const BannerTop = dynamic(() => import('src/components/HomePage/BannerTop'));
const FootballBegining = dynamic(() =>
    import('src/components/HomePage/FootballBegining'),
);
const FootballFun = dynamic(() =>
    import('src/components/HomePage/FootballFun'),
);
const InstaBox = dynamic(() => import('src/components/HomePage/InstaBox'));
const Intro = dynamic(() => import('src/components/HomePage/Intro.js'));
const Reason = dynamic(() => import('src/components/HomePage/Reason'));
const WhatWeDo = dynamic(() => import('src/components/HomePage/WhatWeDo'));

function HomePage({ data, listSite }) {
    // console.log(listSite);
    saveList(listSite);
    const [defaultAcademy, setDefaultAcademy] = useState({});
    useEffect(() => {
        setDefaultAcademy(ModelManager.getLocation());
    }, []);

    //
    return (
        <DefaultLayout seo={data?.seoMeta || {}}>
            <BannerTop bannerTop={data?.bannerTop || {}} />
            <div className="intro-homepage">
                <Intro intro={data?.homeIntro?.cfg_value || []} />
            </div>

            <WhatWeDo
                whatWeDo={data?.whatWeDo || {}}
                testimonial={data?.testimonial || {}}
                gallery={data?.gallery || {}}
                gallery2={data?.gallery2 || {}}
            />

            <Reason reason={data?.reason?.cfg_value || []} />
            <BookTrial parentFb={data?.parentFb || {}} site={defaultAcademy} />
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
//

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
