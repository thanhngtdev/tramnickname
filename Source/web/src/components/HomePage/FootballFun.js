/* eslint-disable jsx-a11y/anchor-is-valid */
import PathRoute from 'src/common/PathRoute';
import Link from 'next/link';
import React from 'react';
// import type from "redux/actions/actionTypes";

function FootballFun(props) {
    return (
        <div className="box-10-years">
            <div className="box-year">
                <h3 className="title">{props.footballFun.cfg_title}</h3>
                <p className="description">{props.footballFun.cfg_des}</p>
                <Link href={PathRoute.AboutUs}>
                    <a className="btn-about">ABOUT US</a>
                </Link>
            </div>
        </div>
    );
}

export default FootballFun;
