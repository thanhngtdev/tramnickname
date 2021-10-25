/* eslint-disable no-undef */
import isEmpty from 'lodash/isEmpty';
import dynamic from 'next/dynamic';
import React, { useEffect, useRef, useState } from 'react';
import Utils from 'src/common/Utils';
import saveList from 'src/hooks/useSaveList';

const BookTrialParty = dynamic(() =>
    import(
        'src/components/birthday-partiesComponents/components/BookTrialParty'
    ),
);
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
const DefaultLayout = dynamic(() => import('src/layout/DefaultLayout'));

function BirthdayParty({ data, listSite }) {
    //! state
    const [preferedPackage, setPreferedPackage] = useState('');
    const ref = useRef();

    //! useEffect
    saveList(listSite);
    useEffect(() => {
        if (isEmpty(data)) {
            window.location.href = '/404';
        }
    }, []);
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

    if (isEmpty(data)) return <> </>;

    return (
        <DefaultLayout seo={data?.seoMetaFranchise || {}}>
            <AboutUs data={data?.about || {}} site={data.site} />
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

            <BookTrialParty
                site={data.site}
                ref={ref}
                parentFb={data?.parentFb || {}}
                package={data?.package || {}}
                preferedPackage={preferedPackage}
                listSite={listSite || []}
            />

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

export async function getServerSideProps(context) {
    const props = await Utils.getDetailMicrosite(
        context.params.franchise,
        15,
        'birthday-parties',
    );
    return { props };
}

export default BirthdayParty;
