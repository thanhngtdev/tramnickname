import isEmpty from 'lodash/isEmpty';
import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import siteService from 'src/services/siteService';

const CategoryNews = dynamic(() => import('src/components/CategoryNews'));
const Detail = dynamic(() => import('src/components/DetailNews'));

const propTypes = {};

const DetailNews = ({ listSite, data, isCategory }) => {
    // console.log(data, isCategory, 'data');

    useEffect(() => {
        if (isEmpty(data)) {
            window.location.href = '/404';
        }
    }, []);

    if (isEmpty(data)) return <></>;

    if (isCategory) {
        return <CategoryNews listSite={listSite} data={data} />;
    }

    return <Detail listSite={listSite} data={data} />;
};

export async function getServerSideProps(ctx) {
    const req = await siteService.getListNews({ cate: '', page: 1, alias: '' });
    const listCate = req.data.data.lstCate;

    const check = listCate.find(
        (item) => item.cate_alias === ctx.query.category,
    );

    const isCategory = !isEmpty(check);

    if (!isCategory) {
        // return { props: { listSite: [], data: {} } };
        const listRes = await siteService.getListSite();
        const listSite = listRes.data.data.lstSite;

        const arr = ctx.query.category.split('-');
        const id = arr[arr.length - 1];

        //check id
        if (!isNaN(id)) {
            try {
                const req = await siteService.getDetailNews({ id });
                if (!isEmpty(req?.data.data)) {
                    return {
                        props: { listSite, data: req?.data.data, isCategory },
                    };
                }
            } catch (error) {
                return { props: { listSite, data: {}, isCategory } };
            }
        }

        return { props: { listSite, data: {}, isCategory } };
    }

    return await Promise.all([
        siteService.getListSite(),
        siteService.getListNews({
            cate: check.cate_id,
            page: 1,
            alias: '',
        }),
    ]).then((values) => {
        if (values[0] && values[1]) {
            return {
                props: {
                    listSite: values[0].data.data.lstSite,
                    data: { ...values[1].data.data, categoryId: check.cate_id },
                    isCategory,
                },
            };
        }
        return { props: { listSite: [], data: {}, isCategory } };
    });
}

DetailNews.propTypes = propTypes;
export default DetailNews;
