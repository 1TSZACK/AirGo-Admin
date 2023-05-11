// import logo from './logo.svg';
import './App.css';
import Home from './Home/Views/Home';
import Login from './Login/Views/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Try from './Try';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/try" element={<Try/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
