import AboutInfoCamp from 'src/components/camp/AboutInfoCamp';
import AboutSecure from 'src/components/camp/AboutSecure';
import AboutUs from 'src/components/Camp/AboutUs';
import CampInclude from 'src/components/camp/CampInclude';
import FootballSkill from 'src/components/camp/FootballSkill';
import InstaBox from 'src/components/camp/InstaBox';
import QNA from 'src/components/camp/QNA';
import WhyWMF from 'src/components/camp/WhyWMF';
import Testimonial from 'src/components/Testimonial';
import saveList from 'src/hooks/useSaveList';
import DefaultLayout from 'src/layout/DefaultLayout';
import BookTrialHoliday from './components/BookTrialHoliday';
import React from 'react';
import siteService from 'src/services/siteService';

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

export async function getServerSideProps() {
    const listRes = await siteService.getListSite();
    const listSite = listRes.data.data.lstSite;

    const siteDetail = await siteService.getDetailSite({
        id: listSite[0].ms_id,
        cate: 9,
    });

    const data = siteDetail.data.data;

    return { props: { data, listSite } };
}

export default HolidayCamp;
