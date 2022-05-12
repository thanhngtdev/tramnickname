import isEmpty from 'lodash/isEmpty';
import React from 'react';
import siteService from 'src/services/siteService';
import dynamic from 'next/dynamic';
const CategoryNews = dynamic(() => import('src/components/CategoryNews'));
const DefaultLayout = dynamic(() => import('src/layout/DefaultLayout'));
const SiteNews = (props) => {
    console.log(props, 'props');
   

    return (
        <DefaultLayout seo={data?.seoMetaFranchise || {}}>
    <CategoryNews listSite={props.listSite} data={props.data} />
    </DefaultLayout>
    );
};

export async function getServerSideProps(ctx) {
    const listRes = await siteService.getListSite();
    const listSite = listRes.data.data.lstSite;
    const microSite = await Utils.getDetailMicrosite(
        context.params.franchise,
        18,
        'news',
    );
    const item = listSite.find((item) => ctx.query.franchise === item.ms_alias);
    if (isEmpty(item)) {
        return { notFound: true };
    }

    const req = await siteService.getListNews({
        cate: '',
        page: 1,
        alias: ctx.query.franchise,
    });

    if (req.data.status === 200) {
        return {
            props: { data: { ...req.data.data, isFranchise: true, microSite }, listSite },
        };
    }

    return { notFound: true };
}

// SiteNews.propTypes = propTypes;
export default SiteNews;
