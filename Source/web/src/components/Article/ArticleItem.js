import React from 'react';
import Utils from 'src/common/Utils';
import Link from 'next/link';

export default function ArticleItem(props) {
    const { item } = props;
    return (
        <div className="article-item">
            <img
                src={Utils.getThumb(item.atc_featureImg, 'c2')}
                alt={item.atc_title}
            />
            <h6>{item.cate_article.cate_value}</h6>
            <Link href={`/news/${item.atc_alias}-${item.atc_id}`} passHref>
                <a className="title">{item.atc_title}</a>
            </Link>
        </div>
    );
}