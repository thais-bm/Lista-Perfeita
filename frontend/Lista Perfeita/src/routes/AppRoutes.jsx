import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import MinhaLista from '../pages/MinhaLista';
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
        </Routes>
    )
}

export default AppRoutes;