import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpForm from "./componets/SignUpForm";
import LoginForm from "./componets/LoginForm";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./componets/Footer";
import AllBlogs from "./pages/AllBlogs";
import ReadMore from "./pages/ReadMore";
import Profile from "./pages/Profile";
import IsVerifiedSuccess from "./pages/IsverifiedSuccess";
import IsVerifiedFailed from "./pages/IsVerifiedFailed";

function App() {
 
 

  return (
    <div className="bg-[url('/images/pexels-veeterzy-114979.jpg')] bg-cover h-auto w-screen text-200">
      <BrowserRouter>
        <Routes>
          <Route index element={<Home/>} />
          <Route path="/is-verified-success" element={<IsVerifiedSuccess />} />
          <Route path="/is-verified-failed" element={<IsVerifiedFailed />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/sign-up" element={<SignUpForm />} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/all" element={<AllBlogs/>} />
          <Route path="/:blogTitle/more/:blogId" element={<ReadMore/>} />
        </Routes>
      </BrowserRouter>
      <Footer />
      <ToastContainer position="top-center" hideProgressBar={false} />
      
    </div>
  );
}

export default App;
