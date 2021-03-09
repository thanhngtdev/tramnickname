import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { articleActionType } from '../../actions/actionTypes';
import PropTypes from 'prop-types';
import ModelManager from '../../common/ModelManager';

ArticleMenu.propTypes = {
    currentCate: PropTypes.number,
    setCate: PropTypes.func,
};

export default function ArticleMenu(props) {
    const currentAcademy = ModelManager.getLocation();

    const [lstCate, setLstCate] = useState([]);
    const [displayForm, setDisplayForm] = useState(false);
    const articleReducer = useSelector((state) => state.articleReducer);
    useEffect(() => {
        if (articleReducer.type) {
            if (
                articleReducer.type ===
                    articleActionType.GET_LIST_NEWS_SUCCESS ||
                articleReducer.type === articleActionType.DETAIL_ARTICLE_SUCCESS
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
                            to="/news">
                            Latest Articles
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
                                }}
                                // style={{ color: 'black' }}
                                to={'/news/' + item.cate_alias}>
                                {item.cate_value}
                            </Link>
                        </li>
                    ))}
                    {currentAcademy && (
                        <li>
                            <Link
                                onClick={() => {
                                    if (props.setCate)
                                        props.setCate({
                                            alias: currentAcademy.ms_alias,
                                        });
                                }}
                                style={{ color: 'black' }}
                                to={'/' + currentAcademy.ms_alias + '/news'}>
                                {currentAcademy.ms_name + ' News'}
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
                <div
                    className="form-input"
                    style={{ display: displayForm ? 'block' : 'none' }}>
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
                </div>
            </div>
        </div>
    );
}
