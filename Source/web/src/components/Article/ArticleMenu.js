import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import type from 'src/redux/actions/actionTypes';
import PropTypes from 'prop-types';
import ModelManager from 'src/common/ModelManager';
import Link from 'next/link';
import { isEmpty } from 'lodash';

ArticleMenu.propTypes = {
    currentCate: PropTypes.number,
    setCate: PropTypes.func,
};

export default function ArticleMenu(props) {
    const [currentAcademy, setCurrentAcademy] = useState({});
    const [lstCate, setLstCate] = useState([]);
    const [displayForm, setDisplayForm] = useState(false);
    const articleReducer = useSelector((state) => state.articleReducer);

    useEffect(() => {
        setCurrentAcademy(ModelManager.getLocation() || {});
    }, []);

    useEffect(() => {
        if (articleReducer.type) {
            if (
                articleReducer.type === type.GET_LIST_NEWS_SUCCESS ||
                articleReducer.type === type.DETAIL_ARTICLE_SUCCESS
            ) {
                setLstCate(articleReducer.data.lstCate);
            }
        }
    }, [articleReducer]);
    // console.log(!props.currentCate.cate_id, 'current');

    return (
        <div className="article-menu">
            <div className="container">
                <ul>
                    <li className={!props.currentCate?.cate_id ? 'active' : ''}>
                        <Link
                            onClick={() => {
                                if (props.setCate) props.setCate({});
                            }}
                            // style={{ color: 'black' }}
                            href="/news"
                            passHref>
                            <a>Latest Articles</a>
                        </Link>
                    </li>
                    {lstCate.map((item) => (
                        <li
                            className={
                                props.currentCate?.cate_id === item.cate_id
                                    ? 'active'
                                    : ''
                            }
                            key={item.cate_id}>
                            <Link
                                onClick={() => {
                                    if (props.setCate) props.setCate(item);
                                    passHref;
                                }}
                                // style={{ color: 'black' }}
                                href={'/news/' + item.cate_alias}>
                                <a>{item.cate_value}</a>
                            </Link>
                        </li>
                    ))}
                    {!isEmpty(currentAcademy) && (
                        <li>
                            <Link
                                onClick={() => {
                                    if (props.setCate)
                                        props.setCate({
                                            alias: currentAcademy.ms_alias,
                                        });
                                }}
                                style={{ color: 'black' }}
                                href={'/' + currentAcademy.ms_alias + '/news'}
                                passHref>
                                <a>{currentAcademy.ms_name + ' News'}</a>
                            </Link>
                        </li>
                    )}
                </ul>
                <div className="search">
                    <FontAwesomeIcon
                        style={{ color: '#EF8336' }}
                        icon={faSearch}
                        onClick={() => {
                            setDisplayForm(!displayForm);
                        }}
                    />
                </div>
            </div>
            <div
                className="form-input"
                style={{ display: displayForm ? 'flex' : 'none' }}>
                <div>
                    <div style={{ display: 'flex' }} className="container">
                        <input
                            type="text"
                            placeholder="Search news"
                            // defaultValue={query}
                            // onChange={(e) => setQuery(e.target.value)}
                            // onKeyDown={(e) => {
                            //     if (e.key === 'Enter') {
                            //         setShowListAcademy(false);
                            //         setSearched(true);
                            //         dispatch({
                            //             type: siteActionType.SEARCH_NEARBY,
                            //             search: query,
                            //             lat: 51,
                            //             lng: 0,
                            //         });
                            //     }
                            // }}
                        />
                        {/* <button>
                                // onClick={() => {
                                //     setShowListAcademy(false);
                                //     setSearched(true);
                                //     dispatch({
                                //         type: siteActionType.SEARCH_NEARBY,
                                //         search: query,
                                //         lat: 51,
                                //         lng: 0,
                                //     });
                                // }}>
                                {searched ? 'FIND' : 'GO'}
                            </button> */}
                        <button>Search</button>
                        <FontAwesomeIcon
                            style={{
                                color: 'black',
                                margin: 'auto 20px',
                                fontSize: '25px',
                            }}
                            icon={faTimes}
                            onClick={() => {
                                setDisplayForm(!displayForm);
                            }}
                        />
                    </div>
                </div>
                <div className="overlay"></div>
            </div>
        </div>
    );
}
