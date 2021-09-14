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
import BookTrialHoliday from 'src/components/holiday-camps-homeComponents/components/BookTrialHoliday';
import React, { useEffect } from 'react';
import siteService from 'src/services/siteService';
import { isEmpty } from 'lodash';
import Utils from 'src/common/Utils';

function HolidayCamp({ data, listSite }) {
    saveList(listSite);

    useEffect(() => {
        if (isEmpty(data)) {
            window.location.href = '/404';
        }
    }, []);

    if (isEmpty(data)) return <> </>;
    return (
        <DefaultLayout seo={data?.seoMetaFranchise || {}}>
            <AboutUs data={data?.about || {}} site={data.site} />

            <div className="about-info-holiday">
                <AboutInfoCamp site={data.site} />
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

            <WhyWMF data={data?.whyWMF || {}} site={data.site} />

            <div className="booking-weekly">
                <BookTrialHoliday
                    parentFb={data?.parentFb || {}}
                    site={data.site}
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

export async function getServerSideProps(context) {
    const props = await Utils.getDetailMicrosite(
        context.params.franchise,
        9,
        'holiday-camps-home',
    );
    return { props };
}

export default HolidayCamp;
