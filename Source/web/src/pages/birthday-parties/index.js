/* eslint-disable no-undef */
import React, { useRef, useState } from 'react';
import dynamic from 'next/dynamic';
const AboutUs = dynamic(() => import('src/components/Camp/AboutUs'));
const BirthdayExtra = dynamic(() =>
    import('src/components/Camp/BirthdayExtra'),
);
const BirthdayPackage = dynamic(() =>
    import('src/components/Camp/BirthdayPackage'),
);
const FootballSkill = dynamic(() =>
    import('src/components/Camp/FootballSkill'),
);
const QNA = dynamic(() => import('src/components/Camp/QNA'));
const Gallery = dynamic(() => import('src/components/HomePage/Gallery'));
const Quote = dynamic(() => import('src/components/Quote'));
const Testimonial = dynamic(() => import('src/components/Testimonial'));
const BookTrialParty = dynamic(() =>
    import(
        '../../components/birthday-partiesComponents/components/BookTrialParty'
    ),
);
const DefaultLayout = dynamic(() => import('src/layout/DefaultLayout'));

import saveList from 'src/hooks/useSaveList';
import siteService from 'src/services/siteService';
// import Spinner from "component/Spinner";

function BirthdayParty({ data, listSite }) {
    //! state
    const [preferedPackage, setPreferedPackage] = useState('');
    const ref = useRef();

    //! useEffect
    saveList(listSite);
    //! function
    //scroll to enquire section when book button clicked
    function handleScroll() {
        window.scrollTo({
            top: ref.current.offsetTop,
            behavior: 'smooth',
        });
    }

    //set prefered package when book button clicked
    function clickPreferedButton(packageTitle) {
        // console.log(packageTitle, 'packageTitle');
        setPreferedPackage(packageTitle);
    }

    return (
        <DefaultLayout seo={data?.seoMeta || {}}>
            <AboutUs data={data?.about || {}} />
            <div className="qoute-birthday">
                <Quote data={data?.about2 || {}} />
            </div>

            <div className="birthday-review">
                <Testimonial
                    data={data?.testimonial || {}}
                    textColor={'white'}
                />
            </div>
            <div className="football-birthday">
                <FootballSkill noTitle data={data?.keyElement || {}} />
            </div>

            <BirthdayPackage
                onClick={(preferedPackage) => {
                    handleScroll();
                    clickPreferedButton(preferedPackage);
                }}
                data={data?.package || {}}
            />

            <BirthdayExtra
                partyInclude={data?.partyInclude || {}}
                partyOptional={data?.partyOptional || {}}
            />

            <div className="birthday-booking">
                <BookTrialParty
                    ref={ref}
                    parentFb={data?.parentFb || {}}
                    package={data?.package || {}}
                    preferedPackage={preferedPackage}
                    listSite={listSite || []}
                />
            </div>

            <div className="birthday-gallery">
                <Gallery
                    title={
                        'Check out some snaps from our previous Football Birthday Parties'
                    }
                    gallery={data?.gallery || {}}
                    gallery2={data?.gallery2 || {}}
                />
            </div>
            <div className="faq-birthday">
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
        cate: 15,
        location: '',
        slug: 'birthday-parties',
    });

    const data = siteDetail.data.data;

    return {
        props: { data, listSite },
        // revalidate: Constants.REVALIDATE
    };
}

export default BirthdayParty;
