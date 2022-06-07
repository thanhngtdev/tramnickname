import isEmpty from 'lodash/isEmpty';
import dynamic from 'next/dynamic';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
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
import getLocalStorage from 'src/hooks/useGetLocalStorage';

function Franchise({ data, listSite, isSubPage, item }) {
    const dispatch = useDispatch();
    const router = useRouter();
    const targetRef = useRef(null);
    const defaultAcademy = getLocalStorage();

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
        // setShowSelect(!showSelect);
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

    const isShowBooking =
        isEmpty(defaultAcademy) || defaultAcademy?.ms_use_typeform !== 1;

    if (isEmpty(data)) return <></>;
    return (
        <DefaultLayout seo={data?.seoMetaFranchise || {}}>
            <div className="banner-franchise">
                <BannerTop
                    social={data?.site?.socialLink || []}
                    site={data?.site || {}}
                    masterData={data?.masterData || {}}
                    isSubPage={isSubPage}
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
            {isShowBooking && (
                <BookTrial parentFb={data?.parentFb} site={data?.site} />
            )}

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
        return { props: { data, listSite, isSubPage, item } };
    }

    return { notFound: true };
}

export default Franchise;
