import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import Homepage from "./pages/Homepage";
import Loginpage from "./pages/Loginpage";
import Users from "./pages/Users";
import InstitutionDetail from "./pages/InstitutionDetail";
import Institutions from "./pages/Institutions";
import Notifications from "./pages/Notifications";
import Vmclass from "./pages/Vmclass";
import CreatePlanifications from "./pages/CreatePlanifications";
import Planifications from "./pages/Planifications";
import Error404 from './pages/Error404';
import { useSelector } from 'react-redux';
import { adminValue } from './features/userApi';
import SchoolDetail from './pages/SchoolDetail';
import ClassroomDetail from './pages/ClassroomDetail';
import Vmclassresume from './pages/Vmclassresume';
import VMLayout from './layout/VMLayout';
import ScrollToTopOnRender from './layout/ScrollToTopOnRender';

function App() {

  const userActive = useSelector(adminValue)

  return (
    <>
      <BrowserRouter>
      <ScrollToTopOnRender/>
      
        <Routes>
        <Route path="/" index={true} element={<Loginpage />} />
        </Routes>
        {userActive && localStorage.getItem('token') ? (
        <VMLayout>
        <Routes>
              <Route path="/dashboard" element={userActive && localStorage.getItem('token')  ? < Homepage /> : <Loginpage />} />
              <Route path="/users" element={<Users />} />
              <Route path="/institutions" element={<Institutions />} />
              <Route path="/institutions/:id" element={<InstitutionDetail />} />
              <Route path="/school/:id" element={<SchoolDetail />} />
              <Route path="/classroom/:id" element={<ClassroomDetail />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/vmclass/:id" element={<Vmclass />} />
              <Route path="/classroom/:id/vmclassresume/:idresume" element={<Vmclassresume />} />
              <Route path="/create-planification" element={<CreatePlanifications />} />
              <Route path="/planifications" element={<Planifications />} />
              <Route path="/*" element={<Error404 />} />
        </Routes>
        </VMLayout>) : null }
      </BrowserRouter>
    </>
  );

}


export default App;