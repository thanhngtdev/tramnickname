import BookTrial from 'src/components/Booking/BookTrial';
import AboutInfo from 'src/components/Camp/AboutInfo';
import AboutSecure from 'src/components/Camp/AboutSecure';
import AboutUs from 'src/components/Camp/AboutUs';
import FootballSkill from 'src/components/Camp/FootballSkill';
import InstaBox from 'src/components/Camp/InstaBox';
import QNA from 'src/components/Camp/QNA';
import TrainingInclude from 'src/components/Camp/TrainingInclude';
import WhyWMF from 'src/components/Camp/WhyWMF';
import Testimonial from 'src/components/Testimonial';
import saveList from 'src/hooks/useSaveList';
import DefaultLayout from 'src/layout/DefaultLayout';
import React from 'react';
import siteService from 'src/services/siteService';
import Constants from 'src/common/Constants';

function WeeklyTraining({ data, listSite }) {
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
