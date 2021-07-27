import { isEmpty } from "lodash";
import React from "react";

const propTypes = {};

const Provide = (props) => {
  //! State
  // console.log(isEmpty(props.franchisePage));
  //! Function

  //! Render
  return (
    <div className="provides">
      <div className="container">
        <h3 className="heading">Who provides the 1-to-1 top coaching</h3>
      </div>
      <div className="provides-row">
        <div className="provides-image">
          <img
            style={{ float: "right" }}
            src={"/static/images/hs_photo_pc.jpg"}
            alt=""
          />
        </div>
        <div className="provides-text">
          <div className="provides-wrap-text">
            <p style={{ marginTop: 0 }}>
              We Make Footballers only allow Senior Coaches who have been
              awarded the WMF 1-on-1 Coaching Badge to provide these sessions.
              All of our Coaches work from the We Make Footballers syllabus and
              Methodology, however, each coach has their unique style and
              personality.
            </p>
            <p
              className="text-leading"
              style={{
                padding: "1rem",
                backgroundColor: "#F2F2F2",
              }}
            >
              At the{" "}
              <b>
                {props.franchisePage
                  ? props.site.ms_name
                  : "We Make Footballers"}
              </b>
              our 1-to-1 coaching is undertaken by <b>the academy head coach</b>
            </p>
            <p>
              Esmond currently has a number of 1-on-1 clients who he is helping
              to improve their individual skills whilst developing at their
              weekly training and local teams. His high energy means your child
              will have a lot of fun whilst still getting top quality sessions.
            </p>
            <b>How much do sessions cost?</b>
            <p
              className="text-cost"
              style={{
                padding: "1rem",
                backgroundColor: "#F2F2F2",
                color: "#FF7100",
              }}
            >
              One Off -{" "}
              {props?.franchisePage
                ? props.site?.weeklyCost?.one || ""
                : props.site?.minWeeklyCost?.one || ""}
              {"|"}
              Block Of 4 -{" "}
              {props?.franchisePage
                ? props.site?.weeklyCost?.block || ""
                : props.site?.minWeeklyCost?.block || ""}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

Provide.propTypes = propTypes;
export default Provide;
