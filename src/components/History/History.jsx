import { useEffect, useState } from 'react';
import createUUID from "../../utils/createUUID.jsx";
import { firestore, auth } from  '../../Firebase.js';
import './History.css';
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
            <div className="history-container">
            <h1>HISTORIA ZAMÓWIEŃ</h1>
            <ul>
                {orderHistory.map((ord, index)=>{
                    return (
                        <div className="card">
                            <div className="card-body">
                                <li key={createUUID(index)}>
                                    <h5 className="card-title">{new Date(ord.dateCreated.seconds * 1000).toLocaleDateString("en-US")}</h5>
                                    
                                    <ul>
                                    {ord.orderList.order.map((o, i) =>(
                                                    <>
                                                    <li key={createUUID(o.name)}>{o.name}</li>
                                                    <li key={createUUID(o.price)}>{o.price}</li>
                                                    </>
                                                ))}
                                    </ul>
                                </li>
                            </div>
                        </div>
                    )
                    })
                }
            </ul>
            </div>  
        </>
    )
}

export default History;