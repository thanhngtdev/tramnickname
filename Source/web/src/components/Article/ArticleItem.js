import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import ModelManager from 'src/common/ModelManager';
import Utils from 'src/common/Utils';

export default function ArticleItem(props) {
    const [defaultAcademy, setDefaultAcademy] = useState({});
    const { item } = props;
    console.log('tmmmmm', item);
    useEffect(() => {
        setDefaultAcademy(ModelManager.getLocation());
    }, []);

    const renderCate = () => {
        if (item.cate_article.cate_id === 20 && defaultAcademy) {
            return <h6>{defaultAcademy?.ms_name}</h6>;
        }

        return <h6>{item.cate_article.cate_value}</h6>;
    };

    const renderLink = () => {
        if (item.cate_article.cate_id === 20 && defaultAcademy) {
            return (
                <Link
                    href={`/${defaultAcademy?.ms_alias}/news/${item.atc_alias}`}
                    passHref>
                    <a className="title">{item.atc_title}</a>
                </Link>
            );
        }

        return (
            <Link href={`/news/${item.atc_alias}`} passHref>
                <a className="title">{item.atc_title}</a>
            </Link>
        );
    };
    console.log('itemitemitemitem', item);
    return (
        <div className="article-item">
            <img
                loading="lazy"
                src={Utils.getThumb(item.atc_featureImg)}
                alt={item.atc_title}
            />
            {renderCate()}
            {renderLink()}
        </div>
    );
}
