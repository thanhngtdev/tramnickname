import React, { useEffect, useState } from 'react';

const GENDER = ['Male', 'Female', 'Unspecified'];
function BookTrialTraining4(props) {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    
    return (
        <div className="tab-4">
            <iframe
                className="responsive-iframe"
                style={{ border: 'none' }}
                src={props.url}
                width="100%"
                height="770"></iframe>
        </div>
    );
}

export default BookTrialTraining4;
