import React from 'react';
import Utils from 'src/common/Utils';
import Image from 'next/image' 

function FootballBegining(props) {
    return (
        <div className="box-football-beginning">
            <h2 className="heading">{props.footballBegining.cfg_title}</h2>
            <p className="sub-text">{props.footballBegining.cfg_des}</p>

            <div className="box-beginning-list">
                <div className="list">
                    {props.footballBegining.cfg_value &&
                        props.footballBegining.cfg_value.map((item, index) => {
                            return (
                                <div className="item" key={index}>
                                    {/* <img
                                        loading="lazy"
                                        alt=""
                                        className="img"
                                        src={Utils.getThumb(item['icon'])}
                                    /> */}
                                    <Image
                                    src={Utils.getThumb(item['icon'])}
                                    alt=""
                                    className='img'
                                    loading='lazy'
                                    />
                                    <h3 className="title">{item['title']}</h3>
                                    <p className="description">{item['des']}</p>
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
}

export default FootballBegining;
