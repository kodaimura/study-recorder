import React from "react"
import {
    BrowserRouter,
    Route,
    Routes,
} from 'react-router-dom';

import { LoginPage } from '../components/pages/LoginPage';
import { SignupPage } from '../components/pages/SignupPage';
import { RecordPage } from '../components/pages/RecordPage';
import { HistoryPage } from '../components/pages/HistoryPage';
import { SettingPage } from '../components/pages/SettingPage';
import { ChangePasswordPage } from '../components/pages/ChangePasswordPage';

import { NotFoundPage } from "../components/pages/errors"


const AppRoutes = () => {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<RecordPage />}/>
            <Route path="/:mode" element={<RecordPage />}/>
            <Route path="/history/:mode" element={<HistoryPage />}/>
            <Route path="/setting" element={<SettingPage />}/>
            <Route path="/login" element={<LoginPage />}/>
            <Route path="/signup" element={<SignupPage />}/>
            <Route path="/password" element={<ChangePasswordPage />}/>
            <Route path="*" element={<NotFoundPage />}/>
        </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes