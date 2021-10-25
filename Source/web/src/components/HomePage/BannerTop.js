import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import PathRoute from 'src/common/PathRoute';
import Utils from 'src/common/Utils';
import Button from 'src/components/Button';
import getLocalStorage from 'src/hooks/useGetLocalStorage';
import SearchBox1 from 'src/components/SearchBox1';
import { useDispatch } from 'react-redux';
import { headerActionType } from 'src/redux/actions/actionTypes';

function BannerTop(props) {
    const dispatch = useDispatch();
    const [textSearch, setTextSearch] = useState('');
    const [src, setSrc] = useState('');
    const [isSearch, setIsSearch] = useState(false);
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

    useEffect(() => {
        if (isSearch) {
            dispatch({
                type: headerActionType.CHANGE_LOCATION,
            });

            setIsSearch(false);
        }
    }, [isSearch]);

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
                                {/* <input
                                    type="text"
                                    className="input-text"
                                    placeholder="Enter Postcode, Address,..."
                                    onChange={(evt) =>
                                        setTextSearch(evt.target.value)
                                    }
                                /> */}
                                <SearchBox1
                                    setIsSearch={setIsSearch}
                                    // isSearch={false}
                                    // listSite={listSite}
                                    // searched={searched}
                                    // inputSearch={inputSearch}
                                    // setShowListAcademy={setShowListAcademy}
                                    // setSearched={setSearched}
                                    // setListAcademy={setListAcademy}
                                    // setInputSearch={setInputSearch}
                                    // setTextResult={setTextResult}
                                />
                                {/* <div className="input-text">
                                </div>
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
                                </button> */}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default BannerTop;
