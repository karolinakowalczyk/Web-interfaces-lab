import {AuthContext} from '../AuthContext/AuthContext.jsx';
import { useContext, useEffect, useState } from 'react';
import { firestore, getMenu, addOrder, auth } from  '../../Firebase.js';
import { Alert } from 'reactstrap';
//import createUUID from "../../utils/createUUID.jsx";
const ProfilePage = () =>{
    const {user} = useContext(AuthContext);
    const [menu, setMenu] = useState([]);
    const [order, setOrder] = useState([])
    const [showAlert, setShowAlert] = useState(false)
    
    useEffect(() => {
        getRestaturantMenu();
      }, [])

    const getRestaturantMenu = async () => {
        const response=firestore.collection('menu');
        const data = await response.get();
        data.docs.forEach(pizza=>{
            setMenu(menu => [...menu, pizza.data()])
        })
    }

    const addToOrder = (pizza) => {
        //console.log(pizza)
        setOrder(order.concat([pizza]))
    }

    const removeFromOrder = (pizza) => {
        const actualPizzasList = order.filter((item) => item !== pizza);
            setOrder(actualPizzasList);
    };

    const submitOrder = () =>{
        //console.log(auth.currentUser)
        addOrder(auth.currentUser, {order})
        setOrder([])
        setShowAlert(true)
       
    }

    if(showAlert){
        return (<Alert>
            Twoje zamówienie zostało złożone!
        </Alert>)
    }

    
    /*const getRestaturantMenu = () => {
        getMenu().then(pizza =>{
            pizza.map(p => {setMenu([...menu, p.data()])
            })

        })
    }*/
    
    return (
        <>
        <div className="menu">
            <h1>MENU</h1>
            {
               menu.map((pizza, index)=>{
                return (
                    <div className="menu-container" key={index}>
                        <h4>{pizza.name}</h4>
                        <h4>{pizza.price}</h4>
                        <ul>
                        {pizza.ingredients.map((i, index) => (
                            <li key={index}>{i}</li>
                        ))}
                    </ul>
                    <button onClick={() => addToOrder(pizza)}>Dodaj do zamówienia</button>
                    </div>
                )
                })
            }
            <h3>Twoje zamówienie:</h3>
            {
               order.map((pizza, index)=>{
                return (
                    <div className="menu-container" key={index}>
                        <h4>{pizza.name}</h4>
                        <h4>{pizza.price}</h4>
                        <ul>
                        {pizza.ingredients.map((i, index) => (
                            <li key={index}>{i}</li>
                        ))}
                    </ul>
                    <button onClick={() => removeFromOrder(pizza)}>Usuń</button>
                    </div>
                )
                })
            }
            {order.length == 0 ? <></> : <button onClick={submitOrder}>Złóż zamówienie</button>}
            
        </div>
        </>
    )
}

export default ProfilePage;