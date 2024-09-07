import React from "react"
import {
    BrowserRouter,
    Route,
    Routes,
} from 'react-router-dom';

import { LoginPage } from '../components/pages/LoginPage';
import { SignupPage } from '../components/pages/SignupPage';
import { HomePage } from '../components/pages/HomePage';
import { ChangePasswordPage } from '../components/pages/ChangePasswordPage';

import { NotFoundPage } from "../components/pages/errors"


const AppRoutes = () => {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/*" element={<HomePage />}/>
            <Route path="/login" element={<LoginPage />}/>
            <Route path="/signup" element={<SignupPage />}/>
            <Route path="/password" element={<ChangePasswordPage />}/>
            <Route path="*" element={<NotFoundPage />}/>
        </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes