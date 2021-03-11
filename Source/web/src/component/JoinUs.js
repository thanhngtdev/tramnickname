import React from 'react';
import { propTypes } from 'react-bootstrap/esm/Image';
import Coaching from './join-us/Coaching';
import CoachingCopy from './join-us/CoachingCopy';
import 'css/join-us.css';

JoinUs.propTypes = {
    data: propTypes.object,
};

function JoinUs(props) {
    console.log('JoinUs -> props', props);
    return (
        <div className="holiday-camp">
            <div className="container" style={{ marginTop: 115 }}>
                <Coaching />
            </div>
        </div>
    );
}

export default JoinUs;
