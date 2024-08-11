import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Navbar from "./components/navbar/navbar";

import Home from "./components/home/home";
import User from "./components/user/user";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar></Navbar>
          <Routes>
              <Route path='/' element={<Home/>} />
              <Route  path = "/users/:userId" element = {<User/>} />
          </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
