import React, { useRef } from 'react';
import dynamic from 'next/dynamic';
import siteService from 'src/services/siteService';
const AboutUs = dynamic(() => import('src/components/Camp/AboutUs'));
const InstaBox = dynamic(() => import('src/components/Camp/InstaBox'));
const QNA = dynamic(() => import('src/components/Camp/QNA'));
const WhyWMF = dynamic(() => import('src/components/Camp/WhyWMF'));
const Intro = dynamic(() => import('src/components/HomePage/Intro.js'));
const Testimonial = dynamic(() => import('src/components/Testimonial'));
const DefaultLayout = dynamic(() => import('src/layout/DefaultLayout'));
const BookTrialSchool = dynamic(() =>
    import(
        'src/components/SchoolTrainingComponents/components/BookTrialSchool'
    ),
);
const Enquire = dynamic(() =>
    import('src/components/SchoolTrainingComponents/components/Enquire'),
);
const FootballSkill = dynamic(() =>
    import('src/components/Camp/FootballSkill'),
);
const TrustUs = dynamic(() =>
    import('src/components/SchoolTrainingComponents/components/TrustUs'),
);

function SchoolTraining({ data, listSite }) {
    const enquireBox = useRef(null);
    //sd

    return (
        <DefaultLayout seo={data?.seoMeta || {}}>
            <AboutUs data={data?.about || {}} />

            <div className="intro-school">
                <Intro intro={data?.trainingIntro?.cfg_value || []} />
            </div>
            <div className="football-school">
                <FootballSkill data={data?.skillGain || {}} />
            </div>

            <div className="one-training">
                <Testimonial
                    data={data?.testimonial || {}}
                    style={'change-color'}
                    textColor={'orange'}
                />
            </div>

            <TrustUs data={data?.gallery || {}} />

            <div className="enquire-school">
                <Enquire enquireBox={enquireBox} />
            </div>

            <WhyWMF data={data?.whyWMF || {}} />
            <div className="booking-weekly">
                <BookTrialSchool
                    _ref={enquireBox}
                    parentFb={data?.parentFb || {}}
                    listSite={listSite || []}
                />
            </div>

            <div className="insta-weekly">
                <InstaBox instaFeed={data?.instaFeed || {}} />
            </div>

            <div className="faq-weekly">
                <QNA data={data?.faq || []} />
            </div>
        </DefaultLayout>
    );
}

export async function getServerSideProps() {
    const listRes = await siteService.getListSite();
    const listSite = listRes.data.data.lstSite;

    const siteDetail = await siteService.getDetailSite({
        id: listSite[0].ms_id,
        cate: 21,
        slug: 'school-training',
    });

    const data = siteDetail.data.data;

    return { props: { data, listSite } };
}

export default SchoolTraining;
