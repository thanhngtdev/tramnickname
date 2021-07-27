/* eslint-disable no-undef */
import AboutUs from 'src/components/Camp/AboutUs';
import BirthdayExtra from 'src/components/Camp/BirthdayExtra';
import BirthdayPackage from 'src/components/Camp/BirthdayPackage';
import FootballSkill from 'src/components/Camp/FootballSkill';
import QNA from 'src/components/Camp/QNA';
import Gallery from 'src/components/Homepage/ImageGallery.js';
import Testimonial from 'src/components/Testimonial';
import DefaultLayout from 'src/layout/DefaultLayout';
import BookTrialParty from 'src/pages/birthday-parties/components/BookTrialParty';
import React, { useEffect, useRef, useState } from 'react';
import siteService from 'src/services/siteService';
import Quote from 'src/components/Quote';
import saveList from 'src/hooks/useSaveList';
import { isEmpty } from 'lodash';
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
        <DefaultLayout>
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
                <FootballSkill data={data?.skillGain || {}} />
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
//             cate: 15,
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
        cate: 15,
    });

    const data = siteDetail.data.data;

    return { props: { data, listSite } };
}

export default BirthdayParty;
