import { isEmpty } from 'lodash';
import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Utils from 'src/common/Utils';

const propTypes = {};

const Provide = (props) => {
    //! State
    const { provide } = props;
    //! Function

    //! Render
    return (
        <div className="provides">
            {!isEmpty(provide) && (
                <>
                    <div className="container">
                        <h3 className="heading">{provide?.cfg_title || ''}</h3>
                    </div>
                    <div className="provides-row">
                        <div className="provides-image">
                            <LazyLoadImage
                                style={{ float: 'right' }}
                                src={Utils.getThumb(
                                    provide?.cfg_value?.[0]?.image,
                                )}
                                alt={provide?.cfg_value?.[0]?.des || ''}
                            />
                        </div>
                        <div className="provides-text">
                            <div
                                className="provides-wrap-text"
                                dangerouslySetInnerHTML={{
                                    __html: provide?.cfg_value?.[0]?.content,
                                }}></div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

Provide.propTypes = propTypes;
export default Provide;
