import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { firestore, db } from "./firebase-config";
import { useCallback, useEffect } from "react";

const locID = localStorage.getItem('locID');

const Home = () => {

    const createCoordinates = async (position) => {
        console.log(position.coords.latitude, 'lat', position.coords.longitude, 'long')
        const data = { lat:  position.coords.latitude, long: position.coords.longitude }
        try {
            if (locID !== null && locID !== undefined) {
                const docRef = doc(db, 'coordinates', locID);
                await setDoc(docRef, data, { merge: true })
            } else {
                await addDoc(collection(firestore, 'coordinates'), data);
            }
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
