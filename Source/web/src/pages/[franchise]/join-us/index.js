import parse from 'html-react-parser';
import isEmpty from 'lodash/isEmpty';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import PathRoute from 'src/common/PathRoute';
import Utils from 'src/common/Utils';
import useEqualElement from 'src/hooks/useEqualElement';
import useGetWidth from 'src/hooks/useGetWidth';
import saveList from 'src/hooks/useSaveList';

const AboutSecure = dynamic(() => import('src/components/Camp/AboutSecure'));
const Intro = dynamic(() => import('src/components/HomePage/Intro.js'));
const JoinUsBanner = dynamic(() => import('src/components/JoinUsBanner'));
const Testimonial = dynamic(() => import('src/components/Testimonial'));
const DefaultLayout = dynamic(() => import('src/layout/DefaultLayout'));

const ROUTE = [PathRoute.Coaching, PathRoute.ParentHost];

function JoinUs({ data, listSite }) {
    // console.log(data, 'data');
    //! state
    const refListItem = useRef(null);
    const [content, setContent] = useState(data.boxesFranchise.cfg_content);
    const getWidth = useGetWidth();
    const franchiseBox = useRef(null);
    //! useEffect
    saveList(listSite);
    useEqualElement(refListItem);
    useEffect(() => {
        if (isEmpty(data)) {
            window.location.href = '/404';
        }
    }, []);

    //! render
    if (isEmpty(data)) return <> </>;

    return (
        <DefaultLayout seo={data?.seoMetaFranchise || {}}>
            <div className="bannerBox-joinus">
                <JoinUsBanner
                    click={() => {
                        franchiseBox.current.scrollIntoView({
                            behavior: 'smooth',
                        });
                    }}
                    data={data?.about || {}}
                />
            </div>
            <div className="intro-joinus">
                <Intro intro={data?.trainingIntro?.cfg_value || []} />
            </div>

            <div className="about-type-joinus">
                {data?.skillGain && (
                    <div className="about-type" ref={franchiseBox}>
                        <div className="container">
                            <h2
                                className="heading-w"
                                style={{
                                    // maxWidth: '800px',
                                    marginRight: 'auto',
                                    marginLeft: 'auto',
                                }}>
                                {data?.skillGain?.cfg_title}
                            </h2>
                            <p className="text-1">{data?.skillGain?.cfg_des}</p>
                        </div>

                        <div className="type-anchor">
                            <div className="container">
                                <div className="list-item-card-2">
                                    <div className="row" ref={refListItem}>
                                        {data?.skillGain?.cfg_value &&
                                            data?.skillGain?.cfg_value.map(
                                                (item, index) => (
                                                    <div
                                                        key={index}
                                                        className="col-6">
                                                        <div className="item">
                                                            <img
                                                                loading="lazy"
                                                                alt=""
                                                                src={Utils.getThumb(
                                                                    item.icon,
                                                                )}
                                                                className="img"
                                                            />
                                                            <h3 className="title">
                                                                {item.title ||
                                                                    ''}
                                                            </h3>
                                                            <p
                                                                className="description"
                                                                dangerouslySetInnerHTML={{
                                                                    __html:
                                                                        item.des ||
                                                                        '',
                                                                }}></p>
                                                            <Link
                                                                href={
                                                                    ROUTE[index]
                                                                }
                                                                passHref>
                                                                <a
                                                                    className="more more-joinus"
                                                                    style={{
                                                                        width: '100%',
                                                                    }}>
                                                                    {getWidth >
                                                                    1000
                                                                        ? 'Complete an application here'
                                                                        : 'Complete an application'}
                                                                </a>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                ),
                                            )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <Testimonial
                data={data?.testimonial}
                style={'change-color'}
                textColor={'orange'}
            />

            <div className="about-coach-joinus">
                {data?.boxesFranchise && (
                    <div className="about-coach">
                        <div className="container">
                            <h2>{data?.boxesFranchise?.cfg_title}</h2>
                            <div className="right">
                                {parse(data.boxesFranchise.cfg_content)}
                                <a
                                    href="https://franchisewmf.com/"
                                    target="_blank"
                                    className="btn-right">
                                    {
                                        data?.boxesFranchise?.cfg_buttons[0]
                                            ?.title
                                    }
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="about-secure-joinus">
                <AboutSecure data={data?.boxesFranchise || {}} />
            </div>

            {data?.blockEnquireAbout && (
                <div className="container enquire-joinus">
                    <div className="enquire">
                        <h4
                            style={{
                                fontSize: 45,
                                margin: '0 auto',
                                maxWidth: 700,
                            }}>
                            {data?.blockEnquireAbout?.cfg_title}
                        </h4>
                        <div style={{ marginBottom: '3rem' }}>
                            {parse(data?.blockEnquireAbout?.cfg_content)}
                        </div>
                        <a
                            href="https://franchisewmf.com/"
                            style={{
                                backgroundColor: 'white',
                                color: '#FF7531',
                                borderRadius: 6,
                                boxShadow: 'none',
                                border: 'none',
                                padding: '1.5rem 3rem',
                                textTransform: 'uppercase',
                            }}>
                            {data?.blockEnquireAbout?.cfg_buttons[0]?.title}
                        </a>
                    </div>
                </div>
            )}
        </DefaultLayout>
    );
}

export async function getServerSideProps(context) {
    const props = await Utils.getDetailMicrosite(
        context.params.franchise,
        22,
        'join-us',
    );

    if (isEmpty(props.data)) return { notFound: true };

    return { props };
}

export default JoinUs;
