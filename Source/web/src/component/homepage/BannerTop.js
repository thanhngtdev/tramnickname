import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { headerActionType, homeActionType } from '../../actions/actionTypes';
import PathRoute from '../../common/PathRoute';

function BannerTop() {
    const dispatch = useDispatch();
    const [message, setMessage] = useState('');
    const [textSearch, setTextSearch] = useState('Ted');
    const homeReducer = useSelector((state) => state.homeReducer);
    const [defaultAcademy, setDefaultAcademy] = useState(
        JSON.parse(localStorage.getItem('defaultAcademy')) || {},
    );

    useEffect(() => {
        if (homeReducer.type) {
            if (homeReducer.type === homeActionType.GET_HOME_SUCCESS) {
                setMessage(homeReducer.data.bannerTop.cfg_des);
            }
        }
    }, [homeReducer]);

    return (
        <div className="banner-top">
            <div className="container">
                <h1>We make football fun for every child</h1>
                <div className="box-text">
                    <p>{message}</p>
                    {defaultAcademy.ms_id ? (
                        <div
                            className="box-button"
                            style={{
                                textAlign: 'center',
                                padding: '20px 0px',
                                borderRadius: '10px',
                                backgroundColor: '#EE7925',
                            }}>
                            {' '}
                            <a
                                style={{ color: 'white' }}
                                className="btn-book-free-session"
                                href={PathRoute.BookTrialTraining}>
                                {' '}
                                BOOK A{' '}
                                {defaultAcademy && defaultAcademy.ms_trial === 1
                                    ? 'TRIAL'
                                    : 'FREE'}{' '}
                                SESSION{' '}
                            </a>{' '}
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
                                    placeholder="TW7 5BB"
                                    onChange={(evt) =>
                                        setTextSearch(evt.target.value)
                                    }
                                />
                                <button
                                    className="btn-pin"
                                    onClick={() =>
                                        dispatch({
                                            type:
                                                headerActionType.CHANGE_LOCATION,
                                            data: textSearch,
                                        })
                                    }>
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
