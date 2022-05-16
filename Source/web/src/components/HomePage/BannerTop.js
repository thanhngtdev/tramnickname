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

function BannerTop(props) {
    const dispatch = useDispatch();
    const [textSearch, setTextSearch] = useState('');
    const { listSite } = useSelector((state) => state.listSiteReducer);
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
                    {defaultAcademy.ms_id ? (
                        <div className="box-button">
                            <Button
                                title={`BOOK A ${
                                    defaultAcademy &&
                                    defaultAcademy.ms_trial === 1
                                        ? 'TRIAL '
                                        : 'FREE '
                                } SESSION`}
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

                                // href={PathRoute.BookTrialTraining}
                            />
                        </div>
                    ) : (
                        <div className="box-pin">
                            <span className="text-form ">
                                Find your nearest academy:
                            </span>
                            <div className="box">
                                <SearchBox1
                                    setSearchResult={setSearchResult}
                                    textSearch={textSearch}
                                    setTextSearch={setTextSearch}
                                    listSite={listSite}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default BannerTop;
