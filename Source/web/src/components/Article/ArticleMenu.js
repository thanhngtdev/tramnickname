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
    const [lstCate, setLstCate] = useState(props?.lstCate || []);
    const [displayForm, setDisplayForm] = useState(false);
    const articleReducer = useSelector((state) => state.articleReducer);

    useEffect(() => {
        setCurrentAcademy(ModelManager.getLocation() || {});
    }, []);

    // useEffect(() => {
    //     if (articleReducer.type) {
    //         if (
    //             articleReducer.type === type.GET_LIST_NEWS_SUCCESS ||
    //             articleReducer.type === type.DETAIL_ARTICLE_SUCCESS
    //         ) {
    //             setLstCate(articleReducer.data.lstCate);
    //         }
    //     }
    // }, [articleReducer]);

    return (
        <div className="article-menu">
            <div className="container">
                <ul>
                    <li
                        className={
                            !props.currentCate && !props.isFranchise
                                ? 'active'
                                : ''
                        }>
                        <Link
                            onClick={() => {
                                if (props.setCate) props.setCate({});
                            }}
                            href="/news"
                            passHref>
                            <a>Latest Articles</a>
                        </Link>
                    </li>

                    {lstCate.map((item) => (
                        <li
                            className={
                                props.currentCate === item.cate_id
                                    ? 'active'
                                    : ''
                            }
                            key={item.cate_id}>
                            <a href={'/news/' + item.cate_alias}>
                                {item.cate_value}
                            </a>
                            {/* <Link passHref href={'/news/' + item.cate_alias} scroll>
                                <a>{item.cate_value}</a>
                            </Link> */}
                        </li>
                    ))}

                    {!isEmpty(currentAcademy) && (
                        <li className={props?.isFranchise ? 'active' : ''}>
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
