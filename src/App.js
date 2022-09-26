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

function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  useEffect(() => {
    axios
      .get("https://photo-admin-api.herokuapp.com/auth/validate", {
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
            <Link to="/login"> Login</Link>
            <Link to="/signup"> Sign up</Link>
          </>
        ) : (
          <>
            <Link to="addphoto"> Add photo</Link>
            <Link to="/"> Home</Link>
            <button onClick={logout}>Logout</button>
            <h1>{authState.username}</h1>
          </>
        )}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addphoto" element={<AddPhoto />} />
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
