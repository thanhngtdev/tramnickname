import isEmpty from 'lodash/isEmpty';
import React, { useEffect, useState } from 'react';
import Utils from 'src/common/Utils';
import siteService from 'src/services/siteService';

export default function AboutGuide(props) {
    const [newTitle, setNewTitle] = useState(props.item.cfg_title || '');
    const [cost, setCost] = useState({});

    //! useEffect
    useEffect(() => {
        checkCost();
    }, []);

    useEffect(() => {
        // console.log(cost, 'cost');
        if (!isEmpty(cost)) {
            const { weeklyCost, minWeeklyCost } = cost;
            setNewTitle(
                Utils.convertCost(weeklyCost, 0, newTitle, minWeeklyCost),
            );
        }
    }, [cost]);

    const checkCost = async () => {
        if (localStorage.getItem('defaultAcademy')) {
            const academy = JSON.parse(localStorage.getItem('defaultAcademy'));
            const { weeklyCost, minWeeklyCost } = academy;
            setCost({ weeklyCost, minWeeklyCost });
        } else {
            try {
                const res = await siteService.getDetailSite({
                    id: props.listSite[0].ms_id,
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

    return (
        <div className="about-guide">
            <div className="container">
                <h2>{newTitle}</h2>
            </div>
            <div className="wrap-guide">
                <div className="col-left">
                    <div className="wrap-image">
                        <img
                            loading="lazy"
                            src={Utils.getThumb(props.item.cfg_des)}
                            alt="Wemakefootballers"
                        />
                    </div>
                </div>
                <div className="col-right">
                    <div
                        style={{ maxWidth: 555 }}
                        dangerouslySetInnerHTML={{
                            __html: props.item.cfg_content,
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
