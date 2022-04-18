import PathRoute from 'src/common/PathRoute';
import BorderButton from 'src/components/include/BorderButton';
// import "css/policies.css";
import snakeCase from 'lodash/snakeCase';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import siteService from 'src/services/siteService';
import dynamic from 'next/dynamic';
import { kebabCase } from 'lodash';
const DefaultLayout = dynamic(() => import('src/layout/DefaultLayout'));

function Policy({ data }) {
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
    const { sub } = context.params;
    const policyRes = await siteService.getPolicy();
    const data = policyRes.data.data;

    const item = (data?.cfg_value).find(
        (el) => kebabCase(el.title.replace('&', 'and')) === sub,
    );
    return { props: { data: item } };
}

export default Policy;
