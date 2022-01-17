import React, { useEffect, useState } from 'react';
import Button from '../Button';
import isEmpty from 'lodash/isEmpty';

export default function JoinUsBanner(props) {
    const [title, setTitle] = useState(props.data?.cfg_title || '');
    const [des, setDes] = useState(props.data?.cfg_des || '');

    useEffect(() => {
        if (!isEmpty(props.site)) {
            const replacedTitle = title.replace(
                '$AcademyName',
                props.site.ms_name,
            );
            const replacedDes = title.replace(
                '$AcademyName',
                props.site.ms_name,
            );
            setTitle(replacedTitle);
            setDes(replacedDes);
        }
    }, []);

    return (
        // <div className="container">
        <div className="about-us">
            <div className="row">
                <div className="col-6">
                    <p></p>
                </div>
                <div className="col-6" style={{ paddingLeft: 0 }}>
                    <img
                        loading="lazy"
                        alt=""
                        src={'/static-file/images/joinUs.png'}
                    />
                </div>
            </div>
            <div className="about-us-content">
                <div className="container">
                    <h1
                        className="contact-header"
                        // style={{ paddingRight: '100px' }}
                    >
                        {title}
                    </h1>
                </div>
                <div className="container">
                    <div className="get-in-touch">
                        <div className="list-form">
                            <p className="pro-text" style={{ marginTop: '0' }}>
                                {des}
                            </p>

                            <div
                                style={{ marginTop: 30 }}
                                className="box-button">
                                <Button
                                    style={{ width: 200 }}
                                    title={`Join Us`}
                                    onClick={() => {
                                        props.click();
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        // </div>
    );
}
