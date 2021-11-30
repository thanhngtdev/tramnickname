import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import ModelManager from 'src/common/ModelManager';
import Link from 'next/link';
import isEmpty from 'lodash/isEmpty';
import siteService from 'src/services/siteService';
import ArticleItem from './ArticleItem';
import useGetWidth from 'src/hooks/useGetWidth';

ArticleMenu.propTypes = {
    currentCate: PropTypes.number,
    setCate: PropTypes.func,
};

export default function ArticleMenu(props) {
    const [currentAcademy, setCurrentAcademy] = useState({});
    const [lstCate, setLstCate] = useState(props?.lstCate || []);
    const [displayForm, setDisplayForm] = useState(true);
    const articleReducer = useSelector((state) => state.articleReducer);
    const [textSearch, setTextSearch] = useState('');
    const [listNews, setListNews] = useState([]);
    const [results, setResults] = useState([]);
    const [isShowDrop, setIsShowDrop] = useState();
    const isMobile = useGetWidth() <= 768;

    useEffect(() => {
        setCurrentAcademy(ModelManager.getLocation() || {});
        getListNews();
    }, []);

    useEffect(() => {
        // console.log(isShowDrop, 'isShowDrop');
        if (isShowDrop === 'undefined') return;

        const btn = document.getElementsByClassName('dropdownlist');
        if (!btn) return;
        // console.log(btn, 'dropdownlist');

        if (isShowDrop) {
            btn[0].style.display = 'inherit';
        } else {
            btn[0].style.display = 'none';
        }
    }, [isShowDrop]);

    useEffect(() => {
        if (isShowDrop === 'undefined') return;
        // console.log(isMobile, 'isMobile');

        if (isMobile) {
            setIsShowDrop(false);
        } else {
            setIsShowDrop(true);
        }
    }, [isMobile]);

    const getListNews = async () => {
        const data = await siteService.getListNews({
            cate: '',
            page: 1,
            alias: '',
        });
        // console.log(data, 'data');

        if (data?.data?.status === 200 && data?.data?.data?.lstArticle?.data) {
            setListNews(data?.data?.data?.lstArticle?.data);
        }
    };

    return (
        <div className="article-menu">
            {displayForm ? (
                <div className="container">
                    <button
                        className="dropdownLogo"
                        type="button"
                        onClick={() => {
                            // console.log('aaaaaaaa');
                            if (isShowDrop === 'undefined') {
                                setIsShowDrop(true);
                                return;
                            }

                            setIsShowDrop(!isShowDrop);
                        }}></button>
                    <div className="dropdownlist">
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
                                    <a className="article-a">Latest Articles</a>
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
                                    <a
                                        className="article-a"
                                        href={'/news/' + item.cate_alias}>
                                        {item.cate_value}
                                    </a>
                                    {/* <Link passHref href={'/news/' + item.cate_alias} scroll>
                                <a>{item.cate_value}</a>
                            </Link> */}
                                </li>
                            ))}

                            {!isEmpty(currentAcademy) && (
                                <li
                                    className={
                                        props?.isFranchise ? 'active' : ''
                                    }>
                                    <Link
                                        onClick={() => {
                                            if (props.setCate)
                                                props.setCate({
                                                    alias: currentAcademy.ms_alias,
                                                });
                                        }}
                                        style={{ color: 'black' }}
                                        href={
                                            '/' +
                                            currentAcademy.ms_alias +
                                            '/news'
                                        }
                                        passHref>
                                        <a className="article-a">
                                            {currentAcademy.ms_name + ' News'}
                                        </a>
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>

                    <div className="search">
                        <FontAwesomeIcon
                            style={{ color: '#EF8336' }}
                            icon={faSearch}
                            onClick={() => {
                                setDisplayForm(!displayForm);
                                setResults([]);
                                setTextSearch('');
                            }}
                        />
                    </div>
                </div>
            ) : (
                <div className="form-input container">
                    <input
                        type="text"
                        placeholder="Search news"
                        value={textSearch}
                        onChange={(e) => {
                            setTextSearch(e.target.value);

                            if (!e.target.value) {
                                setResults([]);

                                return;
                            }

                            const list = listNews.filter((item) => {
                                return (
                                    item.atc_title
                                        .toLowerCase()
                                        .includes(
                                            e.target.value.toLowerCase(),
                                        ) ||
                                    item.atc_content
                                        .toLowerCase()
                                        .includes(e.target.value.toLowerCase())
                                );
                            });

                            setResults(list);
                        }}
                    />

                    {/* <button
                        onClick={() => {
                            if (!textSearch) return;

                            console.log('search', textSearch);

                            const list = listNews.filter((item) => {
                                return item.atc_title
                                    .toLowerCase()
                                    .includes(textSearch);
                            });

                            setResults(list);

                            // console.log(list, 'earaaa');
                        }}>
                        Search
                    </button> */}
                    <FontAwesomeIcon
                        style={{
                            color: '#ee7925',
                            margin: 'auto 20px',
                            fontSize: '25px',
                            marginTop: 10,
                        }}
                        icon={faTimes}
                        onClick={() => {
                            setDisplayForm(!displayForm);
                        }}
                    />
                    {!isEmpty(results) && (
                        <div
                            className="article-list"
                            style={{
                                // position: 'relative',
                                padding: '50px 0',
                                borderRadius: 6,
                                maxHeight: 375,
                                overflowY: 'scroll',
                                marginTop: 5,
                                maxWidth: '90%',
                            }}>
                            <div className="container">
                                <div className="article-list-grid">
                                    {results.map((item, index) => {
                                        return (
                                            <ArticleItem
                                                key={index}
                                                item={item}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
