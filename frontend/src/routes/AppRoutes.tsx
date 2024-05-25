import React from "react"
import {
    BrowserRouter,
    Route,
    Routes,
} from 'react-router-dom';

import { LoginPage } from '../components/pages/LoginPage';
import { SignupPage } from '../components/pages/SignupPage';
import { RecordPage } from '../components/pages/RecordPage';
import { GraphPage } from '../components/pages/GraphPage';
import { ChangePasswordPage } from '../components/pages/ChangePasswordPage';

import { NotFoundPage } from "../components/pages/errors"


const AppRoutes = () => {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/records/:mode" element={<RecordPage />}/>
            <Route path="/graph" element={<GraphPage />}/>
            <Route path="/login" element={<LoginPage />}/>
            <Route path="/signup" element={<SignupPage />}/>
            <Route path="/password" element={<ChangePasswordPage />}/>
            <Route path="*" element={<NotFoundPage />}/>
        </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes