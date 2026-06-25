import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import AddTransaction from "./pages/AddTransaction";
import Analytics from "./pages/Analytics";
import Budget from "./pages/Budget";
import Savings from "./pages/Savings";
import AI from "./pages/AI";
import Profile from "./pages/Profile";
// import Login from "./pages/Login";
import Register from "./pages/Register";
import LandingPage from "./pages/LandingPage";
import NotfoundPage from "./pages/NotfoundPage";
import Loginpage from "./pages/Loginpage";
import ResetPassword from "./pages/ResetPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminDashboard from "./pages/AdminDashboard";
import AdminAnalytics from "./pages/adminAnalytics";
import CompliancePage from "./pages/AdminCompliancepage";
import CustomersPage from "./pages/adminCustomerpage";
import InvoicesPage from "./pages/adminInvoice";
import SettingsPage from "./pages/AdminSetting";
import { TransactionsPage } from "./pages/AdminTransactionPage";
import { useContext } from "react";
import { AppContent } from "./context/AppContext.jsx";
import Loader from "./component/Loader";
function App() {
  const { loading } = useContext(AppContent);
  return (
    <Router>
      <ToastContainer />
      {loading && <Loader />}
      <Routes>
        {/* Auth Routes */}
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/register" element={<Register />} />

        {/* Main App Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/add-transaction" element={<AddTransaction />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/budget" element={<Budget />} />
        <Route path="/savings" element={<Savings />} />
        <Route path="/ai" element={<AI />} />
        <Route path="/landingpage" element={<LandingPage />} />
        <Route path="/loginpage" element={<Loginpage />} />
        {<Route path="/dashboard" element={<Dashboard />} />}
        <Route path="/profile" element={<Profile />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/adminanalytics" element={<AdminAnalytics />} />
        <Route path="/invoice" element={<InvoicesPage />} />
        <Route path="/compliance" element={<CompliancePage />} />
        <Route path="/customer" element={<CustomersPage />} />
        <Route path="/setting" element={<SettingsPage />} />
        <Route path="/transactionpg" element={<TransactionsPage />} />

        <Route path="*" element={<NotfoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
