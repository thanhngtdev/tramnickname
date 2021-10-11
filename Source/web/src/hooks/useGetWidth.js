import { useEffect, useState } from 'react';

const useGetWidth = () => {
    const [width, setWidth] = useState(1000);
    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return width;
};

export default useGetWidth;
