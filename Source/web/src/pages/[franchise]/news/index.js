import isEmpty from 'lodash/isEmpty';
import React from 'react';
import siteService from 'src/services/siteService';
import dynamic from 'next/dynamic';
const CategoryNews = dynamic(() => import('src/components/CategoryNews'));

const SiteNews = (props) => {
    return <CategoryNews listSite={props.listSite} data={props.data} />;
};

export async function getServerSideProps(ctx) {
    const listRes = await siteService.getListSite();
    const listSite = listRes.data.data.lstSite;

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
            props: { data: { ...req.data.data, isFranchise: true }, listSite },
        };
    }

    return { notFound: true };
}

// SiteNews.propTypes = propTypes;
export default SiteNews;
