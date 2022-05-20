import DefaultLayout from '../layout/DefaultLayout';
import React, { useEffect } from 'react';
import ErrorPage from '../components/Error';
import siteService from 'src/services/siteService';
import { useDispatch } from 'react-redux';
import { saveListSite } from 'src/redux/actions/ListActions';

function Custom404() {
    const dispatch = useDispatch();

    useEffect(() => {
        const getList = async () => {
            try {
                const listRes = await siteService.getListSite();
                const listSite = listRes?.data?.data?.lstSite;
                listSite && dispatch(saveListSite(listSite));
            } catch (error) {
                console.log(error, 'error');
            }
        };

        getList();
    }, []);

    return (
        <DefaultLayout>
            <ErrorPage />
        </DefaultLayout>
    );
}

export default Custom404;
