import logo from './logo.svg';
import './App.css';

// function App() 
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React from 'react';
import Navbar from './Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import ReduxRegistration from './redux/ReduxRegistration';
import MembersPage from './MembersPage';
import Admin from './Admin';
import LoginPage from './LoginPage';


const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/register" element={<ReduxRegistration />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/members" element={<MembersPage />} />
      </Routes>
    </Router>
  );
};

export default App;

