import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { homeActionType } from '../../actions/actionTypes';
import Utils from '../../common/Utils';

function Intro() {
    const [intro, setIntro] = useState([]);
    const homeReducer = useSelector(state => state.homeReducer);

    useEffect(() => {
        if (homeReducer.type) {
            if (homeReducer.type === homeActionType.GET_HOME_SUCCESS) {
                setIntro(homeReducer.data.homeIntro.cfg_value);
            }
        }
    }, [homeReducer]);

    return (
        <div className="container">
            <div className="box-list-item-card">
                <div className="row">
                    {intro.map((item, index) => {
                        return (
                            <div key={index} className="col-4">
                                <div className="item">
                                    <img src={Utils.getThumb(item.image)} alt=""/>
                                    <h3 className="title">{item.title}</h3>
                                    <div
                                        className="description"
                                        dangerouslySetInnerHTML={{
                                            __html: item.content,
                                        }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Intro;
