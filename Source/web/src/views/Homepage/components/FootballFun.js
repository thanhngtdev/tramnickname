/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import type from 'redux/actions/actionTypes';
import PathRoute from 'common/Utils';

function FootballFun() {
    const [footballFun, setFootballFun] = useState({});
    const homeReducer = useSelector((state) => state.homeReducer);

    useEffect(() => {
        if (homeReducer.type) {
            if (homeReducer.type === type.GET_HOME_SUCCESS) {
                setFootballFun(homeReducer.data.footballFun);
            }
        }
    }, [homeReducer]);

    return (
        <div className="box-10-years">
            <div className="box-year">
                <h3 className="title">{footballFun.cfg_title}</h3>
                <p className="description">{footballFun.cfg_des}</p>
                <a href={PathRoute.AboutUs} className="btn-about">
                    ABOUT US
                </a>
            </div>
        </div>
    );
}

export default FootballFun;
