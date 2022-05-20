/* eslint-disable react/button-has-type */
import React from 'react';
import Utils from 'src/common/Utils';
import parse from 'html-react-parser';

function ListAcademy(props) {
    const { listSite, onClickLocation } = props;

    return (
        <div className="wrap-row">
            <hr />
            <b>We Make Footballers Academies</b>

            <div className="list-acade">
                {listSite &&
                    listSite.map((item) => {
                        return (
                            <a
                                onClick={(e) => {
                                    e.preventDefault();
                                    Utils.onClickLocation(item);
                                }}
                                key={item.ms_id}>
                                {/* {item.ms_name} */}
                                {parse(Utils.checkSubname(item))}
                            </a>
                        );
                    })}
            </div>
        </div>
    );
}

export default ListAcademy;
