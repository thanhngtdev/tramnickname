import { useEffect, useState } from 'react';

const useGetWidthWithLoading = () => {
    const [defineWidth, setDefineWidth] = useState({
        width: 2000,
        mobile: false,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const handleResize = () => {
            setDefineWidth({
                width: window.innerWidth,
                mobile: window.innerWidth <= 768,
            });
        };
        setLoading(false);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return [loading, defineWidth.width, defineWidth.mobile];
};

export default useGetWidthWithLoading;
