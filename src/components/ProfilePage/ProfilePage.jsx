import { useEffect, useState } from 'react';
import { firestore, addOrder, auth } from  '../../Firebase.js';
import { Alert } from 'reactstrap';
import './ProfilePage.css';

const ProfilePage = () =>{
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
        setOrder(order.concat([pizza]))
    }

    const removeFromOrder = (pizza) => {
        const actualPizzasList = order.filter((item) => item !== pizza);
            setOrder(actualPizzasList);
    };

    const submitOrder = () =>{
        addOrder(auth.currentUser, {order})
        setOrder([])
        setShowAlert(true)
       
    }

    if(showAlert){
        return (<Alert>
            Twoje zamówienie zostało złożone!
        </Alert>)
    }
    
    return (
        <>
        <div className="profile-page-container">
            <div className="profile-page-container-child">
                <h1>MENU</h1>
                {
                menu.map((pizza, index)=>{
                    return (
                        <div className="menu-container" key={index}>
                            <h4>{pizza.name}</h4>
                            <h4>{pizza.price}</h4>
                            <ul>
                                {pizza.ingredients.map((i, index) => (
                                    <>
                                    <div id="pizza-icon">
                                        <span class="material-icons">
                                            local_pizza
                                        </span>
                                    </div>
                                    <div id="ingredients">
                                        <li key={index}>{i}</li>
                                    </div>
                                    
                                    </>
                                ))}
                            </ul>
                            <button type="button" className="btn btn-success" onClick={() => addToOrder(pizza)}>Dodaj do zamówienia</button>
                        </div>
                    )
                    })
                }
            </div>
            <div className="profile-page-container-child">
                <h3>Twoje zamówienie:</h3>
                {
                order.map((pizza, index)=>{
                    return (
                        <div className="menu-container" key={index}>
                            <h4>{pizza.name}</h4>
                            <h4>{pizza.price}</h4>
                            <ul>
                                {pizza.ingredients.map((i, index) => (
                                    <>
                                    <div id="pizza-icon">
                                        <span class="material-icons">
                                            local_pizza
                                        </span>
                                    </div>
                                    <div id="ingredients">
                                        <li key={index}>{i}</li>
                                    </div>
                                    
                                    </>
                                ))}
                            </ul>
                            <button type="button" className="btn btn-success delete-order-btn" onClick={() => removeFromOrder(pizza)}>Usuń</button>
                        </div>
                    )
                    })
                }
                {order.length === 0 ? <></> : <button type="button" className="btn btn-success" onClick={submitOrder}>Złóż zamówienie</button>}
            </div>
        </div>
        </>
    )
}

export default ProfilePage;