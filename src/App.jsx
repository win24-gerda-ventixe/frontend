import { Route, Routes, Navigate } from 'react-router-dom';

import './App.css';
import CenterLayout from './assets/layouts/CenterLayout';
import PortalLayout from './assets/layouts/PortalLayout';
import '@fortawesome/fontawesome-free/css/all.min.css';

import Events from './assets/pages/Events';
import Bookings from './assets/pages/Bookings';
import Dashboard from './assets/pages/Dashboard';
import EventDetails from './assets/pages/EventDetails';
import Invoices from './assets/pages/Invoices';
import Inbox from './assets/pages/Inbox';
import Calendar from './assets/pages/Calendar';
import Gallery from './assets/pages/Gallery';
import Financials from './assets/pages/Financials';
import Feedback from './assets/pages/Feedback';
import EditProfile from './assets/pages/EditProfile';

import Login from './assets/pages/Login';
import SignUp from './assets/pages/SignUp';


function App() {
  return (
    <Routes>

      {/* Portal layout (with sidebar, header, footer) */}
      <Route element={<PortalLayout />}>
        <Route path='/' element={<Navigate to="/dashboard" replace />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/bookings' element={<Bookings />} />
        <Route path='/events' element={<Events />} />
                <Route path="/events/:id" element={<EventDetails />} />

        <Route path='/invoices' element={<Invoices />} />
        <Route path='/inbox' element={<Inbox />} />
        <Route path='/calendar' element={<Calendar />} />
        <Route path='/financials' element={<Financials />} />
        <Route path='/gallery' element={<Gallery />} />
        <Route path='/feedback' element={<Feedback />} />
      </Route>


      <Route element={<CenterLayout />}>
        <Route path="/settings" element={<EditProfile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>


    </Routes>
  );
}

export default App;
