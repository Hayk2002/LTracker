import { Avatar, List } from "antd";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";

import { firestore } from "./firebase-config";

const Dashboard = () => {
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);

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
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        (async () => {
            const coordinates = await getCoordinates()
            setLocations(coordinates)
        })()
    }, []);

    return (
        <div style={{width: 800, height: '100%', margin: "50px auto", padding: 10, border: "1px solid #ccc"}}>
            <List
                loading={loading}
                dataSource={locations}
                renderItem={(item) => (
                    <List.Item key={item.id} style={{borderBottom: "1px solid #ccc"}}>
                        <List.Item.Meta
                            avatar={<Avatar/>}
                            title={item.id}
                            description={`${item.lat}, ${item.long}`}
                        />
                        <a
                            target="_blank"
                            rel='noreferrer'
                            href={`https://yandex.com/maps/10262/yerevan/?mode=search&sll=${item?.long}%2C${item?.lat}&text=${item?.lat}%2C${item?.long}&z=21`}
                        >
                            Yandex Map
                        </a>
                    </List.Item>
                )}
            />
        </div>
    )
}

export default Dashboard;
