import AboutSecure from 'src/components/Camp/AboutSecure';
import DefaultLayout from 'src/layout/DefaultLayout';
import React from 'react';
import siteService from 'src/services/siteService';
import AboutGuide from '../../components/AboutComponents/components/AboutGuide';
import AboutType from '../../components/AboutComponents/components/AboutType';
import AboutUsNoVideo from '../../components/AboutComponents/components/AboutUsNoVideo';

function About({ data }) {
    return (
        <DefaultLayout seo={data.seoMeta}>
            <div className="about-us-aboutpage">
                <AboutUsNoVideo data={data || {}} />
            </div>

            <div className="about-us-info">
                <div className="about-info">
                    <div className="container">
                        <div className="wrap-info">
                            <div className="row">
                                {data?.about?.cfg_value &&
                                    data.about.cfg_value.map((item, index) => (
                                        <div key={index} className="col-6">
                                            <p className="about-info-header">
                                                {item.title}
                                            </p>
                                            <hr />
                                            <p>{item.content}</p>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="about-guide-aboutpage">
                <AboutGuide item={data?.about2 || {}} />
            </div>

            <div className="about-coach-aboutpage">
                {data?.about3 && (
                    <div className="about-coach">
                        <div className="container">
                            <h2>{data.about3?.cfg_title || ''}</h2>
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: data.about3?.cfg_content,
                                }}></p>
                        </div>
                    </div>
                )}
            </div>

            {data?.about3 && data.about3?.cfg_value && (
                <div className="about-secure-aboutpage">
                    <AboutSecure data={data.about3 || []} />
                </div>
            )}

            <div className="about-guide-aboutpage2">
                <AboutGuide item={data?.about4 || {}} />
            </div>

            {data?.about5 && data?.about5?.cfg_value && (
                <div className="about-type-aboutpage">
                    <AboutType data={data} />
                </div>
            )}
        </DefaultLayout>
    );
}

export async function getServerSideProps() {
    const aboutRes = await siteService.getAbout();
    const data = aboutRes.data.data;

    return { props: { data } };
}

export default About;
