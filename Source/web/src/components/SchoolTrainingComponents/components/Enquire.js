import React from 'react';
import { Button } from 'react-bootstrap';
const propTypes = {};

const Enquire = (props) => {
    //! State
    const { enquireBox } = props;

    //! Function

    //! Render
    return (
        <div className="container">
            <div style={{ marginBottom: '120px' }} className="enquire">
                <p className="enquire-header">
                    Enquire about school training for your pupils
                </p>
                <p style={{ marginBottom: '3rem' }}>
                    Your pupils and parents will thank you for it in the future.
                </p>
                <Button
                    onClick={() => {
                        enquireBox.current.scrollIntoView({
                            behavior: 'smooth',
                        });
                    }}
                    style={{
                        backgroundColor: 'white',
                        color: '#FF7531',
                        borderRadius: 6,
                        boxShadow: 'none',
                        border: 'none',
                        padding: '1.5rem 3rem',
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                    }}>
                    Enquire about school training
                </Button>
            </div>
        </div>
    );
};

Enquire.propTypes = propTypes;
export default Enquire;
