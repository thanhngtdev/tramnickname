import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Utils from 'src/common/Utils';
import useGetWidth from 'src/hooks/useGetWidth';
import isEmpty from 'lodash/isEmpty';

FootballSkill.propTypes = {
    data: PropTypes.object,
};

export default function FootballSkill(props) {
    const [title, setTitle] = useState(props.data.cfg_title);
    const isMobile = useGetWidth() <= 767;

    useEffect(() => {
        if (isEmpty(props.data?.cfg_title)) return;
        // console.log(props, 'microsite');
        if (props.isMicroSite === true) {
            setTitle(
                props.data.cfg_title.replace(
                    '$AcademyName',
                    props.site.ms_name,
                ),
            );
        }
    }, []);

    // useEffect(() => {
    //     console.log(title, 'title');
    // }, [title]);

    return (
        // one-training-skill
        <div
            className={`box-football-beginning football-skill ${
                props.noTitle && `one-training-skill`
            } `}>
            <div
                className="container"
                style={{
                    position: 'relative',
                }}>
                <h3 className="heading">{title}</h3>
                <div className="box-beginning-list">
                    <div
                        className="list"
                        style={
                            props.noTitle && !isMobile
                                ? { height: '435px' }
                                : {}
                        }>
                        {props.data.cfg_value &&
                            props.data.cfg_value.map((item, index) => {
                                return (
                                    <div className="item" key={index}>
                                        <img
                                            loading="lazy"
                                            alt=""
                                            className="img"
                                            src={Utils.getThumb(item['icon'])}
                                        />
                                        {!props.noTitle && (
                                            <h3 className="title">
                                                {item['title']}
                                            </h3>
                                        )}

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
