import React, { useState } from 'react';
import './Login.css';
import { useNavigate  } from 'react-router-dom';

function Login() {
//   const [emailLabel, SetEmailLabel] = useState('Email: ')
  const [emailError,setEmailError] = useState(false);
  const [passError,setPassError] = useState(false);   
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();
    // Code to handle form submission
  };
  function hanldePress(){
    if (email===''){
        setEmailError(true);
    }
    if (password===''){
        setPassError(true);
    }
    else{
        navigate('/home');
    }
  }

  return (
    <div className="container">
      <div className="box">
        <h1 className="title">Admin Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label style={{color:emailError?'red':'black'}}>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{borderColor:emailError?'red':'grey'}}
            />
          </div>
          <div className="field">
            <label style={{color:passError?'red':'black'}}>Password:</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{borderColor:passError?'red':'grey'}}
            />
            <button onClick={() => setShowPassword(!showPassword)} id="pass-btn" style={{color:'white',backgroundColor:'rgb(39, 39, 126)'}}>
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          <div onClick={hanldePress} className='login-btn' style={{display:'flex',flexDirection:'column',backgroundColor:'rgb(83, 4, 4)',borderRadius:13.3,height:'30px',marginInline:'80px',justifyContent:'center',alignItems:'center',color:'white'}}>
            <label>Login</label>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
