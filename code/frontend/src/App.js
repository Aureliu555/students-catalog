import Navbar from './components/common/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Student from './pages/Student'
import Login from './pages/Login'
import Register from './pages/Register'
import Students from './pages/Students'
import '../src/styles/App.css'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Home /> }></Route>
        
        <Route element={ <Navbar /> }>
          <Route path="/students" element={ <Students /> }></Route>
          <Route path="/student/:id" element={ <Student /> }></Route>
        </Route>
        
        <Route path="/login" element={ <Login /> }></Route>
        <Route path="/register" element={ <Register /> }></Route>
      </Routes>
    </div>
  )
}

export default App;
