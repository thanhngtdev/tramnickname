import { isEmpty } from 'lodash';
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

    useEffect(() => {
        console.log(checkPound(props.data.cfg_value), 'check');
        if (checkPound(props.data.cfg_value)) {
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
        if (isEmpty(cost)) return;

        const { weeklyCost, minWeeklyCost } = cost;

        const converted = props.data.cfg_value.map((item) => {
            if (
                item.des.includes('of &pound;XXX') ||
                item.des.includes('of £XXX')
            ) {
                const newContent = Utils.convertCost(
                    weeklyCost,
                    listSite.length,
                    item.des,
                    minWeeklyCost,
                );

                return { ...item, des: newContent };
            }
            return item;
        });

        setData(converted);
    }, [cost]);

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

    const checkPound = (intro) => {
        console.log(intro.length, 'intro');
        for (let i = 0; i < intro.length; i++) {
            if (
                intro[i].des.includes('of &pound;XXX') ||
                intro[i].des.includes('of £XXX')
            ) {
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
                                            <h3>{item.title}</h3>
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
