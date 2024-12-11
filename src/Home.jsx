import { useCallback, useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";

import { firestore } from "./firebase-config";

const Home = () => {
    const createCoordinates = async (position) => {
        const data = { lat:  position.coords.latitude, long: position.coords.longitude }
        try {
            await addDoc(collection(firestore, 'coordinates'), data);
        } catch (error) {
            console.error(error);
        }
    }

    const getLocation = useCallback(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(createCoordinates);
        } else {
            console.error("Geolocation is not supported by this browser.")
        }
    }, [])

    useEffect(() => {
        getLocation();
    }, [getLocation]);

    return (
        <div>
            <p>Home</p>
        </div>
    )
}

export default Home
