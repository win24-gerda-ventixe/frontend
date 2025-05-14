import React from "react";
import Nav from '../components/Nav'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom';

const PortalLayout = () => {
    return (
        <div className="portal-wrapper">
            <Nav />
            <Header />
            <main className="main-content">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default PortalLayout