
import LoginPg from './components/LoginPg';
import { Navigate, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Profile from './components/Profile';
import ProjectOverview from './components/ProjectOverview';
import PersonalDetail from './components/PersonalDetail';
import Attendance from './components/Attendance';
import Feedback from './components/Feedback';
import Dashboard from './components/Dashboard';
import Setting from './components/Setting';
import ProctectedUser from './ProtectRout/ProtectedUser';
import Authentication from './ProtectRout/Authentication';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={
          <>
            <Authentication>
              <LoginPg />
            </Authentication></>
        } />
        <Route path="/register" element={
          <>
            <Authentication>
              <Register />
            </Authentication></>
        } />
        <Route path="/dashboard" element={
          <>
            <ProctectedUser>
              <Dashboard />
            </ProctectedUser></>
        } />
        <Route path="/profile" element={
          <>
            <ProctectedUser>
              <Profile />
            </ProctectedUser>
          </>
        } />
        <Route path="/projectOverview" element={
          <>
            <ProctectedUser>
              <ProjectOverview />
            </ProctectedUser>
          </>
        } />
        <Route path="/personalDetail" element={
        <>
        <Authentication>
        <PersonalDetail />
        </Authentication>
      </>
        } />
        <Route path="/attendance" element={
          <>
            <ProctectedUser>
              <Attendance />
            </ProctectedUser>
          </>
        } />
        <Route path="/feedback" element={
          <>
            <ProctectedUser>
              <Feedback />
            </ProctectedUser>
          </>
        } />
        <Route path="/setting" element={
          <>
            <ProctectedUser>
              <Setting />
            </ProctectedUser>
          </>
        } />
         <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;
