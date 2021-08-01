import PathRoute from 'src/common/PathRoute';
import Utils from 'src/common/Utils';
import DefaultLayout from 'src/layout/DefaultLayout';
import { snakeCase } from 'lodash';
import Link from 'next/link';
import React, { useRef } from 'react';
import siteService from 'src/services/siteService';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import parse from 'html-react-parser';
import useEqualElement from 'src/hooks/useEqualElement';

function Policy({ data }) {
    const refListItem = useRef(null);

    useEqualElement(refListItem);

    return (
        <DefaultLayout seoMeta={data.seoMeta}>
            <div className="about-us">
                <div className="row">
                    <div className="col-6">
                        <p></p>
                    </div>
                    <div className="col-6" style={{ paddingLeft: 0 }}>
                        <LazyLoadImage
                            alt=""
                            src={'static-file/images/image_about.png'}
                        />
                    </div>
                </div>
                <div className="about-us-content">
                    <div className="container">
                        <h1
                            className="contact-header"
                            // style={{ maxWidth: '50%' }}
                        >
                            {data.cfg_title}
                        </h1>
                    </div>
                    <div className="container">
                        <div className="get-in-touch box">
                            <div className="list-form about">
                                <p className="pro-text">{data.cfg_des}</p>

                                {parse(data.cfg_content)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container our-policies">
                <h2 className="heading-w">Our Policies</h2>
                <p className="text-1">
                    Select a card to view our company policies
                </p>
            </div>

            <div className="container">
                <div className="list-item-card-2" style={{ marginTop: 0 }}>
                    <div className="row" ref={refListItem}>
                        {data.cfg_value &&
                            data.cfg_value.map((item, index) => (
                                <div
                                    key={index}
                                    className="col-6"
                                    style={{ marginBottom: 60 }}>
                                    <div className="item">
                                        <LazyLoadImage
                                            alt=""
                                            src={Utils.getThumb(item.icon)}
                                            className="img"
                                        />
                                        <h3 className="title">{item.title}</h3>
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
        </DefaultLayout>
    );
}

export async function getServerSideProps() {
    const policyRes = await siteService.getPolicy();
    const data = policyRes.data.data;

    return { props: { data } };
}

export default Policy;
