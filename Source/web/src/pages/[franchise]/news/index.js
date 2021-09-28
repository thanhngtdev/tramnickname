import { isEmpty } from 'lodash';
import React from 'react';
import siteService from 'src/services/siteService';
import CategoryNews from 'src/components/CategoryNews';
const propTypes = {};

const SiteNews = (props) => {
    //! State

    //! Function

    //! Render
    return <CategoryNews listSite={props.listSite} data={props.data} />;
};

export async function getServerSideProps(ctx) {
    const listRes = await siteService.getListSite();
    const listSite = listRes.data.data.lstSite;

    const item = listSite.find((item) => ctx.query.franchise === item.ms_alias);
    if (isEmpty(item)) {
        return { props: { data: {}, listSite } };
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

    return { props: { data: {}, listSite } };
}

SiteNews.propTypes = propTypes;
export default SiteNews;
