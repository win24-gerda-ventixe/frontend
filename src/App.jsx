import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Navigate } from 'react-router-dom';
import CenterLayout from './assets/layouts/CenterLayout';
import PortalLayout from './assets/layouts/PortalLayout';

import Events from './assets/pages/Events';
import Bookings from './assets/pages/Bookings';
import Dashboard from './assets/pages/Dashboard';
import EventDetails from './assets/pages/EventDetails';

function App() {
  return (
    <Routes>

      {/* Portal layout (with sidebar, header, footer) */}
      <Route element={<PortalLayout />}>
        <Route path='/' element={<Navigate to="/dashboard" replace />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/bookings' element={<Bookings />} />
        <Route path='/events' element={<Events />} />
       {/*  <Route path='/invoices' element={<Invoices />} />
        <Route path='/inbox' element={<Inbox />} />
        <Route path='/calendar' element={<Calendar />} />
        <Route path='/financials' element={<Financials />} />
        <Route path='/gallery' element={<Gallery />} />
        <Route path='/feedback' element={<Feedback />} />*/}

      </Route>

      {/* If you ever use CenterLayout (e.g. login page), you could do: */}
      {/* 
      <Route element={<CenterLayout />}>
        <Route path="/login" element={<Login />} />
      </Route>
      */}

    </Routes>
  );
}

export default App;
