import { useEffect, useState } from 'react';
import createUUID from "../../utils/createUUID.jsx";
import { firestore, auth } from  '../../Firebase.js';
const History = () =>{
    const [orderHistory, setOrderHistory] = useState([]);

    useEffect(() => {
        getOrderHistory();
      }, [])

    const getOrderHistory = async () => {
        
        const response=firestore.collection('orders').where("owner", "==", auth.currentUser.uid)
        const data = await response.get();
        data.docs.forEach(ord =>{
           setOrderHistory(orderHistory => [...orderHistory, ord.data()])
        })

    }

    return (
        <>
        
        <div className="order-history">

            <h1>HISTORIA ZAMÓWIEŃ</h1>
            <ul>
                {orderHistory.map((ord, index)=>{
                    return (
                        <li key={createUUID(index)}>
                            {new Date(ord.dateCreated.seconds * 1000).toLocaleDateString("en-US")}
                            
                            <ul>
                            {ord.orderList.order.map((o, i) =>(
                                            <>
                                            <li key={createUUID(o.name)}>{o.name}</li>
                                            <li key={createUUID(o.price)}>{o.price}</li>
                                            </>
                                        ))}
                            </ul>
                        </li>
                    )
                    })
                }
            </ul>
        </div>
        </>
    )
}

export default History;