import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import {WelcomePage} from './components/auth/WelcomePage';
import {Home} from "./pages/Home.jsx";
import {RegisterSchoolPage} from "./components/auth/RegisterSchoolPage.jsx";
import {CreateAdminPage} from "./components/auth/CreateAdminPage.jsx";
import {VerifySchoolPage} from "./components/auth/VerifySchoolPage.jsx";
import {SuccessPage} from "./components/auth/SuccessPage.jsx";
// import AuthApp from "./pages/AuthPages.jsx";

function App() {

    return (
        <div className={`font-[Outfit]`}>
            <Routes>
                {/* Auth Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/welcome" element={<WelcomePage />} />
                <Route path="/register" element={<RegisterSchoolPage />} />
                <Route path="/create-admin" element={<CreateAdminPage />} />
                <Route path="/verify" element={<VerifySchoolPage />} />
                <Route path="/success" element={<SuccessPage />} />
                {/*<Route path="/AuthApp" element={<AuthApp />} />*/}


                {/* Catch all */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </div>

    );
}

export default App;