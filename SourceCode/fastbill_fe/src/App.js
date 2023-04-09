import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignInScreen from "./views/authen/SignIn";
import SingUpScreen from "./views/authen/SignUp";
import Home from "./views/administer/Home";
import Payments from "./views/administer/Payments";
import Profile from "./views/profile/Profile";
import Banking from "./views/administer/Banking";
import Register from "./views/administer/Register";
import GeneralManagement from "./views/administer/GeneralManagement";
import ElectricNumber from "./views/administer/ElectricNumber";

function App() {
  return (
    <div className="App" >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignInScreen />} />
          <Route path="/signup" element={<SingUpScreen />} />
          <Route path="/home" element={<Home />} />
          <Route path="/payment" element={<Payments />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/bank" element={<Banking />} />
          <Route path="/register" element={<Register />} />
          <Route path="/general-management" element={<GeneralManagement />} />
          <Route path="/electric-number" element={<ElectricNumber />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
