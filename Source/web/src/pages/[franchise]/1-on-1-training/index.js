import { isEmpty } from 'lodash';
import React, { useEffect, useRef } from 'react';
import { Button } from 'react-bootstrap';
import Utils from 'src/common/Utils';
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
                <AboutUs data={data?.about || {}} site={data.site} />
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

            <Provide site={data.site || {}} provide={data?.whoProvider} />

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
                <WhyWMF data={data?.whyWMF || {}} site={data.site} />
            </div>
            <div className="booking-weekly">
                <BookTrialOne
                    _ref={enquireBox}
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
        14,
        '1-on-1-training',
    );
    return { props };
}
