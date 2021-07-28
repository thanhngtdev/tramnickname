import PathRoute from 'src/common/PathRoute';
import Utils from 'src/common/Utils';
import AboutSecure from 'src/components/Camp/AboutSecure';
import Intro from 'src/components/HomePage/Intro.js';
// import "css/slick-theme.css";
import Testimonial from 'src/components/Testimonial';
import useEqualElement from 'src/hooks/useEqualElement';
import useGetWidth from 'src/hooks/useGetWidth';
import saveList from 'src/hooks/useSaveList';
import parse from 'html-react-parser';
import DefaultLayout from 'src/layout/DefaultLayout';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import siteService from 'src/services/siteService';
import 'slick-carousel/slick/slick.css';
import JoinUsBanner from 'src/components/JoinUsBanner';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const ROUTE = [PathRoute.Coaching, PathRoute.ParentHost];

function JoinUs({ data, listSite }) {
    //! state
    const refListItem = useRef(null);
    const [content, setContent] = useState(data.boxesFranchise.cfg_content);
    const getWidth = useGetWidth();
    const franchiseBox = useRef(null);

    //! useEffect
    saveList(listSite);
    useEqualElement(refListItem);
    //! render
    return (
        <DefaultLayout seo={data.seoMeta}>
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
                                {data.skillGain?.cfg_title}
                            </h2>
                            <p className="text-1">{data.skillGain?.cfg_des}</p>
                        </div>

                        <div className="type-anchor">
                            <div className="container">
                                <div className="list-item-card-2">
                                    <div className="row" ref={refListItem}>
                                        {data?.skillGain?.cfg_value &&
                                            data.skillGain?.cfg_value.map(
                                                (item, index) => (
                                                    <div
                                                        key={index}
                                                        className="col-6">
                                                        <div className="item">
                                                            <LazyLoadImage
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

export async function getServerSideProps() {
    const listRes = await siteService.getListSite();
    const listSite = listRes.data.data.lstSite;

    const siteDetail = await siteService.getDetailSite({
        id: listSite[0].ms_id,
        cate: 22,
    });

    const data = siteDetail.data.data;

    return { props: { data, listSite } };
}

export default JoinUs;
