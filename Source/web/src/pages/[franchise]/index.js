import isEmpty from 'lodash/isEmpty';
import dynamic from 'next/dynamic';
import React, { useEffect } from 'react';

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
import siteService from 'src/services/siteService';

function Franchise({ data, listSite, isSubPage }) {
    console.log(data, 'data');

    saveList(listSite);

    useEffect(() => {
        if (isEmpty(data)) {
            window.location.href = '/404';
        }
    }, []);

    console.log(isSubPage, 'subpage');

    if (isEmpty(data)) return <></>;
    return (
        <DefaultLayout seo={data?.seoMetaFranchise || {}}>
            <div className="banner-franchise">
                <BannerTop
                    social={data?.site?.socialLink || []}
                    site={data?.site || {}}
                />
                <Contact
                    social={data?.site?.socialLink || []}
                    site={data?.site || {}}
                />
            </div>
            <div className="coaching-franchise">
                <CoachInfo coach={data?.coach || {}} />
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
            <div className="franchise-servive">
                <TrainingService
                    site={data?.site || {}}
                    service={data?.service || {}}
                />
            </div>
            <div className="franchise-reason">
                <TrainingReason
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
                site={data?.site || {}}
                article={data?.article || {}}
            />
        </DefaultLayout>
    );
}

export async function getServerSideProps(context) {
    const listRes = await siteService.getListSite();
    const listSite = listRes.data.data.lstSite;

    // const item = listSite.find(
    //     (item) => context.params.franchise === item.ms_alias,
    // );

    // if (isEmpty(item)) {
    //     return { props: { data: [], listSite } };
    // }

    let id = '';
    let isSubPage = false;
    const item = listSite.find((item) => {
        if (item.ms_alias === context.params.franchise) {
            id = item.ms_id;
            return item;
        }

        return item.sub_page.find((i) => {
            if (i.sub_alias === context.params.franchise) {
                id = i.sub_id;
                isSubPage = true;
                return i;
            }
        });
    });

    if (!isEmpty(item)) {
        const siteDetail = await siteService.getFranchiseDetail({
            id: item.ms_id,
            isSubpage: isSubPage,
            subPage: id,
            slug: 'location',
        });

        const data = siteDetail.data.data;
        return { props: { data, listSite, isSubPage } };
    }

    return { props: { data: [], listSite, isSubPage } };
}

export default Franchise;
