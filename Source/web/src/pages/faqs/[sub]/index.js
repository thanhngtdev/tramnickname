import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import parse from 'html-react-parser';
import isEmpty from 'lodash/isEmpty';
import React, { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import DefaultLayout from 'src/layout/DefaultLayout';
import siteService from 'src/services/siteService';

const propTypes = {};

const DetailFAQ = (props) => {
    //! State
    const [activeIndex, setActiveIndex] = useState(props.mark);
    const router = useRouter();

    useEffect(() => {
        if (isEmpty(props.data)) {
            window.location.href = '/404';
            return;
        }

        const split = router.asPath.split('#');
        // console.log(split, 'split');
        if (!isNaN(+split?.[1])) {
            setActiveIndex(+split?.[1]);
        }
    }, []);

    if (isEmpty(props.data)) return <></>;

    // return <> </>;

    return (
        <DefaultLayout>
            {/* <QNASearch /> */}
            <div
                className="qa qna-detail qna-search"
                style={{ textAlign: 'initial' }}>
                {/* {props.data.cate && props.data.lstCate.length > 0 && ( */}
                <div className="container">
                    <h2>{props.data.cate_value}</h2>
                    {/* {props.data.article.map((it, idx) => (
                        <Fragment key={idx}>
                            <h3>{it.cate_value}</h3>
                            
                        </Fragment>
                    ))} */}

                    <div className="qList">
                        {props.data.article.data.map((item, index) => (
                            <div
                                key={item.atc_id}
                                className={`qItem ${
                                    activeIndex === item.atc_id ? 'active' : ''
                                }`}
                                onClick={() => {
                                    if (activeIndex === item.atc_id) {
                                        setActiveIndex(-1);
                                        return;
                                    }

                                    setActiveIndex(item.atc_id);
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
                                            activeIndex === item.atc_id
                                                ? faMinus
                                                : faPlus
                                        }
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* )} */}
            </div>
        </DefaultLayout>
    );
};

export async function getServerSideProps(ctx) {
    const listCateReq = await siteService.searchFAQ();
    const listCate = listCateReq.data.data.lstCate;

    // const cate = ctx.query.sub.split('?');
    const check = listCate.find((item) => item.cate_alias === ctx.query.sub);

    if (!isEmpty(check)) {
        const listRes = await siteService.getListSite();
        const listSite = listRes.data.data.lstSite;
        // const req = await siteService.searchFAQ(check.cate_alias);

        // const mark = !isNaN(cate?.[1]) ? cate[1] : 0;
        // const mark = 0;

        return {
            props: {
                listSite: listSite,
                data: check,
                // mark: mark,
                // cate: ctx.query.sub,
            },
        };
    }

    return { props: { listSite: [], data: {} } };
}

DetailFAQ.propTypes = propTypes;
export default DetailFAQ;
