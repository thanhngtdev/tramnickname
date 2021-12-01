import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import ModelManager from 'src/common/ModelManager';
import Utils from 'src/common/Utils';
import siteService from 'src/services/siteService';

WhyWMF.propTypes = {
    data: PropTypes.object,
};

export default function WhyWMF(props) {
    const [data, setData] = useState([]);
    const { listSite } = useSelector((state) => state.listSiteReducer);
    const [defaultAcademy, setDefaultAcademy] = useState({});
    const isFirstRun = useRef(true);
    const [cost, setCost] = useState({});
    const [trustPilot, setTrustPilot] = useState({});

    // console.log(props, 'props12');
    useEffect(() => {
        // console.log(checkPound(props.data.cfg_value), 'check');
        getTrustPilot();
        if (checkPound(props.data.cfg_value)) {
            if (props?.site) {
                setDefaultAcademy(props.site);
                return;
            }
            setDefaultAcademy(ModelManager.getLocation());
        } else {
            setData(props.data.cfg_value);
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
        // console.log(cost, 'cost');
        if (isEmpty(cost)) return;

        const { weeklyCost, minWeeklyCost } = cost;

        // console.log(cost, listSite.length, 'listSite.length');

        const converted = props.data.cfg_value.map((item) => {
            let newContent = item.des;
            if (newContent.includes('$WeeklyCost')) {
                newContent = Utils.convertCost(
                    weeklyCost,
                    listSite.length,
                    item.des,
                    minWeeklyCost,
                );
            }

            newContent = Utils.convertTrustPilot(
                trustPilot.rating,
                trustPilot.maxRate,
                trustPilot.review,
                newContent,
            );

            return { ...item, des: newContent };
        });

        setData(converted);
    }, [cost]);

    useEffect(() => {
        // console.log('trustpilot', trustPilot);

        if (isEmpty(trustPilot)) return;

        const converted = props.data.cfg_value.map((item) => {
            // console.log('new content');
            let newContent = item.des;
            newContent = Utils.convertTrustPilot(
                trustPilot.rating,
                trustPilot.maxRate,
                trustPilot.review,
                newContent,
            );

            return { ...item, des: newContent };
        });

        setData(converted);
    }, [trustPilot]);

    //! Functions
    const checkCost = async () => {
        if (!isEmpty(defaultAcademy)) {
            const { weeklyCost, minWeeklyCost } = defaultAcademy;
            setCost({ weeklyCost, minWeeklyCost });
        } else if (!isEmpty(props?.site)) {
            setCost({
                weeklyCost: props.site.weeklyCost,
                minWeeklyCost: props.site.minWeeklyCost,
            });
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
        // console.log(intro, 'intro');
        for (let i = 0; i < intro.length; i++) {
            if (intro[i].des.includes('$WeeklyCost')) {
                return true;
            }
        }
        return false;
    };

    return (
        <div className="why-wmf">
            {
                <div className="container">
                    <h2 className="heading">{props.data.cfg_title}</h2>
                    <div className="row">
                        {data &&
                            data.map((item, index) => {
                                return (
                                    <div className="col-4" key={index}>
                                        <div className="list-item">
                                            <div className="list-number">
                                                {index + 1}
                                            </div>
                                            <h3 style={{ fontWeight: 500 }}>
                                                {item.title}
                                            </h3>
                                            <p>{item.des}</p>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            }
        </div>
    );
}
