import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../src/components/Navbar";
import LandingPage from "../src/components/LandingPage";
import ServicesPage from "../src/components/ServicesPage";
import AboutPage from "../src/components/AboutPage";
import ContactPage from "../src/components/ContactPage";
import LoginPage from "../src/components/LoginPage";

import AdminDashboard from "../src/dashboards/Admindashboard";
import ManufacturerDashboard from "../src/dashboards/Manufacturerdashboard";
import DistributorDashboard from "../src/dashboards/Distributordashboard";
import PharmaDashboard from "../src/dashboards/Pharmadashboard";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/dashboard/admin" element={<AdminDashboard />} />
        <Route path="/dashboard/manufacturer" element={<ManufacturerDashboard />} />
        <Route path="/dashboard/distributor" element={<DistributorDashboard />} />
        <Route path="/dashboard/pharma" element={<PharmaDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
