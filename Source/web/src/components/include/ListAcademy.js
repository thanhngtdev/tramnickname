/* eslint-disable react/button-has-type */
import React from "react";
import { useSelector } from "react-redux";

function ListAcademy(props) {
  const { listSite } = props;

  return (
    <div className="wrap-row">
      <hr />
      <b>We make Footballers Academies</b>
      <div className="list-acade">
        {listSite &&
          listSite.map((item) => {
            return (
              <a href={"/" + item.ms_alias} key={item.ms_id}>
                {item.ms_name}
              </a>
            );
          })}
      </div>
    </div>
  );
}

export default ListAcademy;
