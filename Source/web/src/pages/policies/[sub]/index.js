import PathRoute from '../../common/PathRoute';
import BorderButton from 'components/include/BorderButton';
import DefaultLayout from 'layout/DefaultLayout';
// import "css/policies.css";
import { isEmpty, snakeCase } from 'lodash';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import siteService from 'services/siteService';
import Error from 'next/error';

function Policy({ data }) {
    const router = useRouter();
    const { sub } = router.query;
    // const elementFounded = (data?.cfg_value).find(
    //   (el) => snakeCase(el.title) === snakeCase(sub)
    // );

    // if (isEmpty(elementFounded)) {
    //   router.push("404");
    //   return null;
    // }

    return (
        <DefaultLayout>
            <div
                className="container"
                style={{ marginTop: 130, marginBottom: 40 }}>
                <Link href={PathRoute.Policy}>
                    <a>
                        <BorderButton title="View all policies" />
                    </a>
                </Link>
                <div
                    dangerouslySetInnerHTML={
                        data && {
                            __html: data.content,
                        }
                    }
                />
            </div>
        </DefaultLayout>
    );
}

export async function getServerSideProps(context) {
    // console.log(context);
    const { sub } = context.params;
    const policyRes = await siteService.getPolicy();
    const data = policyRes.data.data;

    const item = (data?.cfg_value).find(
        (el) => snakeCase(el.title) === snakeCase(sub),
    );

    // if (!item) {
    //   return {
    //     redirect: {
    //       destination: `/`,
    //       statusCode: 303,
    //     },
    //   };
    // }

    return { props: { data: item } };
}

export default Policy;
