import React from 'react';
import Utils from 'src/common/Utils';
import BorderButton from 'src/components/include/BorderButton';

export default function BirthdayPackage(props) {
    const cfgValue = props.data.cfg_value || [];

    return (
        <div className="birthday-package">
            <div className="container">
                <h2 className="heading">{props.data.cfg_title}</h2>
                {cfgValue.map((item, index) => {
                    if (index % 2 === 0) {
                        return (
                            <div className="package-item">
                                <div className="package-image">
                                    <img
                                        loading="lazy"
                                        src={Utils.getThumb(item.image)}
                                        alt=""
                                    />
                                </div>
                                <div className="package-text text-right">
                                    <h3>{item.title}</h3>
                                    <p className="package-include">
                                        {item.des}
                                    </p>
                                    <p className="package-cost">
                                        Cost {item.title} £{item.icon}
                                    </p>
                                    <p
                                        className="package-des"
                                        dangerouslySetInnerHTML={{
                                            __html: item.content,
                                        }}></p>
                                    <BorderButton
                                        onClick={() => {
                                            props.onClick(item.title);
                                        }}
                                        title={`Book ${item.title}`}
                                    />
                                </div>
                            </div>
                        );
                    } else {
                        return (
                            <div className="package-item">
                                <div className="package-text text-left">
                                    <h3>{item.title}</h3>
                                    <p className="package-include">
                                        {item.des}
                                    </p>
                                    <p className="package-cost">
                                        Cost {item.title} £{item.icon}
                                    </p>
                                    <p
                                        className="package-des"
                                        dangerouslySetInnerHTML={{
                                            __html: item.content,
                                        }}></p>
                                    <BorderButton
                                        onClick={() => {
                                            props.onClick(item.title);
                                        }}
                                        title={`Book ${item.title}`}
                                    />
                                </div>
                                <div className="package-image">
                                    <img
                                        loading="lazy"
                                        src={Utils.getThumb(item.image)}
                                        alt=""
                                    />
                                </div>
                            </div>
                        );
                    }
                })}
            </div>
        </div>
    );
}
