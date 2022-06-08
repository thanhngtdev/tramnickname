import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import PathRoute from 'src/common/PathRoute';
import Utils from 'src/common/Utils';
import Button from 'src/components/Button';
import getLocalStorage from 'src/hooks/useGetLocalStorage';
import SearchBox1 from 'src/components/SearchBox1';
import { useDispatch, useSelector } from 'react-redux';
import { headerActionType } from 'src/redux/actions/actionTypes';
import isEmpty from 'lodash/isEmpty';
import useGetWidth from 'src/hooks/useGetWidth';
import { PopupButton } from '@typeform/embed-react';

function BannerTop(props) {
    const dispatch = useDispatch();
    const [textSearch, setTextSearch] = useState('');
    const { listSite } = useSelector((state) => state.listSiteReducer);
    const { defaultTypeform } = useSelector((state) => state.homeReducer);
    const [searchResult, setSearchResult] = useState({});
    const history = useRouter();
    const defaultAcademy = getLocalStorage();
    const isMobile = useGetWidth() <= 768;

    useEffect(() => {
        if (!isEmpty(searchResult)) {
            dispatch({
                type: headerActionType.CHANGE_LOCATION,
                data: { ...searchResult },
            });

            setTextSearch({});
        }
    }, [searchResult]);

    const renderButton = () => {
        if (defaultAcademy.ms_id) {
            const title = `BOOK A ${
                defaultAcademy && defaultAcademy.ms_trial === 1
                    ? 'TRIAL '
                    : 'FREE '
            } SESSION`;

            return (
                <div className="box-button">
                    <Button
                        idTypeForm={
                            defaultAcademy.ms_use_typeform === 1
                                ? defaultAcademy.ms_typeform_id
                                : defaultTypeform?.default_typeform_id
                        }
                        title={title}
                        onClick={() => {
                            global.bookTraining = {
                                siteSelected: defaultAcademy,
                            };

                            history.push(
                                PathRoute.BookTrialTrainingWithAlias(
                                    defaultAcademy.ms_alias,
                                ),
                            );
                        }}
                    />
                </div>
            );
        }

        return (
            <div className="box-pin">
                <span className="text-form ">Find your nearest academy:</span>
                <div className="box">
                    <SearchBox1
                        setSearchResult={setSearchResult}
                        textSearch={textSearch}
                        setTextSearch={setTextSearch}
                        listSite={listSite}
                    />
                </div>
            </div>
        );
    };

    return (
        <div
            className="banner-top"
            style={{
                backgroundImage: `url(${Utils.getThumb(
                    isMobile
                        ? props.bannerTop.cfg_mobileBanner
                        : props.bannerTop.cfg_image,
                )}) `,
            }}>
            <div className="container">
                <h1>{props.bannerTop.cfg_title}</h1>
                <div className="box-text">
                    <p>{props.bannerTop.cfg_des}</p>
                    {renderButton()}
                </div>
            </div>
        </div>
    );
}

export default BannerTop;
