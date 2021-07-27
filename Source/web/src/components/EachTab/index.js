import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

const propTypes = {
  active: PropTypes.bool.isRequired,
  filled: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
  labelBtn: PropTypes.string,
};

const EachTab = ({
  active,
  filled,
  onClick,
  labelBtn = "Default label btn",
}) => {
  //! Render
  return (
    <div
      className={classNames("wrap-tab", {
        active: active,
        filled: filled,
      })}
    >
      <button onClick={onClick}>{labelBtn}</button>
    </div>
  );
};

EachTab.propTypes = propTypes;
export default EachTab;
