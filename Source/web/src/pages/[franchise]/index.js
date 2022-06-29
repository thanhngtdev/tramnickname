import isEmpty from 'lodash/isEmpty';
import dynamic from 'next/dynamic';
import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

const BookTrial = dynamic(() => import('src/components/Booking/BookTrial'));
const QNA = dynamic(() => import('src/components/Camp/QNA'));
const BannerTop = dynamic(() =>
    import('src/components/FranchiseComponents/components/BannerTop'),
);
const CoachInfo = dynamic(() =>
    import('src/components/FranchiseComponents/components/CoachInfo'),
);
const CoachTeam = dynamic(() =>
    import('src/components/FranchiseComponents/components/CoachTeam'),
);
const Contact = dynamic(() =>
    import('src/components/FranchiseComponents/components/Contact'),
);
const RelateAreas = dynamic(() =>
    import('src/components/FranchiseComponents/components/RelateAreas'),
);
const TrainingReason = dynamic(() =>
    import('src/components/FranchiseComponents/components/TrainingReason'),
);
const TrainingService = dynamic(() =>
    import('src/components/FranchiseComponents/components/TrainingService'),
);
const Intro = dynamic(() => import('src/components/HomePage/Intro.js'));
const Testimonial = dynamic(() => import('src/components/Testimonial'));
const DefaultLayout = dynamic(() => import('src/layout/DefaultLayout'));

import saveList from 'src/hooks/useSaveList';
import { getHome } from 'src/redux/actions/homeAction';
import siteService from 'src/services/siteService';
import { useRef } from 'react';
import useGetWidth from 'src/hooks/useGetWidth';
import useTruspilot from 'src/hooks/useTruspilot';
import Script from 'next/script';


function Franchise({ dataBannerTop, data, listSite, isSubPage, item }) {
    const dispatch = useDispatch();
    const router = useRouter();
    const targetRef = useRef(null);
    const { defaultTypeform } = useSelector((state) => state.homeReducer);
    console.log('data',data);
    useTruspilot()
    const isMobile = useGetWidth() <= 768;
    

    saveList(listSite);

    useEffect(() => {
        if (isEmpty(data)) {
            window.location.href = '/404';
        }

        dispatch(getHome());
    }, []);

    useEffect(() => {
        const split = router.asPath.split('#');

        if (split?.[1] === 'training-services') {
            targetRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        }
    }, [targetRef]);

    const onClickLocation = async (item, trainingService = false) => {
        try {
            const res = await siteService.getDetailSite({ id: item.value });
            if (res.data.status == 200) {
                const item = res.data?.data?.site || {};
                localStorage.setItem('defaultAcademy', JSON.stringify(item));
                window.location.href = `${'/' + item.ms_alias}${
                    trainingService ? '#training-services' : ''
                }`;
            }
        } catch (error) {
            console.log(error);
        }
    };

    if (isEmpty(data)) return <></>;
    return (
        <DefaultLayout seo={data?.seoMetaFranchise || {}}>
            <Script
                src="//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
                // strategy=""
            />  
            {isMobile && <div className="banner-franchise">
                    <BannerTop
                        social={data?.site?.socialLink || []}
                        site={data?.site || {}}
                        masterData={data?.masterData || {}}
                        isSubPage={isSubPage}
                        isHeader={true}
                    />
                </div>}
            {isMobile && 
                <div className="trustpilot-franchise" style={{marginTop:'5rem',marginBottom:'5rem'}}>
                    <div
                        className="trustpilot-widget truspilot-big"
                        data-locale="en-GB"
                        data-template-id="53aa8807dec7e10d38f59f32"
                        data-businessunit-id="5630b23d0000ff000584db47"
                        // data-style-height="200px"
                        data-style-width="100%"
                        style={{width:'100%'}}
                        data-theme="light">
                        <a
                            href="https://uk.trustpilot.com/review/wemakefootballers.com"
                            target="_blank"
                            rel="noopener">
                            Trustpilot
                        </a>
                    </div>
                </div>}
            {isMobile &&
            <div id="training-services" className="franchise-servive">
                <TrainingService
                    onClickLocation={onClickLocation}
                    site={data?.site || {}}
                    service={data?.service || {}}
                    isHeader={true}
                    // targetRef={targetRef}
                />
            </div>}

            <div className="banner-franchise">
                <BannerTop
                    social={data?.site?.socialLink || []}
                    site={data?.site || {}}
                    masterData={data?.masterData || {}}
                    isSubPage={isSubPage}
                    dataBannerTop={dataBannerTop}
                />
                <Contact
                    onClickLocation={onClickLocation}
                    social={data?.site?.socialLink || []}
                    site={data?.site || {}}
                />
            </div>

            <div id="training-services" className="franchise-servive">
                <TrainingService
                    onClickLocation={onClickLocation}
                    site={data?.site || {}}
                    service={data?.service || {}}
                    // targetRef={targetRef}
                />
            </div>

            <div className="coaching-franchise " style={{ marginTop: '200px' }}>
                <CoachInfo
                    coach={data?.coach || {}}
                    site={data?.site || {}}
                    isSubPage={isSubPage}
                />
            </div>

            <div className="franchise-review">
                <div className="intro-franchise">
                    <Intro
                        intro={data?.homeIntro?.cfg_value || []}
                        site={data?.site}
                        weeklyCost={data?.site?.weeklyCost}
                        minWeeklyCost={data?.site?.minWeeklyCost}
                    />
                </div>
                <Testimonial
                    data={data.testimonial || []}
                    style={{}}
                    textColor={'white'}
                />
            </div>

            <div className="franchise-reason">
                <TrainingReason
                    targetRef={targetRef}
                    reason={data?.footballBegining || {}}
                    site={data?.site || {}}
                />
            </div>
            <CoachTeam
                staff={data?.coach?.staff || []}
                site={data?.site || {}}
            />

            <BookTrial parentFb={data?.parentFb} site={data?.site} />

            <div className="faq-weekly">
                <QNA data={data?.faq || []} />
            </div>
            <RelateAreas
                onClickLocation={onClickLocation}
                site={data?.site || {}}
                listSite={listSite || []}
                article={data?.article || {}}
            />
        </DefaultLayout>
    );
}

export async function getServerSideProps(context) {
    const listRes = await siteService.getListSite();
    const listSite = listRes.data.data.lstSite;
    const siteHighlight = await siteService.getDetailSite({
        slug: 'weekly-training',
    });

    debugger;

    const dataBannerTop = siteHighlight.data.data;
    let id = '';
    let isSubPage = false;
    let item = listSite.find((item) => {
        if (item.ms_alias === context.params.franchise) {
            id = item.ms_id;
            return item;
        }
    });

    if (isEmpty(item)) {
        item = listSite.find((item) => {
            return item.sub_page.find((i) => {
                if (i.sub_alias === context.params.franchise) {
                    id = i.sub_id;
                    isSubPage = true;
                    return i;
                }
            });
        });
    }

    if (!isEmpty(item)) {
        const siteDetail = await siteService.getFranchiseDetail({
            id: item.ms_id,
            isSubpage: isSubPage,
            subPage: id,
            slug: 'location-landing',
        });

        const data = siteDetail.data.data;
        return { props: { data, listSite, isSubPage, item, dataBannerTop } };
    }

    return { notFound: true };
}

export default Franchise;
