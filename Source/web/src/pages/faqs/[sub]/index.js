import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QNASearch from 'src/components/FaqComponents/components/QNASearch';
// import "css/qna.css";
import DefaultLayout from 'src/layout/DefaultLayout';
import { getListFaq } from 'src/redux/actions/faqAction';
import siteService from 'src/services/siteService';
import parse from 'html-react-parser';

const propTypes = {};

const DetailFAQ = (props) => {
    // console.log(props, 'props');
    //! State
    const [activeIndex, setActiveIndex] = useState(-1);

    useEffect(() => {
        if (isEmpty(props.data)) {
            window.location.href = '/404';
        }
    }, []);

    if (isEmpty(props.data)) return <></>;

    return (
        <DefaultLayout>
            {/* <QNASearch /> */}
            <div
                className="qa qna-detail qna-search"
                style={{ textAlign: 'initial' }}>
                {props.data.cate && props.data.lstCate.length > 0 && (
                    <div className="container">
                        <h2>{props.data.cate.cate_value}</h2>
                        {props.data.lstCate.map((it, idx) => (
                            <Fragment key={idx}>
                                <h3>{it.cate_value}</h3>
                                <div className="qList">
                                    {it.article.data.map((item, index) => (
                                        <div
                                            key={index}
                                            className={`qItem ${
                                                activeIndex === index
                                                    ? 'active'
                                                    : ''
                                            }`}
                                            onClick={() => {
                                                if (activeIndex === index) {
                                                    setActiveIndex(-1);
                                                    return;
                                                }

                                                setActiveIndex(index);
                                            }}>
                                            <label className="qId">
                                                {index < 9 && '0'}
                                                {index + 1}
                                            </label>
                                            <div className="qContent">
                                                <h4 className="question">
                                                    {item.atc_sapo}
                                                </h4>
                                                <p
                                                    className="answer"
                                                    // dangerouslySetInnerHTML={{
                                                    //     __html: item.atc_content,
                                                    // }}
                                                >
                                                    {parse(item.atc_content)}
                                                </p>
                                            </div>
                                            <div className="qIcon">
                                                <FontAwesomeIcon
                                                    icon={
                                                        activeIndex === index
                                                            ? faMinus
                                                            : faPlus
                                                    }
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Fragment>
                        ))}
                    </div>
                )}
            </div>
        </DefaultLayout>
    );
};

export async function getServerSideProps(ctx) {
    const listCateReq = await siteService.searchFAQ();
    const listCate = listCateReq.data.data.lstCate;

    const check = listCate.find((item) => item.cate_alias === ctx.query.sub);

    if (!isEmpty(check)) {
        const listRes = await siteService.getListSite();
        const listSite = listRes.data.data.lstSite;
        const req = await siteService.searchFAQ(ctx.query.sub);

        return { props: { listSite: listSite, data: req?.data.data } };
    }

    return { props: { listSite: [], data: {} } };
}

DetailFAQ.propTypes = propTypes;
export default DetailFAQ;
