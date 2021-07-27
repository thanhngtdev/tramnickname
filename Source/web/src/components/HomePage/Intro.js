// import Utils from "../../common/Utils";
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Utils from '../../common/Utils';
import getLocalStorage from '../../hooks/useGetLocalStorage';

Intro.propTypes = {
    intro: PropTypes.array,
};

function Intro(props) {
    const dispatch = useDispatch();
    const { lstSite } = useSelector((state) => state.listSiteReducer);
    const { data } = useSelector((state) => state.detailSiteReducer);
    const [checkPricing, setCheckPricing] = useState(false);
    const [replaceContent, setReplaceContent] = useState('');
    const { weeklyCost, minWeeklyCost } = props;
    const currentAcademy = getLocalStorage() || {};

    // useEffect(() => {
    //   props.intro.map((item) => {
    //     if (
    //       item.content.includes("of &pound;XXX") ||
    //       item.content.includes("of £XXX")
    //     ) {
    //       // console.log(!_.isEmpty(currentAcademy), 'aaa');
    //       if (lstSite.length > 0) {
    //         //get cost from frachise page or localStorage if available. If not, dispatch the first of academy site to get min cost.
    //         if ((weeklyCost && minWeeklyCost) || !_.isEmpty(currentAcademy)) {
    //           // const weeklyCost = weeklyCost ||  currentAcademy.weeklyCost;

    //           // if (props.weeklyCost) {
    //           //   console.log("props", props);
    //           // } else if (currentAcademy) {
    //           //   console.log("local");
    //           // }

    //           setReplaceContent(
    //             Utils.convertPrice({
    //               content: item.content,
    //               weeklyCost: weeklyCost || currentAcademy.weeklyCost,
    //               minWeeklyCost: minWeeklyCost || currentAcademy.minWeeklyCost,
    //               locations: lstSite.length,
    //             })
    //           );
    //         }
    //         //get data after dispatching && checkpricing = true
    //         else if (
    //           !_.isEmpty(data) &&
    //           _.isEmpty(currentAcademy) &&
    //           checkPricing
    //         ) {
    //           setReplaceContent(
    //             Utils.convertPrice({
    //               content: item.content,
    //               minWeeklyCost: data.site.minWeeklyCost,
    //               locations: lstSite.length,
    //             })
    //           );
    //         } else if (_.isEmpty(currentAcademy)) {
    //           dispatch(getDetailSite({ lstSite, cate: "" }));
    //           setCheckPricing(true);
    //         }
    //       }
    //     }
    //   });
    // }, [lstSite, data]);

    return (
        <div className="container">
            <div className="box-list-item-card intro-joinus">
                <div className="list-intro">
                    {props.intro.map((item, index) => {
                        const temp = { ...item };

                        // if (
                        //   item.content.includes("of &pound;XXX") ||
                        //   item.content.includes("of £XXX")
                        // ) {
                        //   temp.content = replaceContent;
                        // }

                        return (
                            <div key={index} className="list-intro-item">
                                <div className="list-intro-item-img">
                                    <img
                                        src={Utils.getThumb(temp.image)}
                                        alt=""
                                    />
                                </div>

                                <h3 className="title">{temp.title}</h3>
                                <div
                                    className="description"
                                    dangerouslySetInnerHTML={{
                                        __html: temp.content,
                                    }}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Intro;
