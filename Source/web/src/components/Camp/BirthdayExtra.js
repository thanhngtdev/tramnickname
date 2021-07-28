import React from 'react';
import parse from 'html-react-parser';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const ListIcon = () => (
    <LazyLoadImage src={'/static-file/images/list.png'} alt="" />
);

export default function BirthdayExtra(props) {
    const { partyInclude, partyOptional } = props;
    // console.log(partyInclude);
    return (
        <div className="birthday-extra">
            <div className="container">
                <div className="row">
                    <div className="col-6">
                        <div className="extra-column">
                            <h3 className="heading">
                                {partyInclude.cfg_title}
                            </h3>
                            {partyInclude.cfg_value &&
                                partyInclude.cfg_value.map((item, index) => {
                                    if (item.content) {
                                        return (
                                            <div
                                                key={index}
                                                className="extra-item">
                                                <ListIcon />
                                                {parse(item.content)}
                                            </div>
                                        );
                                    }
                                })}
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="extra-column">
                            <h3 className="heading">
                                {partyOptional.cfg_title}
                            </h3>
                            {partyOptional.cfg_value &&
                                partyOptional.cfg_value.map((item, index) => {
                                    if (item.content) {
                                        return (
                                            <div
                                                key={index}
                                                className="extra-item">
                                                <div>
                                                    <ListIcon />
                                                    {parse(item.content)}
                                                </div>
                                                {/* <br /> */}
                                                <b>{item.des}</b>
                                            </div>
                                        );
                                    }
                                })}
                        </div>
                    </div>
                </div>

                <div style={{ clear: 'both' }}></div>
                <div style={{ textAlign: 'center', paddingTop: '2rem' }}>
                    <p>
                        Once you have decided which package you require,
                        complete the form below
                    </p>
                    <p>
                        Venue hire is not included, however, we can put in
                        contact with a WMF approved venue and guide you through
                        the process.
                    </p>
                </div>
            </div>
        </div>
    );
}
