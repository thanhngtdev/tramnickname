import DefaultLayout from 'src/layout/DefaultLayout';
import { useRouter } from 'next/router';
import QNASearch from 'src/components/FaqComponents/components/QNASearch';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getListFaq } from 'src/redux/actions/faqAction';
import ListFAQ from '../../components/FaqComponents/components/ListFAQ';
import ResultFaqs from '../../components/FaqComponents/components/ResultFaqs';
import siteService from 'src/services/siteService';
import { isEmpty } from 'lodash';
import saveList from 'src/hooks/useSaveList';

const propTypes = {};

const FAQ = (props) => {
    //! State
    const history = useRouter();
    const [search, setSearch] = useState('');
    const [isSearch, setIsSearch] = useState(false);
    const [list, setList] = useState(props.data.lstCate || []);

    //! useEffect
    saveList(props.listSite);
    useEffect(() => {
        if (isEmpty(search)) return;

        callApiSearch();
    }, [search]);

    // useEffect(() => {
    //     console.log(props, 'props');
    // }, []);

    //! Function
    const callApiSearch = async () => {
        try {
            const res = await siteService.searchArticle({
                scope: 'faq',
                query: search,
            });

            if (res.data.status === 200) {
                setIsSearch(true);
                setList(res.data.data.data);
            }
        } catch (error) {
            console.log(error);
        } finally {
        }
    };

    // const callApiFaq = async () => {
    //     try {
    //         const res = await siteService.searchFAQ('');

    //         console.log(res.data, 'data');
    //     } catch (error) {
    //         console.log(error);
    //     } finally {
    //     }
    // };

    //! Render
    return (
        <DefaultLayout>
            <QNASearch setSearch={setSearch} />

            {isSearch ? (
                <ResultFaqs lstCate={list} />
            ) : (
                <ListFAQ lstCate={list} />
            )}

            <div className="qna-contact-mobile">
                <div
                    className="container"
                    style={{ justifyContent: 'center', display: 'flex' }}>
                    <div className="qna-contact">
                        <p className="qna-contact-header">
                            Can’t find the answer you are looking for?
                        </p>
                        <p>
                            Contact us via the button below and one of our
                            experienced team members will get back to you.
                        </p>
                        <button
                            onClick={() => {
                                history.push('contact-us');
                            }}>
                            GET IN TOUCH
                        </button>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export async function getServerSideProps() {
    return await Promise.all([
        siteService.getListSite(),
        siteService.searchFAQ(''),
    ]).then((values) => {
        if (values[0] && values[1]) {
            return {
                props: {
                    listSite: values[0].data.data.lstSite,
                    data: values[1].data.data,
                },
            };
        }
        return { props: { listSite: [], data: {} } };
    });
}

FAQ.propTypes = propTypes;
export default FAQ;
