import Menu from 'Components/Menu';
import Catalog from 'pages/Catalog';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from "./Components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import useToken from "./Components/UseToken";
import {Admin} from "./pages/Admin";

export default function AppRouter() {
    const { token, removeToken, setToken } = useToken();

    return (
            <Router>
                <Menu removeToken={removeToken} />
                    <Routes>
                        <Route exac path='/register' element={<Register />}></Route>
                        <Route  exact path='/login' element={<Login setToken={setToken} />}></Route>
                        <Route  exact path='/' element={<Catalog />}></Route>
                        <Route exac path='/admin' element=
                            { !token && token!=="" &&token!== undefined?
                                <Login setToken={setToken} /> :
                                <Admin token={token} removeToken={removeToken} />
                            }></Route>
                    </Routes>
                <Footer/>
            </Router>
    );
}
