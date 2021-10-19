import { useEffect } from 'react';

const useTruspilot = () => {
    return useEffect(() => {
        let element = document.getElementsByClassName('trustpilot-widget');
        for (var i = 0; i < element.length; i++) {
            if (window.Trustpilot && element[i]) {
                window.Trustpilot.loadFromElement(element[i]);
            }
        }
    }, []);
};
export default useTruspilot;
