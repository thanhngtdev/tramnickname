import isEmpty from 'lodash/isEmpty';
import React, { useEffect } from 'react';
import Utils from 'src/common/Utils';
import saveList from 'src/hooks/useSaveList';
import dynamic from 'next/dynamic';

const AboutInfoCamp = dynamic(() =>
    import('src/components/Camp/AboutInfoCamp'),
);
const AboutSecure = dynamic(() => import('src/components/Camp/AboutSecure'));
const AboutUs = dynamic(() => import('src/components/Camp/AboutUs'));
const CampInclude = dynamic(() => import('src/components/Camp/CampInclude'));
const FootballSkill = dynamic(() =>
    import('src/components/Camp/FootballSkill'),
);
const InstaBox = dynamic(() => import('src/components/Camp/InstaBox'));
const QNA = dynamic(() => import('src/components/Camp/QNA'));
const WhyWMF = dynamic(() => import('src/components/Camp/WhyWMF'));
const Testimonial = dynamic(() => import('src/components/Testimonial'));
const DefaultLayout = dynamic(() => import('src/layout/DefaultLayout'));
const BookTrialHoliday = dynamic(() =>
    import(
        'src/components/holiday-camps-homeComponents/components/BookTrialHoliday'
    ),
);

function HolidayCamp({ data, listSite }) {
    saveList(listSite);

    console.log(data, ' data');

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

    if (isEmpty(props.data)) return { notFound: true };

    return { props };
}

export default HolidayCamp;
