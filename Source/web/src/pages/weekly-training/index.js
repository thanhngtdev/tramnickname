import React from 'react';
import dynamic from 'next/dynamic';
import saveList from 'src/hooks/useSaveList';
import siteService from 'src/services/siteService';
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
// const DefaultLayout = dynamic(() => import('src/layout/DefaultLayout'));
const DefaultLayout = dynamic(() => import('src/layout/DefaultLayout'));

function WeeklyTraining({ data, listSite }) {
    console.log(data, 'data');
    saveList(listSite);

    return (
        <DefaultLayout seo={data?.seoMeta || {}}>
            <AboutUs data={data?.about || {}} />

            <div className="about-info-weekly">
                <AboutInfo lstAcademy={listSite || []} />
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

            <WhyWMF data={data?.whyWMF || {}} />

            <div className="booking-weekly">
                <BookTrial parentFb={data?.parentFb || {}} />
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
        cate: 6,
        location: '',
        slug: 'weekly-training',
    });

    const data = siteDetail.data.data;

    return {
        props: { data, listSite },
        // revalidate: Constants.REVALIDATE
    };
}

export default WeeklyTraining;
