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
                    {!token && token!=="" &&token!== undefined?
                        <Login setToken={setToken} />
                        :(
                            <>
                            <Routes>
                                <Route path='/admin' element={<Admin token={token} removeToken={removeToken} />}></Route>
                            </Routes>
                            </>
                        )}
                <Routes>
                    <Route path='/register' element={<Register />}></Route>
                    <Route path='/login' element={<Login setToken={setToken} />}></Route>
                    <Route path='/' element={<Catalog />}></Route>
                </Routes>
                <Footer/>
            </Router>
    );
}
