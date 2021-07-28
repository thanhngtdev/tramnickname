import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PathRoute from 'src/common/PathRoute';
import Utils from 'src/common/Utils';
import getLocalStorage from 'src/hooks/useGetLocalStorage';

function BannerTop(props) {
    const dispatch = useDispatch();
    const [textSearch, setTextSearch] = useState('');
    const [src, setSrc] = useState('');

    const defaultAcademy = getLocalStorage();

    useEffect(() => {
        const imageLoader = new Image();
        imageLoader.src = `${Utils.getThumb(
            props.bannerTop.cfg_value[0].image,
        )}`;

        imageLoader.onload = (event) => {
            setSrc(`${Utils.getThumb(props.bannerTop.cfg_value[0].image)}`);
        };
    }, []);

    return (
        <div
            className="banner-top"
            style={{
                background: `url(${src}) no-repeat center center #fff`,
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
