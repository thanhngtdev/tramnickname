import dynamic from 'next/dynamic';
const AboutInfoCamp = dynamic(() =>
    import('src/components/Camp/AboutInfoCamp'),
);
const AboutSecure = dynamic(() => import('src/components/Camp/AboutSecure'));
const AboutUs = dynamic(() => import('src/components/Camp/AboutUs'));
const CampInclude = dynamic(() => import('src/components/Camp/CampInclude'));
const FootballSkill = dynamic(() =>
    import('src/components/Camp/FootballSkill'),
);
const InstaBox = dynamic(() => import('src/components/Camp/InstaBox'));
const QNA = dynamic(() => import('src/components/Camp/QNA'));
const WhyWMF = dynamic(() => import('src/components/Camp/WhyWMF'));
const Testimonial = dynamic(() => import('src/components/Testimonial'));
const DefaultLayout = dynamic(() => import('src/layout/DefaultLayout'));
const BookTrialHoliday = dynamic(() =>
    import(
        '../../components/holiday-camps-homeComponents/components/BookTrialHoliday'
    ),
);
import saveList from 'src/hooks/useSaveList';
import React from 'react';
import siteService from 'src/services/siteService';

function HolidayCamp({ data, listSite }) {
    saveList(listSite);
    return (
        <DefaultLayout seo={data?.seoMeta || {}}>
            <AboutUs data={data?.about || {}} holidayCamp />

            <div className="about-info-holiday">
                <AboutInfoCamp />
            </div>

            <div className="about-secure-holiday">
                <AboutSecure data={data?.threeBoxes || {}} />
            </div>

            <div className="camp-review">
                <div className="about-camp-holiday">
                    <CampInclude data={data?.dayCamp || {}} />
                </div>
                <Testimonial
                    data={data?.testimonial || {}}
                    textColor={'white'}
                />
            </div>

            <div className="football-holiday">
                <FootballSkill data={data?.skillGain || {}} />
            </div>

            <WhyWMF data={data?.whyWMF || {}} />

            <div className="booking-weekly">
                <BookTrialHoliday parentFb={data?.parentFb || {}} />
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
        cate: 9,
        location: '',
        slug: 'holiday-camps-home',
    });

    const data = siteDetail.data.data;

    return {
        props: { data, listSite },
        //  revalidate: Constants.REVALIDATE
    };
}

export default HolidayCamp;
