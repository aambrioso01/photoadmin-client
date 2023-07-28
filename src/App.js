import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
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

function App() {
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
            <div className="header">
              <span className="nav">
                <img width={50} height={50} src="/logo.png" alt="logo" />
                <Link to="/login"><AiOutlineLogin /> Login</Link>
                <Link to="/signup"><MdCreate /> Sign up</Link>
              </span>
            </div>
          </>
        ) : (
          <div className="header">
            <span className="nav">
              <img width={50} height={50} src="/logo.png" alt="logo" />
              <Link to="/"><AiFillHome /> Home</Link>
              <Link to="addphoto"><AiOutlineCloudUpload /> Upload</Link>
            </span>
            <span className="currentUser">
              <h2>{authState.username}</h2>
              <button onClick={logout}>Logout</button>
            </span>
          </div>
        )}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addphoto" element={<AddPhoto />} />
          {/* <Route path="/addphoto2" element={<AddPhoto2 />} /> */}
          <Route path="/photo/:id" element={<Photo />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/change" element={<ChangePassword />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthCtx.Provider>
  );
}

export default App;
