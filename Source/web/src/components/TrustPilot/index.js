import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showTruspilot } from 'src/redux/actions/trustpilotAction';

const TrustPilot = () => {
    const dispatch = useDispatch();
    const { show } = useSelector((state) => state.trustpilotReducer);

    //! useEffect
    // useTruspilot();
    useEffect(() => {
        if (show) {
            document.getElementsByTagName('BODY')[0].style.overflow = 'hidden';
        } else {
            document.getElementsByTagName('BODY')[0].style.overflow = 'initial';
        }
    }, [show]);
    //! Function

    //! Render
    return (
        <div
            style={{
                visibility: show ? 'visible' : 'hidden',
                // visibility: 'visible',
                justifyContent: 'center',
                position: 'fixed',
                zIndex: 1000,
                top: 0,
            }}>
            <div
                style={{
                    width: '100vw',
                    position: 'absolute',
                    backgroundColor: 'white',
                    marginTop: '100px',
                }}>
                <div
                    class="trustpilot-widget"
                    data-locale="en-US"
                    data-template-id="539ad60defb9600b94d7df2c"
                    data-businessunit-id="5630b23d0000ff000584db47"
                    data-style-height="700px"
                    data-style-width="100%"
                    data-theme="light"
                    data-stars="4,5"
                    data-review-languages="en">
                    <a
                        href="https://www.trustpilot.com/review/wemakefootballers.com"
                        target="_blank"
                        rel="noopener">
                        Trustpilot
                    </a>
                </div>
            </div>
            <div
                style={{
                    width: '100vw',
                    height: '100vh',
                    backgroundColor: '#8685854f',
                }}
                onClick={(event) => {
                    // console.log(event, 'event');
                    dispatch(
                        showTruspilot({
                            show: false,
                        }),
                    );
                }}></div>
        </div>
    );
};

export default TrustPilot;
