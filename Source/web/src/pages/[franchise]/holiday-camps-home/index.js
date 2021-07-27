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
import BookTrialHoliday from 'pages/holiday-camps-home/components/BookTrialHoliday';
import React from 'react';
import siteService from 'src/services/siteService';

function HolidayCamp({ data, listSite }) {
    saveList(listSite);
    return (
        <DefaultLayout>
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

export async function getStaticPaths() {
    const res = await siteService.getListSite();
    const list = res.data.data.lstSite;

    // Get the paths we want to pre-render based on posts
    const paths = list.map((item) => ({
        params: { franchise: item.ms_alias },
    }));

    return { paths, fallback: false };
}

export async function getStaticProps(context) {
    const res = await siteService.getListSite();
    const listSite = res.data.data.lstSite;
    const item = listSite.find(
        (item) => context.params.franchise === item.ms_alias,
    );

    const siteDetail = await siteService.getDetailSite({
        id: item.ms_id,
        cate: 9,
    });

    const data = siteDetail.data.data;

    return { props: { data, listSite } };
}

export default HolidayCamp;
