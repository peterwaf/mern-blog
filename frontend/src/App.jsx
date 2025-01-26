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

function App() {
  // function to display date
  const displayDate = (timestamp) => {
    const date = new Date(timestamp);
    // const day = date.getDate();
    // const month = date.getMonth() + 1;
    // const year = date.getFullYear();
    const localStr = date.toLocaleString("en-US", { timeZone: "GMT" });
    return `${localStr}`;
  }

 
 

  return (
    <div className="bg-[url('/images/pexels-veeterzy-114979.jpg')] bg-cover h-auto w-screen text-200">
      <BrowserRouter>
        <Routes>
          <Route index element={<Home displayDate={displayDate} />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/sign-up" element={<SignUpForm />} />
          <Route path="/dashboard" element={<Dashboard displayDate={displayDate} />} />
          <Route path="/all" element={<AllBlogs displayDate={displayDate} />} />
          <Route path="/:blogTitle/more/:blogId" element={<ReadMore displayDate={displayDate} />} />
        </Routes>
      </BrowserRouter>
      <Footer />
      <ToastContainer position="top-center" hideProgressBar={false} />
      
    </div>
  );
}

export default App;
