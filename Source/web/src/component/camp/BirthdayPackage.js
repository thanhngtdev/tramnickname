import React from 'react';
import Utils from '../../common/Utils';
import BorderButton from '../include/BorderButton';

export default function BirthdayPackage(props) {
    const birthdayPackage = props.data;
    const cfgValue = props.data.cfg_value || [];

    return (
        <div className="birthday-package">
            <div className="container">
                <h2 className="heading">{props.data.cfg_title}</h2>
                {cfgValue.length > 0 && (
                    <div className="package-item">
                        <div className="package-image">
                            <img
                                src={Utils.getThumb(cfgValue[0].image)}
                                alt=""
                            />
                        </div>
                        <div className="package-text text-right">
                            <h3>{cfgValue[0].title}</h3>
                            <p className="package-include">{cfgValue[0].des}</p>
                            <p className="package-cost">
                                Cost {cfgValue[0].title} £{cfgValue[0].icon}
                            </p>
                            <p className="package-des">{cfgValue[0].content}</p>
                            <BorderButton
                                onClick={() => {
                                    props.onClick(cfgValue[0].title);
                                }}
                                title={`Book ${cfgValue[0].title}`}
                            />
                        </div>
                    </div>
                )}
                {cfgValue.length > 1 && (
                    <div className="package-item">
                        <div className="package-text text-left">
                            <h3>{cfgValue[1].title}</h3>
                            <p className="package-include">{cfgValue[1].des}</p>
                            <p className="package-cost">
                                Cost {cfgValue[1].title} £{cfgValue[1].icon}
                            </p>
                            <p className="package-des">{cfgValue[1].content}</p>
                            <BorderButton
                                onClick={() => {
                                    props.onClick(cfgValue[1].title);
                                }}
                                title={`Book ${cfgValue[1].title}`}
                            />
                        </div>
                        <div className="package-image">
                            <img
                                src={Utils.getThumb(cfgValue[1].image)}
                                alt=""
                            />
                        </div>
                    </div>
                )}
                {cfgValue.length > 2 && (
                    <div className="package-item">
                        <div className="package-image">
                            <img
                                src={Utils.getThumb(cfgValue[2].image)}
                                alt=""
                            />
                        </div>
                        <div className="package-text text-right">
                            <h3>{cfgValue[2].title}</h3>
                            <p className="package-include">{cfgValue[2].des}</p>
                            <p className="package-cost">
                                Cost {cfgValue[2].title} £{cfgValue[2].icon}
                            </p>
                            <p className="package-des">{cfgValue[2].content}</p>
                            <BorderButton
                                onClick={() => {
                                    props.onClick(cfgValue[2].title);
                                }}
                                title={`Book ${cfgValue[2].title}`}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
