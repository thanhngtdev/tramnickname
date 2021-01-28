import React from 'react';
import { useState } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';
import Constants from '../../common/Constants';
import CustomMarker from './CustomMarker';

function ContactMap(props) {
    const defaultCenter = {
        lat: Constants.DEFAULT_LOCATION.lat,
        lng: Constants.DEFAULT_LOCATION.lng,
    };

    const defaultMarker = {
        ms_latitude: Constants.DEFAULT_LOCATION.lat,
        ms_longitude: Constants.DEFAULT_LOCATION.lng,
    };

    const defaultAcademy =
        JSON.parse(localStorage.getItem('defaultAcademy')) || {};
    // console.log(defaultAcademy);

    function renderAcademyContact() {
        return (
            <div className="text-content">
                <h2>Contact details </h2>
                <p style={{ marginBottom: 0 }}>Phone(9am-5pm):</p>
                <strong style={{ fontSize: 24, color: '#5E5E5E' }}>
                    <p>{defaultAcademy.ms_phone}</p>
                </strong>
                <h2 style={{ marginTop: 50 }}>Address</h2>
                <p>{defaultAcademy.ms_address}</p>
                <div style={{ marginTop: 40 }}>
                    {defaultAcademy.social &&
                        defaultAcademy.social.map((item) => {
                            if (item.name === 'Facebook')
                                return (
                                    <a
                                        key={1}
                                        href={item.link}
                                        target="_blank"
                                        rel="noreferrer">
                                        <img
                                            alt=""
                                            style={{ marginRight: 30 }}
                                            src={require('../../images/icon-fb-small.png')}
                                        />
                                    </a>
                                );
                            if (item.name === 'Twitter')
                                return (
                                    <a
                                        key={2}
                                        href={item.link}
                                        target="_blank"
                                        rel="noreferrer">
                                        <img
                                            alt=""
                                            src={require('../../images/icon-twitter-small.png')}
                                        />
                                    </a>
                                );
                            if (item.name === 'Instagram')
                                return (
                                    <a
                                        key={3}
                                        href={item.link}
                                        target="_blank"
                                        rel="noreferrer">
                                        <img
                                            alt=""
                                            style={{ marginRight: 30 }}
                                            src={require('../../images/icon-insta-small.png')}
                                        />
                                    </a>
                                );
                        })}
                </div>
            </div>
        );
    }

    function renderWMFContact() {
        return (
            <div className="text-content">
                <h2>Contact details </h2>
                <p style={{ marginBottom: 0 }}>Phone(9am-5pm):</p>
                <strong style={{ fontSize: 24, color: '#5E5E5E' }}>
                    {props.footerConfig.map((item) => {
                        if (item.title === 'Phone')
                            return <p key="phone">{item.des}</p>;
                    })}
                </strong>
                <h2 style={{ marginTop: 50 }}>Address</h2>
                {props.footerConfig.map((item) => {
                    if (item.title === 'Address')
                        return <p key="address">{item.des}</p>;
                })}

                <div style={{ marginTop: 40 }}>
                    {props.footerConfig.map((item) => {
                        if (item.title === 'Facebook')
                            return (
                                <a
                                    key={1}
                                    href={item.des}
                                    target="_blank"
                                    rel="noreferrer">
                                    <img
                                        alt=""
                                        style={{ marginRight: 30 }}
                                        src={require('../../images/icon-fb-small.png')}
                                    />
                                </a>
                            );
                        if (item.title === 'Twitter')
                            return (
                                <a
                                    key={2}
                                    href={item.des}
                                    target="_blank"
                                    rel="noreferrer">
                                    <img
                                        alt=""
                                        style={{ marginRight: 30 }}
                                        src={require('../../images/icon-twitter-small.png')}
                                    />
                                </a>
                            );
                        if (item.title === 'Insta')
                            return (
                                <a
                                    key={3}
                                    href={item.des}
                                    target="_blank"
                                    rel="noreferrer">
                                    <img
                                        alt=""
                                        src={require('../../images/icon-insta-small.png')}
                                    />
                                </a>
                            );
                    })}
                </div>
            </div>
        );
    }

    return (
        <GoogleMap defaultZoom={12} center={defaultCenter}>
            <div className="contact-map">
                {defaultAcademy && defaultAcademy.ms_id > 0
                    ? renderAcademyContact()
                    : renderWMFContact()}
            </div>
            <CustomMarker item={defaultMarker} />
        </GoogleMap>
    );
}

export default withScriptjs(withGoogleMap(ContactMap));
