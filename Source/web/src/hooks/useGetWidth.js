import { useEffect, useLayoutEffect, useState } from 'react';

const useGetWidth = () => {
    const [width, setWidth] = useState(2000);

    useLayoutEffect(() => {
        setWidth(window.innerWidth);
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
