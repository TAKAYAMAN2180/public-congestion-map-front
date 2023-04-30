import { useLayoutEffect, useState } from 'react';
import {useIsomorphicEffect} from "./useIsomorphicEffect";

export const useWindowSize = () => {
    const isomorphicEffect = useIsomorphicEffect();

    const [size, setSize] = useState([0, 0]);
    isomorphicEffect(() => {
        const updateSize = (): void => {
            setSize([window.innerWidth, window.innerHeight]);
        };

        window.addEventListener('resize', updateSize);
        window.addEventListener("orientationchange", updateSize);

        updateSize();

        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
};