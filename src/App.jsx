
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router'
import Home from "./components/Home/Home"
import Navbar from './components/Navbar/Navbar'
const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home/>}> </Route>
      </Routes>
    </Router>
  )
}

export default App