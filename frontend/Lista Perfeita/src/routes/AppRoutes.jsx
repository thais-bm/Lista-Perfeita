import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import MinhaLista from '../pages/MinhaLista';
import Login from '../pages/Login';
import SignIn from '../pages/SignIn';
import CreateList from '../pages/CreateList';
import Sugestion from '../pages/Sugestion';
import VerLista from '../pages/VerLista';
import ProtectedRoute from "./ProtectedRoutes";
import ChooseProducts from '../pages/ChooseProducts';


const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<Home />} path="/" />
            <Route element={    <ProtectedRoute><MinhaLista /></ProtectedRoute>     } path="/minhaLista" />
            <Route element={<CreateList />} path="/createList" />
            <Route element={<Sugestion />} path="/sugestion" />
            <Route element={<NotFound />} path="*" />
            <Route element={<Login />} path="/login" />
            <Route element={<SignIn />} path="/signin" />
            <Route element={<NotFound />} path="*" />
            <Route path="/verLista/:id" element={<VerLista />} />
            <Route element={<ChooseProducts />} path="/products" />
        </Routes>
    )
}

export default AppRoutes;