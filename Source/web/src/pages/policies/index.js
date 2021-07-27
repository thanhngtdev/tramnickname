import PathRoute from '../../common/PathRoute';
import Utils from '../../common/Utils';
import DefaultLayout from 'layout/DefaultLayout';
import { snakeCase } from 'lodash';
import Link from 'next/link';
import React, { useRef } from 'react';
import siteService from 'services/siteService';

function Policy({ data }) {
    const refListItem = useRef(null);

    return (
        <DefaultLayout seoMeta={data.seoMeta}>
            <div className="about-us" style={{ backgroundColor: 'white' }}>
                <div className="row">
                    <div className="col-6">
                        <p></p>
                    </div>
                    <div className="col-6" style={{ paddingLeft: 0 }}>
                        <img alt="" src={'static/images/image_about.png'} />
                    </div>
                </div>
                <div
                    style={{
                        position: 'absolute',
                        top: 50,
                        width: '100%',
                    }}>
                    <div className="container">
                        <h1
                            className="contact-header"
                            style={{ maxWidth: '50%' }}>
                            {data.cfg_title}
                        </h1>
                    </div>
                    <div className="container">
                        <div className="get-in-touch">
                            <div className="list-form about">
                                <p className="pro-text">{data.cfg_des}</p>
                                <p
                                    className="pro-sub-text"
                                    dangerouslySetInnerHTML={{
                                        __html: data.cfg_content,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ clear: 'both' }} />
                <div className="container our-policies">
                    <h2 className="heading-w">Our Policies</h2>
                    <p className="text-1">
                        Select a card to view our company policies
                    </p>
                </div>

                <div className="container">
                    <div className="list-item-card-2" style={{ marginTop: 0 }}>
                        <div className="row items" ref={refListItem}>
                            {data.cfg_value &&
                                data.cfg_value.map((item, index) => (
                                    <div
                                        key={index}
                                        className="col-6"
                                        style={{ marginBottom: 60 }}>
                                        <div className="item">
                                            <img
                                                alt=""
                                                src={Utils.getThumb(item.icon)}
                                                className="img"
                                            />
                                            <h3 className="title">
                                                {item.title}
                                            </h3>
                                            <p className="description">
                                                {item.des}
                                            </p>
                                            <Link
                                                href={`${
                                                    PathRoute.Policy
                                                }/${snakeCase(item.title)}`}
                                                passHref>
                                                <a className="more">
                                                    MORE INFORMATION
                                                </a>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
                <div style={{ height: 120 }} />
            </div>
        </DefaultLayout>
    );
}

export async function getServerSideProps() {
    const policyRes = await siteService.getPolicy();
    const data = policyRes.data.data;

    return { props: { data } };
}

export default Policy;
