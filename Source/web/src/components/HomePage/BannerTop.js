import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import PathRoute from 'src/common/PathRoute';
import Utils from 'src/common/Utils';
import Button from 'src/components/Button';
import getLocalStorage from 'src/hooks/useGetLocalStorage';

function BannerTop(props) {
    const [textSearch, setTextSearch] = useState('');
    const [src, setSrc] = useState('');
    const history = useRouter();

    const defaultAcademy = getLocalStorage();

    useEffect(() => {
        const imageLoader = new Image();
        imageLoader.src = `${Utils.getThumb(
            props.bannerTop.cfg_value[0].image,
        )}`;

        imageLoader.onload = () => {
            setSrc(`${Utils.getThumb(props.bannerTop.cfg_value[0].image)}`);
        };
    }, []);

    return (
        <div
            className="banner-top"
            style={{
                backgroundImage: `url(${src}) `,
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

                                    history.push(PathRoute.BookTrialTraining);
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
                                <input
                                    type="text"
                                    className="input-text"
                                    placeholder="Enter Postcode, Address,..."
                                    onChange={(evt) =>
                                        setTextSearch(evt.target.value)
                                    }
                                />
                                <button
                                    className="btn-pin"
                                    // onClick={() =>
                                    //     dispatch({
                                    //         type: headerActionType.CHANGE_LOCATION,
                                    //         data: textSearch,
                                    //     })
                                    // }
                                >
                                    {defaultAcademy ? 'Book' : 'Find'}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default BannerTop;
