import React from 'react';
import siteService from 'src/services/siteService';
import CategoryNews from 'src/components/CategoryNews';

function News({ listSite, data }) {
    return <CategoryNews listSite={listSite} data={data} />;
}

export async function getServerSideProps(ctx) {
    return await Promise.all([
        siteService.getListSite(),
        siteService.getListNews({ cate: '', page: 1, alias: '' }),
    ]).then((values) => {
        if (values[0] && values[1]) {
            return {
                props: {
                    listSite: values[0].data.data.lstSite,
                    data: values[1].data.data,
                },
            };
        }
        return { props: { listSite: [], data: {} } };
    });
}

export default News;
