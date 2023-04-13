import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Loginpage from "./pages/Loginpage";
import Users from "./pages/Users";
import InstitutionDetail from "./pages/InstitutionDetail";
import Institutions from "./pages/Institutions";
import Notifications from "./pages/Notifications";
import Vmclass from "./pages/Vmclass";
import CreatePlanifications from "./pages/CreatePlanifications";
import Planifications from "./pages/Planifications";


function App() {
  return (
    <>
   <BrowserRouter>
   
      
      <Routes>
        <Route path="/" element={<Loginpage/>} />
        <Route path="/dashboard" element={<Homepage/>} />
        <Route path="/users" element={<Users/>} />
        <Route path="/institutions" element={<Institutions/>} />
        <Route path="/institutions/:id" element={<InstitutionDetail/>} />
        <Route path="/notifications" element={<Notifications/>} />
        <Route path="/vmclass" element={<Vmclass/>} />
        <Route path="/create-planification" element={<CreatePlanifications/>} />
        <Route path="/planifications" element={<Planifications/>} />

      </Routes>
      
    
    </BrowserRouter>
    </>

  );
}

export default App;
