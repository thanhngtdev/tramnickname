import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import ModelManager from 'src/common/ModelManager';
import Utils from 'src/common/Utils';

const ArticleSearch = (props) => {
    const [defaultAcademy, setDefaultAcademy] = useState({});
    const { item } = props;

    useEffect(() => {
        setDefaultAcademy(ModelManager.getLocation());
    }, []);

    return (
        <div className="article-item">
            <img
                loading="lazy"
                src={Utils.getThumb(item.atc_featureImg)}
                alt={item.atc_title}
            />
            <Link href={`/news/${item.atc_alias}`} passHref>
                <a className="title">
                    <h3 style={{ color: '#767676', fontSize: '28px' }}>
                        {item.atc_title}
                    </h3>
                </a>
            </Link>
        </div>
    );
};

export default ArticleSearch;
