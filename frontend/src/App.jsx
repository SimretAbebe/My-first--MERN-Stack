import './App.css'
import { Routes , Route} from 'react-router-dom';
import Navbar from '../src/component/navbar';
import Home from './pages/home';
import Register from './pages/register';
import Login from './pages/login';
import axios from 'axios';
import { Toaster } from "react-hot-toast";
import { UserContextProvider } from '../context/userContext';
import Dashboard from './pages/Dashboard';  


axios.defaults.baseURL = 'http://localhost:7000';
axios.defaults.withCredentials = true


function App() {
  

  return (
    <UserContextProvider>
      <Navbar />
      <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </UserContextProvider>
  );
}

export default App