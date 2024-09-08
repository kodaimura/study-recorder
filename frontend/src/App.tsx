import React from 'react';

import AppRoutes from "./routes/AppRoutes"
import './styles/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Footer } from 'components/common';

function App() {
    return (
        <>
            <AppRoutes />
            <Footer />
        </>

    );
}

export default App;
