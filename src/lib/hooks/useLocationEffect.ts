import { useState, useEffect } from 'react';

interface LocationState {
    latitude: number | null;
    longitude: number | null;
}

interface UseCurrentLocationResult {
    location: LocationState;
}

const useCurrentLocation = (): UseCurrentLocationResult => {
    const [location, setLocation] = useState<LocationState>({ latitude: null, longitude: null });
    const [error, setError] = useState<string | null>(null);

    const handleSuccess = (position: GeolocationPosition) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
    };

    const handleError = (error: GeolocationPositionError) => {
        setError(error.message);
    };

    useEffect(() => {
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser');
            return;
        }

        navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
    }, []);

    return { location };
};

export default useCurrentLocation;
