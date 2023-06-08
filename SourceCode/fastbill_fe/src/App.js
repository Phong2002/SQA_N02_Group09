import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignInScreen from "./views/authen/SignIn";
import Home from "./views/administer/Home";
import Payments from "./views/administer/Payments";
import Profile from "./views/profile/Profile";
import Register from "./views/administer/Register";
import GeneralManagement from "./views/administer/GeneralManagement";
import ElectricNumber from "./views/administer/ElectricNumber";
import ElectricNumberCustomer from "./views/customer/ElectricNumberCustomer";
import General from "./views/customer/General";

function App() {
  return (
    <div className="App" >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignInScreen />} />
          <Route path="/home" element={<Home />} />
          <Route path="/payment" element={<Payments />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/general-management" element={<GeneralManagement />} />
          <Route path="/general" element={<General/>} />
          <Route path="/electric-number" element={<ElectricNumber />} />
          <Route path="/electric-number-customer" element={<ElectricNumberCustomer />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
