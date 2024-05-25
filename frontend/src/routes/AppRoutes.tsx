import React from "react"
import {
    BrowserRouter,
    Route,
    Routes,
} from 'react-router-dom';

import {
    LoginPage,
    SignupPage,
    RecordPage,
    ChangePasswordPage
} from '../components/pages'

import {
    NotFoundPage
} from "../components/pages/errors"


const AppRoutes = () => {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<RecordPage />}/>
            <Route path="/login" element={<LoginPage />}/>
            <Route path="/signup" element={<SignupPage />}/>
            <Route path="/password" element={<ChangePasswordPage />}/>
            <Route path="*" element={<NotFoundPage />}/>
        </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes