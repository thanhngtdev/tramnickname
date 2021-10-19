import React from 'react';
import Utils from 'src/common/Utils';

// AboutSecure.propTypes = {
//     data: PropTypes.array,
// };

const Item = (props) => {
    const { index, item } = props;
    return (
        <div key={index} className="list-intro-item">
            <div className="list-intro-item-img">
                <img
                    loading="lazy"
                    src={Utils.getThumb(item.image)}
                    alt=""
                    // width="500"
                />
            </div>
            <div className="title">
                <h3>{item.title}</h3>
            </div>
            <div
                className="description"
                dangerouslySetInnerHTML={{
                    __html: item.des || item.content,
                }}
            />
        </div>
    );
};

export default function AboutSecure(props) {
    return (
        <div className="about-secure">
            <div className="container">
                <div className="box-list-item-card">
                    <div className="list-intro">
                        {props.data.cfg_value &&
                            props.data.cfg_value.map((item, index) => (
                                <Item index={index} item={item} />
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
