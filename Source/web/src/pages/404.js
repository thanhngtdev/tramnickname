import DefaultLayout from '../layout/DefaultLayout';
import React from 'react';
import ErrorPage from '../components/Error';

function Custom404() {
    return (
        <DefaultLayout>
            <ErrorPage />
        </DefaultLayout>
    );
}

export default Custom404;
