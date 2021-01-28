import React from 'react';

const ListIcon = () => <img src={require('../../images/list.png')} alt="" />;

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
                                partyInclude.cfg_value
                                    .filter(function (item) {
                                        return item.content !== '';
                                    })
                                    .map((item, index) => (
                                        <div key={index} className="extra-item">
                                            <ListIcon />
                                            <span>{item.content}</span>
                                        </div>
                                    ))}
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="extra-column">
                            <h3 className="heading">
                                {partyOptional.cfg_title}
                            </h3>
                            {partyOptional.cfg_value &&
                                partyOptional.cfg_value
                                    .filter(function (item) {
                                        return item.content !== '';
                                    })
                                    .map((item, index) => (
                                        <div key={index} className="extra-item">
                                            <ListIcon />
                                            <span>{item.content}</span>
                                            <br />
                                            <b>{item.des}</b>
                                        </div>
                                    ))}
                        </div>
                    </div>
                </div>

                <div style={{ clear: 'both' }}></div>
                <div style={{ textAlign: 'center', paddingTop: '2rem' }}>
                    <h3>
                        Once you have decided which package you require,
                        complete the form below
                    </h3>
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
