import React from 'react';
import '../css/error.css';
import { useHistory } from 'react-router-dom';

function ErrorPage() {
    const history = useHistory();

    function handleClick() {
        history.push('/');
    }
    return (
        <div className="error">
            <div className="container">
                <div className="error-header">
                    <p>Oops you’ve missed the target. No matter.</p>
                    <p>Practice makes permanent.</p>
                </div>

                <div className="box-text">
                    <p>
                        The page you were looking for doesn’t exist. Click on
                        the button to go to our homepage.
                    </p>
                    <div className="box-pin">
                        <button className="btn-pin" onClick={handleClick}>
                            Go to the Home Page
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ErrorPage;
