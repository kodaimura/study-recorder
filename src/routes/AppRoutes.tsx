import React from "react"
import {
    BrowserRouter,
    Route,
    Routes,
} from 'react-router-dom';

import {
    LoginPage,
    SignupPage,
    MyPage,
    PasswordPage
} from '../components/pages'

import {
    NotFoundPage
} from "../components/pages/errors"


const AppRoutes = () => {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<MyPage />}/>
            <Route path="/login" element={<LoginPage />}/>
            <Route path="/signup" element={<SignupPage />}/>
            <Route path="/password" element={<PasswordPage />}/>
            <Route path="*" element={<NotFoundPage />}/>
        </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes