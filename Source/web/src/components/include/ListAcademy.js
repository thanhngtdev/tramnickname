/* eslint-disable react/button-has-type */
import React from 'react';
import { useSelector } from 'react-redux';
import siteService from 'src/services/siteService';

function ListAcademy(props) {
    const { listSite } = props;

    const onClickLocation = async (e, item) => {
        e.preventDefault();

        try {
            const res = await siteService.getDetailSite({ id: item.ms_id });
            if (res.data.status == 200) {
                const item = res.data?.data?.site || {};
                localStorage.setItem('defaultAcademy', JSON.stringify(item));
                window.location.href = `${'/' + item.ms_alias}`;
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="wrap-row">
            <hr />
            <b>We make Footballers Academies</b>
            <div className="list-acade">
                {listSite &&
                    listSite.map((item) => {
                        return (
                            <a
                                onClick={(e) => onClickLocation(e, item)}
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
