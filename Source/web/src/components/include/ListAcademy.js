/* eslint-disable react/button-has-type */
import React from 'react';
import { useSelector } from 'react-redux';
import siteService from 'src/services/siteService';

function ListAcademy(props) {
    const { listSite, onClickLocation } = props;

    return (
        <div className="wrap-row">
            <hr />
            <b>We make Footballers Academies</b>
            <div className="list-acade">
                {listSite &&
                    listSite.map((item) => {
                        return (
                            <a
                                onClick={(e) => {
                                    e.preventDefault();
                                    onClickLocation(item);
                                }}
                                key={item.ms_id}>
                                {item.ms_name}
                            </a>
                        );
                    })}
            </div>
        </div>
    );
}

export default ListAcademy;
