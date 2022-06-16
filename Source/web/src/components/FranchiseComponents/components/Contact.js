import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import PathRoute from 'src/common/PathRoute';
import { CommonStyle } from 'src/common/Styles';
import siteService from 'src/services/siteService';

export default (props) => {
    const dispatch = useDispatch();
    const history = useRouter();
    const { data } = useSelector((state) => state.homeReducer);
    const { franchise } = history.query;
    let alias = franchise;
    let siteName = '';
    let options = [];

    if (props.site.ms_alias) siteName = props.site.ms_name;
    else if (props.site && props.site.sub_page) {
        props.site.sub_page.map((item) => {
            if (item.sub_alias === alias) siteName = item.sub_name;
        });
    }

    let fbLink = '',
        twLink = '',
        igLink = '';
    if (props.social && props.social.length > 0) {
        props.social.map((item) => {
            if (item.name === 'Facebook') fbLink = item.link;
            if (item.name === 'Instagram') igLink = item.link;
            if (item.name === 'Twitter') twLink = item.link;
        });
    }

    if (props.site) {
        options.push({
            label: props.site.ms_address,
            alias: props.site.ms_alias,
            value: props.site.ms_id,
        });
        props.site.associalted &&
            props.site.associalted.map((item) =>
                options.push({
                    label: item.ms_address,
                    alias: item.ms_alias,
                    value: item.ms_id,
                }),
            );
    }

    const addressLenght = props.site.ms_addresses.length;
    const newAddress = props.site.ms_addresses;

    return (
        <div className="container">
            <div className="academy-info">
                <div className="group-info">
                    <label className="group-name">Address</label>
                    <div className="wrap-contact">
                        {addressLenght > 1 ? (
                            newAddress.map((address) => {
                                return (
                                    <p style={{ margin: '8px 16px' }}>
                                        {address.ms_address}
                                    </p>
                                );
                            })
                        ) : (
                            <p style={{ margin: '8px 16px' }}>
                                {newAddress[0]?.ms_address}
                            </p>
                        )}
                    </div>
                </div>
                <div className="group-info">
                    <label className="group-name">Contact</label>
                    <div style={{ paddingTop: '6px' }}>
                        <a
                            className="text-express-enquiry"
                            href={PathRoute.Contact}>
                            Make an enquiry
                        </a>
                        <div>
                            <p className="text-express">
                                Phone (9am - 5pm):{' '}
                                <a
                                    className="phone"
                                    href={`tel:${
                                        props.site ? props.site.ms_phone : ''
                                    }`}>
                                    {props.site ? props.site.ms_phone : ''}
                                </a>
                            </p>
                        </div>

                        <div>
                            <a href={fbLink} target="_blank" rel="noreferrer">
                                <img
                                    loading="lazy"
                                    alt=""
                                    src={'static-file/images/icon-fb-small.svg'}
                                />
                            </a>
                            <a href={twLink} target="_blank" rel="noreferrer">
                                <img
                                    loading="lazy"
                                    alt=""
                                    src={
                                        'static-file/images/icon-twitter-small.svg'
                                    }
                                />
                            </a>
                            <a href={igLink} target="_blank" rel="noreferrer">
                                <img
                                    loading="lazy"
                                    alt=""
                                    src={
                                        'static-file/images/icon-insta-small.svg'
                                    }
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
