import { isEmpty } from 'lodash';
import React, { useEffect, useRef } from 'react';
import { Button } from 'react-bootstrap';
import BookTrialOne from 'src/components/1-on-1-trainingComponents/components/BookTrialOne';
import AboutUs from 'src/components/Camp/AboutUs';
import FootballSkill from 'src/components/Camp/FootballSkill';
import InstaBox from 'src/components/Camp/InstaBox';
import QNA from 'src/components/Camp/QNA';
import WhyWMF from 'src/components/Camp/WhyWMF';
import Intro from 'src/components/HomePage/Intro.js';
import Provide from 'src/components/Provide';
// import Spinner from "component/Spinner";
import Testimonial from 'src/components/Testimonial';
import saveList from 'src/hooks/useSaveList';
import DefaultLayout from 'src/layout/DefaultLayout';
import siteService from 'src/services/siteService';

export default function OneTraining({ data, listSite }) {
    saveList(listSite);
    const enquireBox = useRef(null);
    useEffect(() => {
        if (isEmpty(data)) {
            window.location.href = '/404';
        }
    }, []);

    if (isEmpty(data)) return <> </>;

    return (
        <DefaultLayout seo={data.seoMeta}>
            <div className="about-121">
                <AboutUs
                    data={data?.masterData?.about || {}}
                    site={data.site}
                />
            </div>
            <div className="intro-121">
                <Intro
                    intro={data?.masterData?.trainingIntro?.cfg_value || []}
                />
            </div>
            <div className="football-121">
                <FootballSkill
                    data={data?.masterData?.skillGain || {}}
                    noTitle
                />
            </div>
            <div className="one-training">
                <Testimonial
                    data={data?.testimonial || {}}
                    style={'change-color'}
                    textColor={'orange'}
                />
            </div>

            <Provide site={data.site || {}} franchisePage />

            <div className="container">
                <div style={{ marginBottom: '120px' }} className="enquire">
                    <p className="enquire-header">
                        Enquire about 1-to-1 training for your child
                    </p>
                    <p style={{ marginBottom: '3rem' }}>
                        Your child will thank you for it in the future
                    </p>
                    <Button
                        onClick={() => {
                            enquireBox.current.scrollIntoView({
                                behavior: 'smooth',
                            });
                        }}
                        style={{
                            backgroundColor: 'white',
                            color: '#FF7531',
                            borderRadius: 6,
                            boxShadow: 'none',
                            border: 'none',
                            padding: '1.5rem 3rem',
                            textTransform: 'uppercase',
                            cursor: 'pointer',
                        }}>
                        Enquire about 1-to-1 coaching
                    </Button>
                </div>
            </div>
            <div className="whywmf-121">
                <WhyWMF
                    data={data?.masterData?.whyWMF || {}}
                    site={data.site}
                />
            </div>
            <div className="booking-weekly">
                <BookTrialOne
                    _ref={enquireBox}
                    parentFb={data?.parentFb || {}}
                    site={data.site}
                />
            </div>
            <div className="insta-weekly">
                <InstaBox instaFeed={data?.masterData?.instaFeed || {}} />
            </div>
            <div className="faq-weekly">
                <QNA data={data?.faq || []} />
            </div>
        </DefaultLayout>
    );
}

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
//             cate: 14,
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
        cate: 14,
        location: item.ms_id,
        slug: '1-on-1-training',
    });

    const data = siteDetail.data.data;

    return { props: { data, listSite } };
}
