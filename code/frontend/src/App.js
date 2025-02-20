import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Student from './pages/Student'
import Login from './pages/Login'
import Register from './pages/Register'
import Students from './pages/Students'
import ErrorPage from './pages/ErrorPage'
import '../src/styles/App.css'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Home /> }></Route>
        
        <Route element={ <Navbar /> }>
          <Route path="/students" element={ <Students /> }></Route>
          <Route path="/student/:id" element={ <Student /> }></Route>
          <Route path="/error/:status" element={ <ErrorPage /> }></Route>
        </Route>
        
        <Route path="/login" element={ <Login /> }></Route>
        <Route path="/register" element={ <Register /> }></Route>
      </Routes>
    </div>
  )
}

export default App;
