import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Utils from 'src/common/Utils';
import getFranchiseName from 'src/hooks/useFranchise';

function TrainingReason(props) {
    const siteName = getFranchiseName(props.site);

    return (
        <div className="box-football-beginning training">
            <div>
                <h2 className="heading">
                    Why do Children & Parents in {siteName} Love our Training?
                </h2>
            </div>
            <div ref={props.targetRef} className="box-beginning-list">
                <div className="list">
                    {props.reason.cfg_value &&
                        props.reason.cfg_value.map((item, index) => {
                            return (
                                <div className="item" key={index}>
                                    <img
                                        loading="lazy"
                                        alt=""
                                        className="img"
                                        src={Utils.getThumb(item['icon'])}
                                    />
                                    <h3 className="title">{item['title']}</h3>
                                    <p className="description">{item['des']}</p>
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
}
export default TrainingReason;
