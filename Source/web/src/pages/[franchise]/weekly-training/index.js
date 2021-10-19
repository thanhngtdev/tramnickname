import isEmpty from 'lodash/isEmpty';
import React, { useEffect } from 'react';
import Utils from 'src/common/Utils';
import saveList from 'src/hooks/useSaveList';
import dynamic from 'next/dynamic';

const BookTrial = dynamic(() => import('src/components/Booking/BookTrial'));
const AboutInfo = dynamic(() => import('src/components/Camp/AboutInfo'));
const AboutSecure = dynamic(() => import('src/components/Camp/AboutSecure'));
const AboutUs = dynamic(() => import('src/components/Camp/AboutUs'));
const FootballSkill = dynamic(() =>
    import('src/components/Camp/FootballSkill'),
);
const InstaBox = dynamic(() => import('src/components/Camp/InstaBox'));
const QNA = dynamic(() => import('src/components/Camp/QNA'));
const TrainingInclude = dynamic(() =>
    import('src/components/Camp/TrainingInclude'),
);
const WhyWMF = dynamic(() => import('src/components/Camp/WhyWMF'));
const Testimonial = dynamic(() => import('src/components/Testimonial'));
import DefaultLayout from 'src/layout/DefaultLayout';

const SiteNews = ({ data, listSite }) => {
    //! State
    saveList(listSite);

    useEffect(() => {
        if (isEmpty(data)) {
            window.location.href = '/404';
        }
    }, []);
    //! Function

    //! Render
    if (isEmpty(data)) return <> </>;

    return (
        <DefaultLayout seo={data?.seoMetaFranchise || {}}>
            <AboutUs data={data?.about || {}} site={data.site} />

            <div className="about-info-weekly">
                <AboutInfo lstAcademy={listSite || []} site={data.site} />
            </div>

            <div className="about-secure-weekly">
                <AboutSecure data={data?.academyIntro || []} />
            </div>

            <div className="background-weekly">
                <TrainingInclude data={data?.eachWeek || {}} />

                <Testimonial
                    data={data?.testimonial || {}}
                    style={'change-color'}
                    textColor={'orange'}
                />
            </div>

            <div className="football-weekly">
                <FootballSkill data={data?.skillGain || {}} />
            </div>

            <WhyWMF data={data?.whyWMF || {}} site={data.site} />

            <div className="booking-weekly">
                <BookTrial parentFb={data?.parentFb || {}} site={data.site} />
            </div>

            <div className="insta-weekly">
                <InstaBox instaFeed={data?.instaFeed || {}} />
            </div>

            <div className="faq-weekly">
                <QNA data={data?.faq || []} />
            </div>
        </DefaultLayout>
    );
};

export async function getServerSideProps(context) {
    const props = await Utils.getDetailMicrosite(
        context.params.franchise,
        6,
        'weekly-training',
    );
    return { props };
}

export default SiteNews;
