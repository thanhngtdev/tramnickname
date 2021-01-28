import React from 'react';
import Utils from '../../common/Utils';
import PropTypes from 'prop-types';

FootballSkill.propTypes = {
    data: PropTypes.object,
};

export default function FootballSkill(props) {
    return (
        <div className="box-football-beginning football-skill">
            <div
                className=""
                style={{
                    position: 'relative',
                    maxWidth: 1250,
                    width: '100%',
                    margin: 'auto',
                }}>
                <div>
                    <h3 className="heading">{props.data.cfg_title}</h3>
                </div>
                <div className="box-beginning-list">
                    <div className="list">
                        {props.data.cfg_value &&
                            props.data.cfg_value.map((item, index) => {
                                return (
                                    <div className="item" key={index}>
                                        <img
                                            alt=""
                                            className="img"
                                            src={Utils.getThumb(item['icon'])}
                                        />
                                        <h3 className="title">
                                            {item['title']}
                                        </h3>
                                        <p className="description">
                                            {item['des']}
                                        </p>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>
        </div>
    );
}
