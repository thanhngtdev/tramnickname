import React from 'react';
import '../css/error.css';
import icon from '../images/imgtab2.jpg';

function ErrorPage() {
    return (
        <div className="banner-top">
            <div className="container">
                <p style={{ fontSize: '73px', color: 'white' }}>
                    Oops you’ve missed the target. No matter. Practice makes
                    permanent.
                </p>
                <div className="box-text">
                    <p>
                        The page you were looking for doesn’t exist. Click on
                        the button to go to our homepage.
                    </p>
                    <div className="box-pin">
                        <button
                            className="btn-pin"
                            onClick={() => console.log('click')}>
                            Go to the Home Pages
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ErrorPage;
