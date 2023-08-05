import { BrowserRouter, Routes, Route, Link, useNavigate, Navigate } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { AddPhoto } from "./pages/AddPhoto/AddPhoto";
import { Photo } from "./pages/Photo/Photo";
import { Signup } from "./pages/Signup/Signup";
import { Login } from "./pages/Login/Login";
import "./styles/global.scss";
import { AuthCtx } from "./services/AuthCtx";
import { useState, useEffect } from "react";
import axios from "axios";
import { PageNotFound } from "./pages/PageNotFound/PageNotFound";
import { Profile } from "./pages/Profile/Profile";
import { ChangePassword } from "./pages/ChangePassword/ChangePassword";
import { AiFillHome } from "react-icons/ai";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { AiOutlineLogin } from "react-icons/ai";
import { MdCreate } from "react-icons/md";
import { Landing } from "./pages/Landing/Landing";
import { TfiGallery } from "react-icons/tfi";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // // Close the menu when the route changes
  // useEffect(() => {
  //   setIsOpen(false);
  // }, [navigate]); // This effect will run whenever navigate changes

  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_ROUTE}/auth/validate`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        }
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({
      username: "",
      id: 0,
      status: false,
    });
  };

  return (
    <AuthCtx.Provider value={{ authState, setAuthState }}>
      <BrowserRouter>
        {!authState.status ? (
          <>
            <div className="hamburger-menu">
              <div className={`menu-button ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
              </div>
              <ul className={`menu-items ${isOpen ? 'open' : ''}`}>
                <span className="currentUser">
                  <Link to="/"><img width={20} src="logo.png" alt=""/><b>Photoscope</b></Link>
                </span>
                <Link to="/login"><AiOutlineLogin /> Login</Link>
                <Link to="/signup"><MdCreate /> Sign up</Link>
                <Link to="/gallery"><TfiGallery /> Gallery</Link>
              </ul>
            </div>
          </>
        ) : (

          <>
            <div className="hamburger-menu">
              <div className={`menu-button ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
              </div>
              <ul className={`menu-items ${isOpen ? 'open' : ''}`}>
                <span className="currentUser">
                  <b>{authState.username}</b>
                </span>
                <Link to="/gallery"><TfiGallery /> Gallery</Link>
                <Link to="addphoto"><AiOutlineCloudUpload /> Upload</Link>
                <button className="logout" onClick={logout}>Logout</button>
              </ul>
            </div>
          </>
        )}

        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/gallery" element={<Home />} />
          <Route path="/addphoto" element={<AddPhoto />} />
          <Route path="/photo/:id" element={<Photo />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/change" element={<ChangePassword />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthCtx.Provider >
  );
}

export default App;
