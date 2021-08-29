import { isEmpty } from 'lodash';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import BookTrial from 'src/components/Booking/BookTrial';
import QNA from 'src/components/Camp/QNA';
import Intro from 'src/components/HomePage/Intro.js';
import Testimonial from 'src/components/Testimonial';
import saveList from 'src/hooks/useSaveList';
import DefaultLayout from 'src/layout/DefaultLayout';
import siteService from 'src/services/siteService';
import BannerTop from '../../components/FranchiseComponents/components/BannerTop';
import CoachInfo from '../../components/FranchiseComponents/components/CoachInfo';
import CoachTeam from '../../components/FranchiseComponents/components/CoachTeam';
import RelateAreas from '../../components/FranchiseComponents/components/RelateAreas';
import TrainingReason from '../../components/FranchiseComponents/components/TrainingReason';
import TrainingService from '../../components/FranchiseComponents/components/TrainingService';

function Franchise({ data, listSite }) {
    saveList(listSite);
    useEffect(() => {
        if (isEmpty(data)) {
            window.location.href = '/404';
            //
        }
    }, []);

    if (isEmpty(data)) return <></>;
    return (
        <DefaultLayout seo={data.seoMeta}>
            <div className="banner-franchise">
                <BannerTop
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
                <TrainingReason reason={data?.footballBegining || {}} />
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

// export async function getStaticPaths() {
//     const res = await siteService.getListSite();
//     const list = res.data.data.lstSite;

//     // Get the paths we want to pre-render based on posts
//     const paths = list.map((item) => ({
//         params: { franchise: item.ms_alias, item: item },
//     }));

//     return { paths, fallback: false };
// }

// export async function getStaticProps(ctx) {
//     console.log(ctx);
//     const { params } = ctx;
//     const res = await siteService.getListSite();
//     let listSite = res.data.data.lstSite;

//     const item = listSite.find((item) => params.franchise === item.ms_alias);

//     const dataRes = await siteService.getFranchiseDetail({ id: item.ms_id });

//     return {
//         props: { data: dataRes.data.data, listSite },
//     };
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

    const siteDetail = await siteService.getFranchiseDetail({ id: item.ms_id });
    const data = siteDetail.data.data;

    return { props: { data, listSite } };
}

export default Franchise;
