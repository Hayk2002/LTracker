import {collection, getDocs} from "firebase/firestore";
import {firestore} from "./firebase-config";
import React, {useEffect, useState} from "react";

const Dashboard = () => {
    const [location, setLocation] = useState(null);

    const getCoordinates = async () => {
        try {
           const querySnapshot = await getDocs(collection(firestore, 'coordinates'));
            const data = querySnapshot.docs
                .map(async (doc) => {

                    return {
                        ...doc.data(),
                        id: doc.id
                    };
                });

            return await Promise.all(data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        (async () => {
            const coordinates = await getCoordinates()
            const id = coordinates[0]?.id
            localStorage.setItem('locID', JSON.stringify(id))
            setLocation(coordinates[0])
        })()
    }, []);

    return location !== null && (
        <div>
            <a
                target="_blank"
                rel="noreferrer"
                href={`https://yandex.com/maps/10262/yerevan/?mode=search&sll=${location?.long}%2C${location?.lat}&text=${location?.lat}%2C${location?.long}&z=21`}>
                Yandex Map
            </a>
        </div>
    )
}

export default Dashboard;
