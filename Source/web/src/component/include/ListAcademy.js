/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { siteActionType } from 'redux/actions/actionTypes';

function ListAcademy() {
    const dispatch = useDispatch();
    const [lstSite, setLstSite] = useState([]);
    const siteReducer = useSelector((state) => state.siteReducer);

    useEffect(() => {
        dispatch({ type: siteActionType.GET_LIST_SITE });
    }, [dispatch]);

    useEffect(() => {
        if (siteReducer.type) {
            if (siteReducer.type === siteActionType.GET_LIST_SITE_SUCCESS) {
                setLstSite(siteReducer.data.lstSite);
            }
        }
    }, [siteReducer]);

    return (
        <div className="wrap-row">
            <hr />
            <b>We make Footballers Academies</b>
            <div className="list-acade">
                {lstSite.map((item) => {
                    return (
                        <a
                            href={
                                '/franchise/' + item.ms_alias + '-' + item.ms_id
                            }
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
