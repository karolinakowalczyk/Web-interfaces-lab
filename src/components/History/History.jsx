import { useContext, useEffect, useState } from 'react';
import { firestore, auth } from  '../../Firebase.js';
const History = () =>{
    const [orderHistory, setOrderHistory] = useState([]);
    const [userOrderHistory, setUserOrderHistory] = useState([]);
    //inny sposób niż useEfect?
    useEffect(() => {
        getOrderHistory();
        getUserOrderHistory();
      }, [])

    const getOrderHistory = async () => {
        const response=firestore.collection('orders');
        const data = await response.get();
        //console.log(auth.currentUser.uid)
        data.docs.forEach(ord =>{
            console.log(ord.owner)
            console.log(auth.currentUser.uid)
           setOrderHistory(orderHistory => [...orderHistory, ord.data()])
        })
        
    }

    const getUserOrderHistory = () => {
         orderHistory.map((ord)=>{
            if(ord.owner == auth.currentUser.uid){
                setUserOrderHistory(userOrderHistory.concat([ord]))
        }

        })
    }

    /*const getUserOrderHistory = orderHistory.map((ord)=>{
            if(ord.owner == auth.currentUser.uid){
                setUserOrderHistory(userOrderHistory.concat([ord]))
            }

        })*/
    

    return (
        <>
        
        <div className="order-history">

            <h1>HISTORIA ZAMÓWIEŃ</h1>
            {
            
            userOrderHistory.map((ord, index)=>{
                return (
                    <div className="order-history" key={index}>
                        <h4>{ord.owner}</h4>
                        {new Date(ord.dateCreated.seconds * 1000).toLocaleDateString("en-US")}
                        
                        <ul>
                        {ord.orderList.order.map((o, i) =>(
                                        <>
                                        <li key={i}>{o.name}</li>
                                        <li key={i}>{o.price}</li>
                                        </>
                                    ))}
                    </ul>
                    <button>Złóż ponownie</button>
                    </div>
                )
                })
            }
            

        </div>
        </>
    )
}

export default History;