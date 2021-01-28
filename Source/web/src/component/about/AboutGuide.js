import React from 'react';
import Utils from '../../common/Utils';

export default function AboutGuide(props) {
    // console.log(props);
    return (
        <div className="about-guide">
            <div className="container">
                <h2>{props.item.cfg_title}</h2>
            </div>
            <div className="wrap-guide">
                <div className="col-left">
                    <div className="wrap-image">
                        <img
                            src={Utils.getThumb(props.item.cfg_des)}
                            alt="Wemakefootballers"
                        />
                    </div>
                </div>
                <div className="col-right">
                    <div
                        style={{ maxWidth: 555 }}
                        dangerouslySetInnerHTML={{
                            __html: props.item.cfg_content,
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
