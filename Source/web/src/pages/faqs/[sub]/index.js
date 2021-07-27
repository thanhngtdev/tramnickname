import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import QNASearch from "pages/faqs/components/QNASearch";
// import "css/qna.css";
import DefaultLayout from "layout/DefaultLayout";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListFaq } from "redux/actions/faqAction";

const propTypes = {};

const ClearBoth = function () {
  return <div style={{ clear: "both" }} />;
};

const DetailFAQ = (props) => {
  //! State
  const dispatch = useDispatch();
  const { lstCate, cate } = useSelector((state) => state.faqReducer);
  const router = useRouter();
  const { sub } = router.query;
  const [activeIndex, setActiveIndex] = useState(-1);

  //! useEffect
  useEffect(() => {
    if (sub) {
      dispatch(getListFaq({ cate: sub }));
    }
  }, [sub]);

  // useEffect(() => {
  //   console.log(sub, "aaa");
  // });

  //! Function

  //! Render

  return (
    <DefaultLayout>
      <QNASearch />
      <ClearBoth />

      <div className="qa qna-detail">
        {cate && lstCate.length > 0 && (
          <div className="container">
            <h2>{cate.cate_value}</h2>
            {lstCate.map((it, idx) => (
              <Fragment key={idx}>
                <h3>{it.cate_value}</h3>
                <div className="qList">
                  {it.article.data.map((item, index) => (
                    <div
                      key={index}
                      className={`qItem ${
                        activeIndex === index ? "active" : ""
                      }`}
                      onClick={() => setActiveIndex(index)}
                    >
                      <label className="qId">
                        {index < 9 && "0"}
                        {index + 1}
                      </label>
                      <div className="qContent">
                        <h4 className="question">{item.atc_sapo}</h4>
                        <p
                          className="answer"
                          dangerouslySetInnerHTML={{
                            __html: item.atc_content,
                          }}
                        ></p>
                      </div>
                      <div className="qIcon">
                        <FontAwesomeIcon
                          icon={activeIndex === index ? faMinus : faPlus}
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

DetailFAQ.propTypes = propTypes;
export default DetailFAQ;
