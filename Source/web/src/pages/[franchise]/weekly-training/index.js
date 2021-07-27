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

// export async function getStaticPaths() {
//     const res = await siteService.getListSite();
//     const list = res.data.data.lstSite;

//     // Get the paths we want to pre-render based on posts
//     const paths = list.map((item) => ({
//         params: { franchise: item.ms_alias },
//     }));

//     return { paths, fallback: false };
// }

// export async function getStaticProps(context) {
//     try {
//         const res = await siteService.getListSite();
//         const listSite = res.data.data.lstSite;
//         const item = listSite.find(
//             (item) => context.params.franchise === item.ms_alias,
//         );

//         const siteDetail = await siteService.getDetailSite({
//             id: item.ms_id,
//             cate: 6,
//         });

//         const data = siteDetail.data.data;
//         return { props: { data, listSite } };
//     } catch (error) {
//         console.log(error);
//     }

//     return { props: { data: {}, listSite: [] } };
// }

export async function getServerSideProps(context) {
    const listRes = await siteService.getListSite();
    const listSite = listRes.data.data.lstSite;

    const item = listSite.find(
        (item) => context.params.franchise === item.ms_alias,
    );

    if (isEmpty(item)) {
        return { props: { data: [], listSite } };
    }

    const siteDetail = await siteService.getDetailSite({
        id: item.ms_id,
        cate: 6,
    });

    const data = siteDetail.data.data;

    return { props: { data, listSite } };
}

export default SiteNews;
