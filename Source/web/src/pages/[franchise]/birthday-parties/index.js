/* eslint-disable no-undef */
import { isEmpty } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import Utils from 'src/common/Utils';
import BookTrialParty from 'src/components/birthday-partiesComponents/components/BookTrialParty';
import AboutUs from 'src/components/Camp/AboutUs';
import BirthdayExtra from 'src/components/Camp/BirthdayExtra';
import BirthdayPackage from 'src/components/Camp/BirthdayPackage';
import FootballSkill from 'src/components/Camp/FootballSkill';
import QNA from 'src/components/Camp/QNA';
import Gallery from 'src/components/HomePage/Gallery';
import Quote from 'src/components/Quote';
import Testimonial from 'src/components/Testimonial';
import saveList from 'src/hooks/useSaveList';
import DefaultLayout from 'src/layout/DefaultLayout';
// import Spinner from "component/Spinner";

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
