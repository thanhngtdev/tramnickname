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
import React, { useEffect } from 'react';
import siteService from 'src/services/siteService';
import { isEmpty } from 'lodash';
import Utils from 'src/common/Utils';

const SiteNews = ({ data, listSite }) => {
    //! State
    saveList(listSite);
    console.log(data, 'data');

    useEffect(() => {
        if (isEmpty(data)) {
            window.location.href = '/404';
        }
    }, []);
    //! Function

    //! Render
    if (isEmpty(data)) return <> </>;

    return (
        <DefaultLayout>
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
