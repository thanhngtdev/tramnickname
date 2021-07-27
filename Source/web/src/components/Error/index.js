import PathRoute from 'src/common/PathRoute';
import SolidButton from 'src/components/include/SolidButton';
import { useRouter } from 'next/router';
import React from 'react';

const propTypes = {};

const BACKGROUND = '/static-file/images/bg_404.png';
const ErrorPage = (props) => {
    //! State
    const history = useRouter(useRouter);

    //! Function

    //! Render
    return (
        <div
            style={{
                background:
                    'url(' +
                    `${'/static-file/images/bg_404.png'}` +
                    ') no-repeat center center',
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
};

ErrorPage.propTypes = propTypes;
export default ErrorPage;
