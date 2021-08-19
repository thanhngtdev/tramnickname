import AboutUs from 'src/components/Camp/AboutUs';
import FootballSkill from 'src/components/Camp/FootballSkill';
import InstaBox from 'src/components/Camp/InstaBox';
import QNA from 'src/components/Camp/QNA';
import WhyWMF from 'src/components/Camp/WhyWMF';
import Intro from 'src/components/HomePage/Intro.js';
// import Spinner from "component/Spinner";
import Testimonial from 'src/components/Testimonial';
import saveList from 'src/hooks/useSaveList';
import DefaultLayout from 'src/layout/DefaultLayout';
import BookTrialOne from '../../components/1-on-1-trainingComponents/components/BookTrialOne';
import React, { useRef } from 'react';
import { Button } from 'react-bootstrap';
import siteService from 'src/services/siteService';
import Provide from 'src/components/Provide';
import Constants from 'src/common/Constants';

function OneTraining({ data, listSite }) {
    saveList(listSite);
    const enquireBox = useRef(null);

    return (
        <DefaultLayout seo={data.seoMeta}>
            <div className="about-121">
                <AboutUs data={data?.about || {}} />
            </div>
            <div className="intro-121">
                <Intro intro={data?.trainingIntro?.cfg_value || []} />
            </div>
            <div className="football-121">
                <FootballSkill data={data?.skillGain || {}} noTitle />
            </div>
            <div className="one-training">
                <Testimonial
                    data={data?.testimonial || {}}
                    style={'change-color'}
                    textColor={'orange'}
                />
            </div>

            <Provide site={data.site || {}} />

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
                <WhyWMF data={data?.whyWMF || {}} />
            </div>
            <div className="booking-weekly">
                <BookTrialOne
                    // site={data.site}
                    _ref={enquireBox}
                    parentFb={data?.parentFb || {}}
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

export async function getStaticProps() {
    const listRes = await siteService.getListSite();
    const listSite = listRes.data.data.lstSite;

    const siteDetail = await siteService.getDetailSite({
        id: listSite[0].ms_id,
        cate: 14,
        location: '',
        slug: '1-on-1-training',
    });

    const data = siteDetail.data.data;

    return { props: { data, listSite }, revalidate: Constants.REVALIDATE };
}

export default OneTraining;
