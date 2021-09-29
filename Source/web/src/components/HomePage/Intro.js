// import Utils from "src/common/Utils";
import { isEmpty, set } from 'lodash';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useSelector } from 'react-redux';
import ModelManager from 'src/common/ModelManager';
import Utils from 'src/common/Utils';
import siteService from 'src/services/siteService';
import TrustPilot from '../TrustPilot';

Intro.propTypes = {
    intro: PropTypes.array,
};

function Intro(props) {
    const [data, setData] = useState([]);
    const { listSite } = useSelector((state) => state.listSiteReducer);
    const [defaultAcademy, setDefaultAcademy] = useState({});
    const isFirstRun = useRef(true);
    const [cost, setCost] = useState({});
    const [trustPilot, setTrustPilot] = useState({});

    useEffect(() => {
        getTrustPilot();
        if (checkPound(props.intro)) {
            if (props?.site) {
                setDefaultAcademy(props.site);
                return;
            }
            setDefaultAcademy(ModelManager.getLocation());
        } else {
            setData(props.intro);
        }
    }, []);

    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }

        checkCost();
    }, [defaultAcademy]);

    useEffect(() => {
        if (isEmpty(cost)) return;
        if (isEmpty(trustPilot)) return;

        const { weeklyCost, minWeeklyCost } = cost;

        const converted = props.intro.map((item) => {
            let newContent = item.content;
            if (newContent.includes('of $WeeklyCost')) {
                newContent = Utils.convertCost(
                    weeklyCost,
                    listSite.length,
                    item.content,
                    minWeeklyCost,
                );
            }

            newContent = Utils.convertTrustPilot(
                trustPilot.rating,
                trustPilot.maxRate,
                trustPilot.review,
                newContent,
            );

            return { ...item, content: newContent };
        });

        setData(converted);
    }, [cost, trustPilot]);

    //! Functions
    const checkCost = async () => {
        if (!isEmpty(defaultAcademy)) {
            const { weeklyCost, minWeeklyCost } = defaultAcademy;
            setCost({ weeklyCost, minWeeklyCost });
        } else {
            try {
                const res = await siteService.getDetailSite({
                    id: listSite[0].ms_id,
                });
                if (res.data.status == 200) {
                    const item = res.data?.data?.site || {};
                    const { weeklyCost, minWeeklyCost } = item;
                    setCost({ weeklyCost, minWeeklyCost });
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    const getTrustPilot = async () => {
        try {
            const req = await siteService.getTrustPilot();

            // console.log(req, 'trust');

            if (req.data.status === 200) {
                const data = req.data.data;
                // console.log(data, 'rep');
                setTrustPilot({
                    rating: data[0].value,
                    maxRate: data[1].value,
                    review: data[2].value,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const checkPound = (intro) => {
        for (let i = 0; i < intro.length; i++) {
            if (intro[i].content.includes('of $WeeklyCost')) {
                return true;
            }
        }

        return false;
    };

    //! Render
    return (
        <div className="container">
            <div className="box-list-item-card intro-joinus">
                <div className="list-intro">
                    {!isEmpty(data) &&
                        data.map((item, index) => {
                            return (
                                <div key={index} className="list-intro-item">
                                    <div className="list-intro-item-img">
                                        <LazyLoadImage
                                            src={Utils.getThumb(item.image)}
                                            alt={item?.des}
                                            // height="100%"
                                            // width="100%"
                                            // layout="fill"
                                            // width="600"
                                            // width="600"
                                            // effect="blur"
                                        />
                                    </div>
                                    <div className="title">
                                        <h3>{item.title}</h3>
                                    </div>
                                    <div
                                        className="description"
                                        dangerouslySetInnerHTML={{
                                            __html: item.content,
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
