import Link from 'next/link';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PathRoute from '../../common/PathRoute';
import Utils from '../../common/Utils';
import getLocalStorage from '../../hooks/useGetLocalStorage';

function BannerTop(props) {
    const dispatch = useDispatch();
    const [textSearch, setTextSearch] = useState('');

    const defaultAcademy = getLocalStorage();

    return (
        <div
            className="banner-top"
            style={{
                background: `url(${Utils.getThumb(
                    props.bannerTop.cfg_value[0].image,
                )}) no-repeat center center #fff`,
            }}>
            <div className="container">
                <h1>{props.bannerTop.cfg_title}</h1>
                <div className="box-text">
                    <p>{props.bannerTop.cfg_des}</p>
                    {
                        defaultAcademy.ms_id && (
                            <div className="box-button">
                                <Link
                                    href={PathRoute.BookTrialTraining}
                                    passHref>
                                    <a className="btn-book-free-session white-hover">
                                        BOOK A{' '}
                                        {defaultAcademy &&
                                        defaultAcademy.ms_trial === 1
                                            ? 'TRIAL '
                                            : 'FREE '}
                                        SESSION
                                    </a>
                                </Link>
                            </div>
                        )

                        // : (
                        //   <div className="box-pin">
                        //     <span className="text-form ">Find your nearest academy:</span>
                        //     <div className="box">
                        //       <input
                        //         type="text"
                        //         className="input-text"
                        //         // placeholder="Enter Your Postcode, Address,..."
                        //         onChange={(evt) => setTextSearch(evt.target.value)}
                        //       />
                        //       <button
                        //         className="btn-pin"
                        //         onClick={() =>
                        //           dispatch({
                        //             type: headerActionType.CHANGE_LOCATION,
                        //             data: textSearch,
                        //           })
                        //         }
                        //       >
                        //         {defaultAcademy ? "Book" : "Find"}
                        //       </button>
                        //     </div>
                        //   </div>
                        // )
                    }
                </div>
            </div>
        </div>
    );
}

export default BannerTop;
