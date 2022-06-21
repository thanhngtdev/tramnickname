import React, { useState, useEffect } from 'react';
import { GoogleMap, withGoogleMap, withScriptjs } from 'react-google-maps';
import Constants from 'src/common/Constants';
import CustomMarker from 'src/components/include/CustomMarker';

function ContactMap(props) {
    const { academy } = props;

    const latitude = Number(academy.ms_addresses.map((e) => e.ms_latitude))
    const longitude = Number(academy.ms_addresses.map((e) => e.ms_longitude))

    const [defaultCenter, setdefaultCenter] = useState({
        lat: latitude,
        lng: longitude,
    });

    const [defaultMarker, setdefaultMarker] = useState({
        ms_latitude: Constants.DEFAULT_LOCATION.lat,
        ms_longitude: Constants.DEFAULT_LOCATION.lng,
    });
    useEffect(() => {
        setdefaultCenter({
            lat: latitude + 0.13,
            lng: longitude,
        });
        setdefaultMarker({
            ms_latitude: latitude,
            ms_longitude: longitude,
        });
    }, [academy]);

    function renderWMFContact() {
        return (
            <div className="text-content">
                <h2>Contact details </h2>
                <h2 style={{ marginBottom: 0, fontSize: '22px' }}>
                    Phone(9am-5pm):
                </h2>
                <strong style={{ fontSize: 24, color: '#5E5E5E' }}>
                    {props.footerConfig.map((item) => {
                        if (item.title === 'Phone')
                            return <p key="phone">{item.des}</p>;
                    })}
                </strong>
                <h2>Address:</h2>
                {props.footerConfig.map((item) => {
                    if (item.title === 'Address')
                        return <p key="address">{item.des}</p>;
                })}

                <div style={{ marginTop: 40 }}>
                    {props.footerConfig.map((item) => {
                        if (item.title === 'Facebook')
                            return (
                                <a
                                    style={{ marginRight: 10 }}
                                    key={1}
                                    href={item.des}
                                    target="_blank"
                                    rel="noreferrer">
                                    <img
                                        loading="lazy"
                                        alt=""
                                        src={
                                            'static-file/images/orange-fb-icon.svg'
                                        }
                                    />
                                </a>
                            );
                        if (item.title === 'Twitter')
                            return (
                                <a
                                    style={{ marginRight: 10 }}
                                    key={2}
                                    href={item.des}
                                    target="_blank"
                                    rel="noreferrer">
                                    <img
                                        loading="lazy"
                                        alt=""
                                        src={
                                            '/static-file/images/orange-twitter-icon.svg'
                                        }
                                    />
                                </a>
                            );
                        if (
                            item.title === 'Insta' ||
                            item.title === 'Instagram'
                        )
                            return (
                                <a
                                    style={{ marginRight: 10 }}
                                    key={3}
                                    href={item.des}
                                    target="_blank"
                                    rel="noreferrer">
                                    <img
                                        loading="lazy"
                                        alt=""
                                        src={
                                            'static-file/images/orange-insta-icon.svg'
                                        }
                                    />
                                </a>
                            );
                    })}
                </div>
                <div style={{ marginTop: 40 }}>
                    <p>
                        For media inquiries <br /> please contact <br /> Laura
                        James on <br />laura@wemakefootballers.com <br />{' '}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <GoogleMap defaultZoom={11} center={defaultCenter}>
            <div className="contact-map">{renderWMFContact()}</div>
            <CustomMarker item={defaultMarker} />
        </GoogleMap>
    );
}

export default withScriptjs(withGoogleMap(ContactMap));
