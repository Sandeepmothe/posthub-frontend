import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import PageNotFound from './pages/PageNotFound';
import Profile from './pages/Profile';
import { AuthContext } from './helpers/AuthContext';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ChangePassword from './pages/ChangePassword';
import { useNavigate } from 'react-router-dom';




function App() {
  const API_URL = process.env.REACT_APP_API_URL;
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  useEffect(() => {
    axios.get(`${API_URL}/auth/auth`, {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    }).then((response) => {
      if (response.data.error) {
        setAuthState((prev) => ({ ...prev, status: false }));
        // console.log("API_URL:", import.meta.env.VITE_API_URL);
        // navigate("/login")

      } else {
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true,
        });
      }

    })

  }, [API_URL]);

  let navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({
      username: "",
      id: 0,
      status: false,
    });
    navigate("/login")
  }

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
          <div className="navbar">
            <div className="links">
              {!authState.status ? (
                <>
                  <Link to="/login"> Login</Link>
                  <Link to="/registration"> Registration</Link>
                </>
              ) : (
                <>
                  <Link to="/"> Home Page</Link>
                  <Link to="/createpost"> Create A Post</Link>
                </>
              )}
            </div>
            <div className="loggedInContainer">
              <h1>{authState.username} </h1>
              {authState.status && <button onClick={logout}> Logout</button>}
            </div>
          </div>
          <Routes>
            <Route path='/' exact element={<Home />} />
            <Route path='/post/:ID' exact element={<Post />} />
            <Route path='/createPost' exact element={<CreatePost />} />
            <Route path='/login' exact element={<Login />} />
            <Route path='/registration' exact element={<Registration />} />
            <Route path='/profile/:id' exact element={<Profile />} />
            <Route path='/changepassword' exact element={<ChangePassword />} />
            <Route path='*' exact element={<PageNotFound />} />
          </Routes>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
