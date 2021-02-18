import React from 'react';
import { Link } from 'react-router-dom';
import Utils from '../../common/Utils';

export default function ArticleItem(props) {
    const { item } = props;
    return (
        <div className="article-item">
            <img
                src={Utils.getThumb(item.atc_featureImg, 'c2')}
                alt={item.atc_title}
            />
            <h6>{item.cate_article.cate_value}</h6>
            <Link
                to={`/news/${item.atc_alias}-${item.atc_id}`}
                className="title">
                {item.atc_title}
            </Link>
        </div>
    );
}
