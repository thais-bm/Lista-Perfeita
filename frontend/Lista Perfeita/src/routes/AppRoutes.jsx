import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import MinhaLista from '../pages/MinhaLista';
import Login from '../pages/Login';
import SignIn from '../pages/SignIn';
import CreateList from '../pages/CreateList';
import Sugestion from '../pages/Sugestion';

const AppRoutes = () =>{
    return(
        <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<MinhaLista />} path="/minhaLista"/>
            <Route element={<CreateList/>} path="/createList" />
            <Route element={<Sugestion/>} path="/sugestion" />
            <Route element={<NotFound />} path="*" /> 
            <Route element={<Login />} path="/login"/>
            <Route element={<SignIn />} path="/signin"/>
        </Routes>
    )
}

export default AppRoutes;