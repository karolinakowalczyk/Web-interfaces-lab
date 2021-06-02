import Login from '../Login/Login.jsx'
import Main from '../Main/Main.jsx'
import Registration from '../Registration/Registration.jsx'
import ProfilePage from '../ProfilePage/ProfilePage.jsx'
import History from '../History/History.jsx'
import {Route, Switch} from 'react-router-dom';

const MainPage = () =>{
    return (
        <Switch>
            <Route exact path='/'>
                <Main></Main>
            </Route>
            <Route path='/myprofile'>
                <ProfilePage></ProfilePage>
            </Route>
            <Route path='/history'>
                <History></History>
            </Route>
            <Route path='/login'>
                <Login></Login>
            </Route>
            <Route path='/registation'>
                <Registration></Registration>
            </Route>
        </Switch>
    )
}

export default MainPage;