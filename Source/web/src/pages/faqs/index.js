import DefaultLayout from 'src/layout/DefaultLayout';
import { useRouter } from 'next/router';
import QNASearch from 'src/components/FaqComponents/components/QNASearch';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getListFaq } from 'src/redux/actions/faqAction';
import ListFAQ from '../../components/FaqComponents/components/ListFAQ';
import ResultFaqs from '../../components/FaqComponents/components/ResultFaqs';

const propTypes = {};

const ClearBoth = function () {
    return <div style={{ clear: 'both' }} />;
};

const FAQ = (props) => {
    //! State
    const { lstCate, faqSearching } = useSelector((state) => state.faqReducer);
    const dispatch = useDispatch();
    const history = useRouter();
    // const [faqSearching, setFaqSearching] = useState(false);

    //! useEffect
    useEffect(() => {
        dispatch(getListFaq({ cate: '' }));
    }, []);
    //! Function

    //! Render
    return (
        <DefaultLayout>
            <QNASearch />

            {faqSearching ? (
                <ResultFaqs lstCate={lstCate} />
            ) : (
                <ListFAQ lstCate={lstCate} />
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

FAQ.propTypes = propTypes;
export default FAQ;
