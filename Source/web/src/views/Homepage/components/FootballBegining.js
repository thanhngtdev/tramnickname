import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import type from 'redux/actions/actionTypes';
import Utils from 'common/Utils';

function FootballBegining() {
    const [footballBegining, setFootballBegining] = useState({});
    const homeReducer = useSelector((state) => state.homeReducer);

    useEffect(() => {
        if (homeReducer.type) {
            if (homeReducer.type === type.GET_HOME_SUCCESS) {
                // console.log(homeReducer.data.footballBegining);
                setFootballBegining(homeReducer.data.footballBegining);
            }
        }
    }, [homeReducer]);
    return (
        <div className="box-football-beginning">
            <div>
                <h2 className="heading">{footballBegining.cfg_title}</h2>
                <p className="sub-text">{footballBegining.cfg_des}</p>
            </div>
            <div className="box-beginning-list">
                <div className="list">
                    {footballBegining.cfg_value &&
                        footballBegining.cfg_value.map((item, index) => {
                            return (
                                <div className="item" key={index}>
                                    <img
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

export default FootballBegining;
