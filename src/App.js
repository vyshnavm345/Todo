import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TodoApp from './components/Home';
import Test from './components/test/Test';
import Layout from './components/Lay';
import Login from './components/Login';
import Register from './components/Register';
import HomePage from './container/HomePage';
import LoginPage from './container/LoginPage';
import RegisterPage from './container/RegisterPage';
import { useDispatch } from 'react-redux';
import { checkAuth } from './features/user';
import { useEffect } from 'react';
// import Layout from './components/Layout.jsx';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuth());
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/login" element={<LoginPage/>}></Route>
        <Route path="/register" element={<RegisterPage/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
