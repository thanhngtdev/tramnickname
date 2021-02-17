import React from 'react';
import { useHistory } from 'react-router-dom';
import PathRoute from '../common/PathRoute';
import Background from './../images/bg_404.png';
import SolidButton from './include/SolidButton';

export default function NotFound() {
    const history = useHistory();
    return (
        <div
            style={{
                background:
                    'url(' + Background + ') no-repeat center center fixed',
                height: 960,
                paddingTop: 120,
                position: 'relative',
            }}>
            <div className="container">
                <h1 style={{ color: 'white', fontSize: 55 }}>
                    Oops you’ve missed the target. No matter. Practice makes
                    permanent.{' '}
                </h1>
                <p
                    style={{
                        position: 'absolute',
                        bottom: 200,
                        color: 'white',
                        marginTop: 100,
                    }}>
                    The page you were looking for doesn’t exist. Click on the
                    button to go to our homepage.
                </p>
                <SolidButton
                    style={{ position: 'absolute', bottom: 100 }}
                    title="Go to Homepage"
                    onClick={() => {
                        history.push(PathRoute.Home);
                    }}
                />
            </div>
        </div>
    );
}
