import AboutInfoCamp from 'src/components/Camp/AboutInfoCamp';
import AboutSecure from 'src/components/Camp/AboutSecure';
import AboutUs from 'src/components/Camp/AboutUs';
import CampInclude from 'src/components/Camp/CampInclude';
import FootballSkill from 'src/components/Camp/FootballSkill';
import InstaBox from 'src/components/Camp/InstaBox';
import QNA from 'src/components/Camp/QNA';
import WhyWMF from 'src/components/Camp/WhyWMF';
import Testimonial from 'src/components/Testimonial';
import saveList from 'src/hooks/useSaveList';
import DefaultLayout from 'src/layout/DefaultLayout';
import BookTrialHoliday from '../../components/holiday-camps-homeComponents/components/BookTrialHoliday';
import React from 'react';
import siteService from 'src/services/siteService';
import Constants from 'src/common/Constants';

function HolidayCamp({ data, listSite }) {
    saveList(listSite);
    return (
        <DefaultLayout seo={data.seoMeta}>
            <AboutUs data={data?.about || {}} />

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

export async function getStaticProps() {
    const listRes = await siteService.getListSite();
    const listSite = listRes.data.data.lstSite;

    const siteDetail = await siteService.getDetailSite({
        id: listSite[0].ms_id,
        cate: 9,
    });

    const data = siteDetail.data.data;

    return { props: { data, listSite }, revalidate: Constants.REVALIDATE };
}

export default HolidayCamp;
