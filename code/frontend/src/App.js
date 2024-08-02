import Navbar from './components/common/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Student from './pages/Student'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  console.log('App')

  return (
    <>
      <Navbar></Navbar>
      <div className="App">
        <Routes>
          <Route path="/" element={ <Home /> }></Route>
          <Route path="/login" element={ <Login /> }></Route>
          <Route path="/register" element={ <Register /> }></Route>
          <Route path="/student/:id" element={ <Student /> }></Route>
        </Routes>
      </div>
    </>
  )
}

export default App;
